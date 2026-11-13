const fs = require('fs');

let channels = fs.readFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', 'utf8');

// 1. Add import
if (!channels.includes("import { getSupernovaResponse }")) {
  channels = "import { getSupernovaResponse } from '../services/tutor'\n" + channels;
}

// 2. Replace agent:sendMessage
const oldSendMessageStart = "ipcMain.handle('agent:sendMessage', async (_event, text: string) => {";
const oldSendMessageEnd = "ipcMain.handle('agent:interrupt', () => {";

const startIndex = channels.indexOf(oldSendMessageStart);
const endIndex = channels.indexOf(oldSendMessageEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newSendMessage = `ipcMain.handle('agent:sendMessage', async (_event, text: string) => {
    if (!text || text.length < 1) {
      sendLocalizedError('ASR_EMPTY')
      return
    }

    try {
      sendToRenderer('kitten:state', 'thinking')
      sendToRenderer('transcription', { text })

      const reply = await getSupernovaResponse(text)

      // Stream words smoothly to renderer
      const words = reply.split(' ')
      for (let i = 0; i < words.length; i++) {
        sendToRenderer('llm:delta', { text: (i === 0 ? '' : ' ') + words[i] })
        await new Promise((r) => setTimeout(r, 20))
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      logger.error('[agent:sendMessage] error:', message)
      sendToRenderer('llm:delta', { text: "I'm right here! Let's continue practicing English together." })
    } finally {
      sendToRenderer('kitten:state', 'speaking')
      setTimeout(() => {
        sendToRenderer('kitten:state', 'idle')
      }, 1500)
    }
  })

  `;

  channels = channels.slice(0, startIndex) + newSendMessage + channels.slice(endIndex);
  fs.writeFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', channels);
  console.log('Successfully updated channels.ts with Supernova Tutor Engine!');
} else {
  console.error('Could not find markers in channels.ts');
}

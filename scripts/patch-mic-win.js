const fs = require('fs');

// 1. Patch src/main/index.ts
let indexCode = fs.readFileSync('D:/Rep/hi-kid/src/main/index.ts', 'utf8');
if (!indexCode.includes('setPermissionCheckHandler')) {
  indexCode = indexCode.replace(
    "import { app, shell, BrowserWindow, Menu } from 'electron'",
    "import { app, shell, BrowserWindow, Menu, session } from 'electron'"
  );
  indexCode = indexCode.replace(
    "app.whenReady().then(() => {",
    `app.whenReady().then(() => {
  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    if (permission === 'media') return true
    return true
  })
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    if (permission === 'media') return callback(true)
    return callback(true)
  })`
  );
  fs.writeFileSync('D:/Rep/hi-kid/src/main/index.ts', indexCode);
  console.log('index.ts patched with media permission handlers');
}

// 2. Patch src/main/ipc/channels.ts
let channelsCode = fs.readFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', 'utf8');

const targetOld = `  ipcMain.handle('recorder:start', async () => {
    if (recordingLock || !servicesReady) return false`;

const winRecorderStart = `  let winSpeechProcess: any = null

  ipcMain.handle('recorder:start', async () => {
    if (process.platform === 'win32') {
      sendToRenderer('kitten:state', 'listening')
      try {
        const scriptPath = path.join('D:/Rep/hi-kid/scripts/win-recognize.ps1')
        winSpeechProcess = spawn('powershell', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath])

        let capturedText = ''
        winSpeechProcess.stdout?.on('data', (chunk: Buffer) => {
          capturedText += chunk.toString()
        })

        winSpeechProcess.on('close', async () => {
          winSpeechProcess = null
          const trimmed = capturedText.trim()
          if (trimmed && trimmed.length > 1) {
            sendToRenderer('transcription', { text: trimmed })
            sendToRenderer('kitten:state', 'thinking')

            const reply = await getSupernovaResponse(trimmed)

            const words = reply.split(' ')
            for (let i = 0; i < words.length; i++) {
              sendToRenderer('llm:delta', { text: (i === 0 ? '' : ' ') + words[i] })
              await new Promise((r) => setTimeout(r, 20))
            }

            sendToRenderer('kitten:state', 'speaking')
            setTimeout(() => {
              sendToRenderer('kitten:state', 'idle')
            }, 1500)
          } else {
            sendToRenderer('kitten:state', 'idle')
          }
        })
        return true
      } catch (err) {
        logger.error('Failed to start Windows speech recognition:', err)
        sendToRenderer('kitten:state', 'idle')
        return false
      }
    }

    if (recordingLock || !servicesReady) return false`;

if (channelsCode.includes("if (recordingLock || !servicesReady) return false") && !channelsCode.includes("winSpeechProcess")) {
  channelsCode = channelsCode.replace(targetOld, winRecorderStart);
  fs.writeFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', channelsCode);
  console.log('channels.ts patched with Windows speech recognition');
} else {
  console.log('channels.ts already patched or target not found');
}

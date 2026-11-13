const fs = require('fs');

let code = fs.readFileSync('D:/Rep/hi-kid/src/renderer/src/hooks/useConversation.ts', 'utf8');

const helperSnippet = `
function speakAssistant(text: string): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
      const clean = text.replace(/\\[Tip:.*?\\]/gi, '').replace(/\\[Grammar Tip:.*?\\]/gi, '')
      const u = new SpeechSynthesisUtterance(clean)
      u.lang = 'en-US'
      u.rate = 0.95
      window.speechSynthesis.speak(u)
    } catch {
      // ignore
    }
  }
}

let activeRecognition: any = null

function startBrowserSpeech(onResult: (text: string) => void): void {
  if (typeof window === 'undefined') return
  const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
  if (!SpeechRec) return
  try {
    if (activeRecognition) {
      activeRecognition.abort()
    }
    const rec = new SpeechRec()
    rec.lang = 'en-IN'
    rec.interimResults = false
    rec.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript
      if (text) onResult(text)
    }
    rec.start()
    activeRecognition = rec
  } catch (err) {
    console.warn('Speech recognition error:', err)
  }
}

function stopBrowserSpeech(): void {
  if (activeRecognition) {
    try {
      activeRecognition.stop()
    } catch {
      // ignore
    }
    activeRecognition = null
  }
}
`;

if (!code.includes('speakAssistant')) {
  code = helperSnippet + code;

  // Speak when state === 'speaking'
  code = code.replace(
    "if (state === 'thinking') {",
    `if (state === 'speaking') {
        setMessages((msgs) => {
          const last = msgs[msgs.length - 1]
          if (last && last.role === 'assistant' && last.text) {
            speakAssistant(last.text)
          }
          return msgs
        })
      } else if (state === 'thinking') {`
  );

  // Hook up startRecording & stopRecording
  code = code.replace(
    "const startRecording = useCallback(() => {\n    setIsRecording(true)",
    `const startRecording = useCallback(() => {\n    setIsRecording(true)\n    startBrowserSpeech((transcript) => { if (transcript) window.api.sendMessage(transcript) })`
  );

  code = code.replace(
    "const stopRecording = useCallback(() => {\n    setIsRecording(false)",
    `const stopRecording = useCallback(() => {\n    setIsRecording(false)\n    stopBrowserSpeech()`
  );

  // Hook up interrupt
  code = code.replace(
    "const interrupt = useCallback(() => {",
    `const interrupt = useCallback(() => {\n    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()`
  );

  fs.writeFileSync('D:/Rep/hi-kid/src/renderer/src/hooks/useConversation.ts', code);
  console.log('Successfully updated useConversation.ts with native SpeechSynthesis and SpeechRecognition!');
} else {
  console.log('Already patched');
}

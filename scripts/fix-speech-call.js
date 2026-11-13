const fs = require('fs');

let code = fs.readFileSync('D:/Rep/hi-kid/src/renderer/src/hooks/useConversation.ts', 'utf8');

code = code.replace(
  `  const startRecording = useCallback(() => {
    setIsRecording(true)
    window.api`,
  `  const startRecording = useCallback(() => {
    setIsRecording(true)
    startBrowserSpeech((transcript) => {
      if (transcript) window.api.sendMessage(transcript)
    })
    window.api`
);

code = code.replace(
  `  const stopRecording = useCallback(() => {
    setIsRecording(false)
    setIsProcessing(true)
    playSendSound()`,
  `  const stopRecording = useCallback(() => {
    setIsRecording(false)
    setIsProcessing(true)
    stopBrowserSpeech()
    playSendSound()`
);

fs.writeFileSync('D:/Rep/hi-kid/src/renderer/src/hooks/useConversation.ts', code);
console.log('Hooked up speech in useConversation.ts');

const fs = require('fs');
let code = fs.readFileSync('D:/Rep/hi-kid/src/renderer/src/hooks/useConversation.ts', 'utf8');

code = code.replace(
  /const startRecording = useCallback\(\(\) => \{[\r\n\s]+setIsRecording\(true\)[\r\n\s]+window\.api/,
  `const startRecording = useCallback(() => {\n    setIsRecording(true)\n    startBrowserSpeech((transcript) => {\n      if (transcript) window.api.sendMessage(transcript)\n    })\n    window.api`
);

code = code.replace(
  /const stopRecording = useCallback\(\(\) => \{[\r\n\s]+setIsRecording\(false\)[\r\n\s]+setIsProcessing\(true\)[\r\n\s]+playSendSound\(\)/,
  `const stopRecording = useCallback(() => {\n    setIsRecording(false)\n    setIsProcessing(true)\n    stopBrowserSpeech()\n    playSendSound()`
);

fs.writeFileSync('D:/Rep/hi-kid/src/renderer/src/hooks/useConversation.ts', code);
console.log('Successfully replaced functions in useConversation.ts');

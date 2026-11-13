const fs = require('fs');
let agent = fs.readFileSync('D:/Rep/hi-kid/src/main/services/agent.ts', 'utf8');
const searchStr = "logger.warn('TTS warm-up failed (first sentence may have a slight delay)')\n  }";
const replaceStr = "logger.warn('TTS warm-up failed (first sentence may have a slight delay)')\n  }\n  }";
if (agent.includes(searchStr)) {
  agent = agent.replace(searchStr, replaceStr);
  fs.writeFileSync('D:/Rep/hi-kid/src/main/services/agent.ts', agent);
  console.log('Successfully fixed bracket in agent.ts');
} else {
  // Check CRLF
  const searchStrCRLF = "logger.warn('TTS warm-up failed (first sentence may have a slight delay)')\r\n  }";
  const replaceStrCRLF = "logger.warn('TTS warm-up failed (first sentence may have a slight delay)')\r\n  }\r\n  }";
  if (agent.includes(searchStrCRLF)) {
    agent = agent.replace(searchStrCRLF, replaceStrCRLF);
    fs.writeFileSync('D:/Rep/hi-kid/src/main/services/agent.ts', agent);
    console.log('Successfully fixed CRLF bracket in agent.ts');
  } else {
    console.log('Target string not found');
  }
}

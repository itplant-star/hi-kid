const fs = require('fs');
let agent = fs.readFileSync('D:/Rep/hi-kid/src/main/services/agent.ts', 'utf8');

const target = `  if (process.platform !== 'win32') {
  // Warm up TTS engine so first real sentence doesn't hit cold-start truncation
  try {
    await fetch(\`\${localTtsBaseUrl}/v1/audio/speech\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: 'hello!',
        voice: 'Kiki',
        response_format: 'pcm',
        stream: true,
        speed: 1.0
      })
    })
  } catch {
    logger.warn('TTS warm-up failed (first sentence may have a slight delay)')
  }`;

const replacement = `  if (process.platform !== 'win32') {
    // Warm up TTS engine so first real sentence doesn't hit cold-start truncation
    try {
      await fetch(\`\${localTtsBaseUrl}/v1/audio/speech\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: 'hello!',
          voice: 'Kiki',
          response_format: 'pcm',
          stream: true,
          speed: 1.0
        })
      })
    } catch {
      logger.warn('TTS warm-up failed (first sentence may have a slight delay)')
    }
  }`;

agent = agent.replace(target, replacement);
fs.writeFileSync('D:/Rep/hi-kid/src/main/services/agent.ts', agent);
console.log('Successfully fixed agent.ts');

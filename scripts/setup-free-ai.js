const fs = require('fs');
const path = require('path');

// 1. Ensure D:\Rep\hi-kid\.config directory
const configDir = 'D:/Rep/hi-kid/.config';
fs.mkdirSync(configDir, { recursive: true });

// 2. Write free AI config
const freeConfig = {
  version: 1,
  aiName: "Kitten",
  systemPrompt: `You are a friendly English conversation partner named Kitten. Your goal is to help the user practice spoken English.

Rules:
- Always respond in English
- Keep responses concise (1-3 sentences) for natural conversation flow
- Be encouraging and supportive
- If the user makes grammar mistakes, gently correct them
- Ask follow-up questions to keep the conversation going
- Adapt to the user's level - if they're beginner, use simpler vocabulary
- Absolute prohibition of emoji usage / Emojis are strictly forbidden
`,
  baseUrl: "https://text.pollinations.ai/openai/v1",
  apiKey: "free",
  modelName: "openai"
};

fs.writeFileSync(path.join(configDir, 'config.json'), JSON.stringify(freeConfig, null, 2));
console.log('Free config written to D:/Rep/hi-kid/.config/config.json');

// 3. Update config.ts
let configTs = fs.readFileSync('D:/Rep/hi-kid/src/main/services/config.ts', 'utf8');
configTs = configTs.replace(
  "const CONFIG_DIR = path.join(process.env.HOME || os.homedir(), '.config', 'hi-kid')",
  "const CONFIG_DIR = 'D:/Rep/hi-kid/.config'"
);
configTs = configTs.replace(
  "baseUrl: 'http://localhost:11434/v1',",
  "baseUrl: 'https://text.pollinations.ai/openai/v1',"
);
configTs = configTs.replace(
  "apiKey: 'ollama',",
  "apiKey: 'free',"
);
configTs = configTs.replace(
  "modelName: 'qwen3:0.6b'",
  "modelName: 'openai'"
);
fs.writeFileSync('D:/Rep/hi-kid/src/main/services/config.ts', configTs);
console.log('config.ts updated');

// 4. Update channels.ts paths
let channelsTs = fs.readFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', 'utf8');
channelsTs = channelsTs.replace(
  "const HI_KID_DIR = path.join(process.env.HOME || os.homedir(), '.config', 'hi-kid')",
  "const HI_KID_DIR = 'D:/Rep/hi-kid/.config'"
);
channelsTs = channelsTs.replace(
  "const TMP_DIR = path.join(os.tmpdir(), 'hi-kid')",
  "const TMP_DIR = 'D:/temp/hi-kid'"
);
fs.writeFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', channelsTs);
console.log('channels.ts updated');

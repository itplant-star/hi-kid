const fs = require('fs');
const path = require('path');

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

const cConfigPath = 'C:/Users/Manojppc/.config/hi-kid/config.json';
const dConfigPath = 'D:/Rep/hi-kid/.config/config.json';

try {
  fs.mkdirSync(path.dirname(cConfigPath), { recursive: true });
  fs.writeFileSync(cConfigPath, JSON.stringify(freeConfig, null, 2));
  console.log('Updated C config');
} catch (e) {
  console.error('Error updating C config', e);
}

try {
  fs.mkdirSync(path.dirname(dConfigPath), { recursive: true });
  fs.writeFileSync(dConfigPath, JSON.stringify(freeConfig, null, 2));
  console.log('Updated D config');
} catch (e) {
  console.error('Error updating D config', e);
}

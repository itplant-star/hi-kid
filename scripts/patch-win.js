const fs = require('fs');

// Update App.tsx default text enabled
let app = fs.readFileSync('D:/Rep/hi-kid/src/renderer/src/App.tsx', 'utf8');
app = app.replace(
  "return saved === 'true'",
  "if (saved === null) return true;\n    return saved === 'true'"
);
fs.writeFileSync('D:/Rep/hi-kid/src/renderer/src/App.tsx', app);
console.log('App.tsx updated');

// Update ChatBubbles.tsx to include text input
let chat = fs.readFileSync('D:/Rep/hi-kid/src/renderer/src/components/ChatBubbles.tsx', 'utf8');
if (!chat.includes('inputText')) {
  chat = chat.replace("import { useEffect, useRef } from 'react'", "import { useEffect, useRef, useState } from 'react'");
  chat = chat.replace(
    "const containerRef = useRef<HTMLDivElement>(null)",
    `const containerRef = useRef<HTMLDivElement>(null)
  const [inputText, setInputText] = useState('')
  const handleSend = (): void => {
    if (!inputText.trim()) return
    window.api.sendMessage(inputText.trim())
    setInputText('')
  }`
  );

  const inputUI = `      <div ref={endRef} />
      <div style={{ display: 'flex', gap: '8px', padding: '10px 0', marginTop: '12px' }}>
        <input
          type="text"
          placeholder={"Type to " + aiName + "..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.15)', background: '#fff', outline: 'none', fontSize: '14px' }}
        />
        <button
          onClick={handleSend}
          type="button"
          style={{ padding: '8px 18px', background: '#e07a5f', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
        >
          Send
        </button>
      </div>`;

  chat = chat.replace("      <div ref={endRef} />", inputUI);
  fs.writeFileSync('D:/Rep/hi-kid/src/renderer/src/components/ChatBubbles.tsx', chat);
  console.log('ChatBubbles.tsx updated');
}

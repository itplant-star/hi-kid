const fs = require('fs');

// 1. Remove unused os in channels.ts
let channels = fs.readFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', 'utf8');
channels = channels.replace("import os from 'os'", "// import os from 'os'");
fs.writeFileSync('D:/Rep/hi-kid/src/main/ipc/channels.ts', channels);

// 2. Remove unused os in config.ts
let config = fs.readFileSync('D:/Rep/hi-kid/src/main/services/config.ts', 'utf8');
config = config.replace("import os from 'os'", "// import os from 'os'");
fs.writeFileSync('D:/Rep/hi-kid/src/main/services/config.ts', config);

console.log('Unused imports fixed');

const fs = require('fs');
let indexTs = fs.readFileSync('D:/Rep/hi-kid/src/main/index.ts', 'utf8');
if (!indexTs.includes("app.setPath('userData'")) {
  indexTs = indexTs.replace(
    "app.setName('HiKid')",
    "app.setName('HiKid')\napp.setPath('userData', 'D:/Rep/hi-kid/.config/userData')"
  );
  fs.writeFileSync('D:/Rep/hi-kid/src/main/index.ts', indexTs);
  console.log('Set userData path in index.ts');
}

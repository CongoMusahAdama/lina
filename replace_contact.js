
const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace Phone
content = content.replace(/233544477261/g, '233548164756');
content = content.replace(/\+233 544477261/g, '+233 54 816 4756 (Linas Essential)');
content = content.replace(/\+233 54 447 7261/g, '+233 54 816 4756 (Linas Essential)');

// Replace WA
content = content.replace(/233552739280/g, '233551082163');
content = content.replace(/\+233 552739280/g, '+233 55 108 2163');
content = content.replace(/\+233 55 273 9280/g, '+233 55 108 2163');
content = content.replace(/\+233 552 739 280/g, '+233 55 108 2163');
// Replace MoMo Name
content = content.replace(/FLORENCE ESHUN/g, 'Linas_Essentials');

// Replace handles (generalized)
content = content.replace(/@LinaHairCare/g, '@linas_essentials');

fs.writeFileSync('src/App.jsx', content);


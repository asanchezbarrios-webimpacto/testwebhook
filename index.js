const fs = require('fs');
const version = fs.readFileSync('./VERSION', 'utf8').trim();

console.log('🚀 Test Webhook Project');
console.log(`📦 Versión actual: ${version}`);
console.log('✅ Proyecto funcionando correctamente');


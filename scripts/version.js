const fs = require('fs');
const path = require('path');

// Leer versión actual
const versionFile = path.join(__dirname, '..', 'VERSION');
const packageFile = path.join(__dirname, '..', 'package.json');

const currentVersion = fs.readFileSync(versionFile, 'utf8').trim();
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Tipo de incremento (patch, minor, major)
const incrementType = process.argv[2] || 'patch';

let newVersion;
switch (incrementType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
  default:
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Actualizar VERSION
fs.writeFileSync(versionFile, newVersion + '\n');

// Actualizar package.json
const package = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
package.version = newVersion;
fs.writeFileSync(packageFile, JSON.stringify(package, null, 2) + '\n');

console.log(`✅ Versión actualizada: ${currentVersion} → ${newVersion}`);


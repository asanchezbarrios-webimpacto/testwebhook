const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const VERSION = fs.readFileSync('./VERSION', 'utf8').trim();

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Ruta para la API de versión
    if (req.url === '/api/version') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ version: VERSION }));
        return;
    }
    
    // Si es la raíz, servir index.html
    if (filePath === './') {
        filePath = './public/index.html';
    }
    
    // Si no tiene extensión, asumir que está en public
    if (!path.extname(filePath)) {
        filePath = path.join('./public', req.url);
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Error del servidor: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🚀 Servidor iniciado en http://localhost:' + PORT);
    console.log(`📦 Versión: ${VERSION}`);
    console.log('✅ Listo para probar el versionado automático');
});


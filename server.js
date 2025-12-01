const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Función para leer la versión actual (se lee cada vez para tener siempre la última)
function getVersion() {
    try {
        return fs.readFileSync('./VERSION', 'utf8').trim();
    } catch (error) {
        return '0.0.0';
    }
}

// Leer versión inicial para mostrar en el log
const INITIAL_VERSION = getVersion();

const server = http.createServer((req, res) => {
    // Ruta para la API de versión (lee la versión actual cada vez)
    if (req.url === '/api/version') {
        const currentVersion = getVersion();
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ version: currentVersion }));
        return;
    }
    
    // Determinar la ruta del archivo
    let filePath;
    if (req.url === '/') {
        filePath = './public/index.html';
    } else if (req.url.startsWith('/api/')) {
        // Si es otra ruta de API que no existe
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    } else {
        // Archivos estáticos desde la carpeta public
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
    console.log(`📦 Versión inicial: ${INITIAL_VERSION}`);
    console.log('✅ Listo para probar el versionado automático');
    console.log('💡 La versión se actualiza automáticamente al cambiar el archivo VERSION');
});


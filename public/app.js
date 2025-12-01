// Cargar versión desde el servidor
fetch('/api/version')
    .then(response => response.json())
    .then(data => {
        document.getElementById('version').textContent = data.version;
        document.getElementById('versionValue').textContent = data.version;
    })
    .catch(error => {
        console.error('Error al cargar la versión:', error);
        document.getElementById('version').textContent = 'N/A';
        document.getElementById('versionValue').textContent = 'N/A';
    });

// Función para cambiar el mensaje (solo para demostración)
let messageIndex = 0;
const messages = [
    'Mensaje original: Todo funciona correctamente ✅',
    'Mensaje cambiado: El sistema de versionado está activo 🚀',
    'Mensaje actualizado: Prueba exitosa del webhook 🔄',
    'Mensaje final: Versión automática funcionando perfectamente 🎉'
];

function changeMessage() {
    messageIndex = (messageIndex + 1) % messages.length;
    const messageElement = document.getElementById('message');
    messageElement.textContent = messages[messageIndex];
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'slideIn 0.3s ease-out';
    }, 10);
}


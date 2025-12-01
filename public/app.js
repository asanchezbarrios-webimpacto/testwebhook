// Cargar versión desde el servidor
fetch('/api/version')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener la versión');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.version) {
            document.getElementById('versionValue').textContent = data.version;
            document.title = `Test Webhook - Versión ${data.version}`;
        } else {
            throw new Error('Versión no encontrada en la respuesta');
        }
    })
    .catch(error => {
        console.error('Error al cargar la versión:', error);
        document.getElementById('versionValue').textContent = 'ERROR';
        document.title = 'Test Webhook - Error';
    });

// Función para cambiar el mensaje
let messageIndex = 0;
const messages = [
    'Sistema operativo',
    'Conexiones activas',
    'Red sincronizada',
    'Versión estable'
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

// Efecto Matrix (lluvia de código)
function initMatrix() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Globo terráqueo 3D con conexiones
function initGlobe() {
    const canvas = document.getElementById('globe');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    
    // Crear esfera (globo)
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Puntos de conexión en el globo
    const points = [];
    const numPoints = 20;
    
    for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(-1 + (2 * i) / numPoints);
        const theta = Math.sqrt(numPoints * Math.PI) * phi;
        
        const x = 2 * Math.cos(theta) * Math.sin(phi);
        const y = 2 * Math.sin(theta) * Math.sin(phi);
        const z = 2 * Math.cos(phi);
        
        points.push(new THREE.Vector3(x, y, z));
        
        // Crear punto visual
        const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const pointMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.8
        });
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        scene.add(point);
    }
    
    // Crear líneas de conexión entre puntos
    const connections = [];
    const maxConnections = 30;
    
    for (let i = 0; i < maxConnections; i++) {
        const point1 = points[Math.floor(Math.random() * points.length)];
        const point2 = points[Math.floor(Math.random() * points.length)];
        
        if (point1 !== point2) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            connections.push(line);
        }
    }
    
    // Posicionar cámara
    camera.position.z = 5;
    
    // Animación de rotación
    let rotationSpeed = 0.005;
    let connectionCount = connections.length;
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotar el globo
        sphere.rotation.y += rotationSpeed;
        
        // Animar las conexiones (efecto de pulso)
        connections.forEach((line, index) => {
            const time = Date.now() * 0.001;
            const opacity = 0.2 + Math.sin(time + index) * 0.3;
            line.material.opacity = Math.max(0.1, opacity);
        });
        
        // Rotar puntos
        scene.children.forEach((child, index) => {
            if (child instanceof THREE.Mesh && child.geometry.type === 'SphereGeometry' && child !== sphere) {
                child.rotation.y += 0.01;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Actualizar información de conexiones
    const connectionInfo = document.getElementById('connectionInfo');
    setInterval(() => {
        const activeConnections = Math.floor(Math.random() * 10) + connectionCount - 5;
        connectionInfo.textContent = `CONEXIONES ACTIVAS: ${activeConnections} | NODOS: ${numPoints} | ESTADO: OPERATIVO`;
    }, 2000);
    
    // Ajustar tamaño en resize
    window.addEventListener('resize', () => {
        const newWidth = canvas.offsetWidth;
        const newHeight = canvas.offsetHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    initMatrix();
    setTimeout(initGlobe, 500);
});

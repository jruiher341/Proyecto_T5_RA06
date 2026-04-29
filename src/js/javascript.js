// src/js/javascript.js
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('datos-gym');

    // Petición al backend usando fetch y .then() [cite: 221, 222]
    fetch('http://localhost:3000/api/datos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            // Visualización en pantalla de los datos [cite: 329]
            data.forEach(item => {
                const p = document.createElement('p');
                p.textContent = `Elemento: ${item.nombre_campo}`; 
                contenedor.appendChild(p);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la petición fetch:', error); [cite, 223]
        });
});
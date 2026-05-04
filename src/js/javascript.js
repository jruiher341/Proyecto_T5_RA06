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
      // En javascript.js
    .then(data => {
        data.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `Gimnasio: ${item.nombre} - Tel: ${item.telefono}`; 
            contenedor.appendChild(p);
    });
})
        .catch(error => {
            console.error('Hubo un problema con la petición fetch:', error); [cite, 223]
        });
});

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('datos-gym');
  const API_URL = 'http://localhost:3000';
 
 fetch(`${API_URL}/api/centros`)
        .then(response => {
            if (!response.ok) throw new Error('Error ' + response.status);
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                contenedor.innerHTML = '<p>No hay centros disponibles</p>';
                return;
            }
            data.forEach(centro => {
                const card = document.createElement('div');
                card.className = 'centro-card';
                card.innerHTML = `
                    <h3>${centro.CenNom}</h3>
                    <p>📍 ${centro.CenDir}</p>
                    <p>📞 <a href="tel:${centro.CenTel}">${centro.CenTel}</a></p>
                    <p>✉ <a href="mailto:${centro.CenEma}">${centro.CenEma}</a></p>
                `;
                contenedor.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al cargar los centros:', error);
            contenedor.innerHTML = '<p style="color:var(--primario)">Error al cargar los datos</p>';
        });
});


// src/js/javascript.js
// document.addEventListener('DOMContentLoaded', () => {
//     const contenedor = document.getElementById('datos-gym');
//     const API_URL = 'http://localhost:3000'; // URL del endpoint en el backend
    
//     if (!contenedor) {
//         console.warn('Elemento #datos-gym no encontrado en el DOM');
//         return;
//     }

//     // Petición al backend usando fetch y .then() [cite: 221, 222]

//   fetch(`${API_URL}/api/datos`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la respuesta de la red: ' + response.status);
//             }
//             return response.json();
//         })
//         // En javascript.js
//         .then(data => {
//             if (!data || data.length === 0) {
//                 contenedor.innerHTML = '<p>No hay datos disponibles</p>';
//                 return;
//             }
//             data.forEach(item => {
//                 const p = document.createElement('p');
//                 p.textContent = `Gimnasio: ${item.nombre} - Tel: ${item.telefono}`;
//                 contenedor.appendChild(p);
//             });
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la petición fetch:', error);
//             contenedor.innerHTML = '<p style="color: red;">Error al cargar los datos</p>';
//         });
// });
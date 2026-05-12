
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
                    <div class="img-gym">
                        <img src="./assets/images/ThorFitness_logo.png" alt="image/png">
                    </div>
                    <div>
                        <h3>${centro.CenNom}</h3>
                        <p>📍 ${centro.CenDir}</p>
                        <p>📞 <a href="tel:${centro.CenTel}">${centro.CenTel}</a></p>
                        <p>✉ <a href="mailto:${centro.CenEma}">${centro.CenEma}</a></p>
                    </div>
                    <div class="ubicacion">
                        <iframe src="${centro.CenDir}" frameborder="0"></iframe>
                    </div>
                `;
                contenedor.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al cargar los centros:', error);
            contenedor.innerHTML = '<p style="color:var(--primario)">Error al cargar los datos</p>';
        });
});
const URL_API = "http://localhost:3000/socios";

async function registrarSocio(event) {
    event.preventDefault();
    
    const datos = {
        nombre: document.getElementById('socio-nombre').value,
        apellido: document.getElementById('socio-apellido').value, // Asegúrate de capturar este ID
        email: document.getElementById('socio-email').value,
        telefono: document.getElementById('socio-telefono').value
    };

    try {
        const res = await fetch('http://localhost:3000/socios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (res.ok) {
            alert("¡Socio registrado con éxito!");
            event.target.reset();
        } else {
            // Si entra aquí, mira la consola de tu terminal donde corre Node
            alert("Error en el servidor al registrar.");
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
}

// FUNCIÓN PARA VER SOCIOS
async function verSocios() {
    const contenedor = document.getElementById('lista-socios');
    
    try {
        const respuesta = await fetch('http://localhost:3000/socios');
        const socios = await respuesta.json();

        contenedor.innerHTML = ""; // Limpiar lista

        socios.forEach(s => {
            // IMPORTANTE: Usamos s.UsuNom y s.CodUsu (como están en tu SQL)
            contenedor.innerHTML += `
                <div style="border: 1px solid #ffcc00; padding: 10px; margin-top: 10px; color: white; background: #222;">
                    <p><strong>ID: ${s.CodUsu}</strong> - ${s.UsuNom} (${s.UsuEma})</p>
                    <button onclick="actualizarSocio(${s.CodUsu}, '${s.UsuNom}')" style="cursor:pointer; background:#ffcc00; color:black; border:none; padding:5px;">
                        ACTUALIZAR NOMBRE
                    </button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// FUNCIÓN PARA ACTUALIZAR
async function actualizarSocio(id, nombreActual) {
    const nuevoNombre = prompt("Nuevo nombre para el socio:", nombreActual);
    
    if (nuevoNombre && nuevoNombre !== nombreActual) {
        const res = await fetch(`http://localhost:3000/socios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre })
        });

        if (res.ok) {
            alert("¡Actualizado!");
            verSocios(); // Recargar la lista
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('datos-gym');
    const API_URL = 'http://localhost:3000';

    // 1. CARGAR CENTROS
    if (contenedor) {
        fetch(`${API_URL}/api/centros`)
            .then(response => {
                if (!response.ok) throw new Error('Error ' + response.status);
                return response.json();
            })
            .then(centros => {
                if (!centros || centros.length === 0) {
                    contenedor.innerHTML = '<p>No hay centros disponibles</p>';
                    return;
                }
                centros.forEach(centro => {
                    const direccionURL = encodeURIComponent(centro.CenDir);
                    const card = document.createElement('div');
                    card.className = 'centro-card';          
                    card.innerHTML = `
                        <div class="img-gym">
                            <img src="../assets/images/ThorFitness_logo.png" alt="image/png">
                        </div>
                        <div class="descripcion">
                            <h3>${centro.CenNom}</h3>
                            <p>📍 ${centro.CenDir}</p>
                            <p>📞 <a href="tel:${centro.CenTel}">${centro.CenTel}</a></p>
                            <p>✉ <a href="mailto:${centro.CenEma}">${centro.CenEma}</a></p>
                        </div>
                        <div class="ubicacion">
                            <iframe
                                src="https://www.google.com/maps?q=${direccionURL}&output=embed"
                                width="100%"
                                height="250"
                                style="border:0;"
                                loading="lazy">
                            </iframe>
                        </div>
                    `;
                    contenedor.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error al cargar los centros:', error);
                contenedor.innerHTML = '<p style="color:var(--primario)">Error al cargar los datos</p>';
            });
    }

    // Cargar listas iniciales si los elementos existen en el HTML
    if (document.getElementById('lista-membresias')) {
        verMembresias();
    }
    if (document.getElementById('lista-socios')) {
        verSocios();
    }
});

// ==========================================
// SECCIÓN: SOCIOS 
// ==========================================

function registrarSocio(event) {
    event.preventDefault();
    
    const datos = {
        nombre: document.getElementById('socio-nombre').value,
        apellido: document.getElementById('socio-apellido').value, 
        email: document.getElementById('socio-email').value,
        telefono: document.getElementById('socio-telefono').value
    };

    fetch('http://localhost:3000/socios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (res.ok) {
            alert("¡Socio registrado con éxito!");
            event.target.reset();
            if (document.getElementById('lista-socios')) verSocios();
        } else {
            alert("Error en el servidor al registrar.");
        }
    })
    .catch(error => {
        alert("No se pudo conectar con el servidor.");
    });
}

function verSocios() {
    const contenedor = document.getElementById('lista-socios');
    if (!contenedor) return;
    
    fetch('http://localhost:3000/socios')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al obtener socios');
            return respuesta.json();
        })
        .then(socios => {
            contenedor.innerHTML = ""; 
            socios.forEach(s => {
                contenedor.innerHTML += `
                    <div style="border: 1px solid #ffcc00; padding: 10px; margin-top: 10px; color: white; background: #222;">
                        <p><strong>ID: ${s.CodUsu}</strong> - ${s.UsuNom} (${s.UsuEma})</p>
                        <button onclick="actualizarSocio(${s.CodUsu}, '${s.UsuNom}')" style="cursor:pointer; background:#ffcc00; color:black; border:none; padding:5px;">
                            ACTUALIZAR NOMBRE
                        </button>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function actualizarSocio(id, nombreActual) {
    const nuevoNombre = prompt("Nuevo nombre para el socio:", nombreActual);
    
    if (nuevoNombre && nuevoNombre !== nombreActual) {
        fetch(`http://localhost:3000/socios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre })
        })
        .then(res => {
            if (res.ok) {
                alert("¡Actualizado!");
                verSocios(); 
            }
        })
        .catch(error => {
            console.error("Error al actualizar:", error);
        });
    }
}

// ==========================================
// SECCIÓN: MEMBRESÍAS
// ==========================================

function verMembresias() {
    const contenedor = document.getElementById('lista-membresias');
    if (!contenedor) return;

    fetch('http://localhost:3000/api/membresias')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al obtener membresías');
            return respuesta.json();
        })
        .then(membresias => {
            contenedor.innerHTML = ""; 
            membresias.forEach(m => {
                contenedor.innerHTML += `
                    <div class="membresia-card" style="border: 1px solid #ffcc00; padding: 15px; margin-top: 10px; color: white; background: #111;">
                        <h4>${m.MemNom}</h4>
                        <p>Precio: $${m.MemPre}</p>
                        <button onclick="contratarMembresia(${m.MemId})" style="cursor:pointer; background:#ffcc00; color:black; border:none; padding:8px 12px; font-weight:bold;">
                            ASIGNAR PLAN
                        </button>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error al cargar membresías:", error);
        });
}

function contratarMembresia(idMembresia) {
    const idSocio = prompt("Introduce el ID del socio (CodUsu) para asignarle esta membresía:"); 
    if (!idSocio) return;

    const hoy = new Date().toISOString().split('T')[0];
    const unMesDespues = new Date();
    unMesDespues.setDate(unMesDespues.getDate() + 30);
    const fin = unMesDespues.toISOString().split('T')[0];

    const datos = {
        idSocio: idSocio,
        idMembresia: idMembresia,
        fechaInicio: hoy,
        fechaFin: fin
    };

    fetch('http://localhost:3000/api/membresias/asignar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (res.ok) {
            alert("¡Membresía asignada correctamente al socio!");
        } else {
            alert("Error en el servidor al asignar la membresía.");
        }
    })
    .catch(error => {
        console.error("Error al conectar:", error);
        alert("No se pudo conectar con el servidor.");
    });
}
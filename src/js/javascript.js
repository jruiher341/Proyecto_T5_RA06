document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('datos-gym');
    const url = 'http://localhost:3000';

    // CARGAR CENTROS
    if (contenedor) {
        fetch(`${url}/api/centros`)
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
                    const dir = encodeURIComponent(centro.CenDir);
                    const tarjeta = document.createElement('div');
                    tarjeta.className = 'centro-card';          
                    tarjeta.innerHTML = `
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
                                src="https://www.google.com/maps?q=${dir}&output=embed"
                                width="100%"
                                height="250"
                                style="border:0;"
                                loading="lazy">
                            </iframe>
                        </div>
                    `;
                    contenedor.appendChild(tarjeta);
                });
            })
            .catch(error => {
                console.error('Error al cargar los centros:', error);
                contenedor.innerHTML = '<p style="color:var(--primario)">Error al cargar los datos</p>';
            });
    }
    
    // Cargar lista inicial si los elementos existen en el HTML
    if (document.getElementById('lista-membresias')) {
        verMembresias();
    }
    
    // Cargar lista si se clickea en el botón
    const listaSocios = document.getElementById('lista-socios');
    
    if (listaSocios) {
        listaSocios.addEventListener('click', () => {
            verSocios();
        });
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
            contenedor.innerHTML = ""; // Limpiamos la lista antes de volver imprimirlo
            
            socios.forEach(socio => {

                contenedor.innerHTML += `
                    <div style="border: 1px solid #ffcc00; padding: 10px; margin-top: 10px; color: white; background: #222; position: relative;">
                        <p><strong>ID: ${socio.CodUsu}</strong> - ${socio.UsuNom} (${socio.UsuEma})</p>
                        
                        <button onclick="actualizarSocio(${socio.CodUsu}, '${socio.UsuNom}')" style="cursor:pointer; background:#ffcc00; color:black; border:none; padding:5px; font-weight: bold;">
                            ACTUALIZAR NOMBRE
                        </button>

                        <button onclick="eliminarSocio(${socio.CodUsu})" style="position: absolute; bottom: 10px; right: 10px; cursor: pointer; background: #FF3333; color: white; border: none; padding: 5px 10px; font-weight: bold;">
                            BORRAR
                        </button>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function actualizarSocio(id, nombre) {
    const nuevo = prompt("Nuevo nombre para el socio:", nombre);
    
    if (nuevo && nuevo !== nombre) {
        fetch(`http://localhost:3000/socios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevo })
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
    const contenedor = document.querySelector(".seccion-membresias");
    if (!contenedor) return;

    fetch('http://localhost:3000/api/membresia')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al obtener membresías');
            return respuesta.json();
        })
        .then(membresias => {
            contenedor.innerHTML = ""; 
            membresias.forEach(m => {
                contenedor.innerHTML += `
                    <section class="card-membresia">
                        <h4>${m.MemNom}</h4>
                        <div>
                            <p>${m.MemPre}€</p>
                            <p>Periodo de ${m.MemDur} días</p>
                        </div>
                        <button class="boton" onclick="contratarMembresia(${m.CodMem})">
                            ASIGNAR PLAN
                        </button>
                    </section>
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

    const inicio = new Date().toISOString().split('T')[0];
    const fin = new Date();
    fin.setDate(fin.getDate() + 30);
    const vencimiento = fin.toISOString().split('T')[0];

    const datos = {
        idSocio: idSocio,
        idMembresia: idMembresia,
        fechaInicio: inicio,
        fechaFin: vencimiento
    };

    fetch('http://localhost:3000/api/membresia/asignar', {
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
// Supongamos que esta es tu función que pinta los socios en el HTML
function mostrarSocios(socios) {
    const contenedor = document.getElementById('contenedor-usuarios'); // El id de tu HTML
    contenedor.innerHTML = ''; // Limpiamos antes de pintar

    socios.forEach(socio => {
        // Creamos la tarjeta del socio
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-socio';

        // Contenido de texto y botones en HTML
        tarjeta.innerHTML = `
            <p class="info-socio">
                ID: ${socio.CodUsu} - ${socio.UsuNom} (${socio.UsuEma})
            </p>
            <button class="boton-actualizar" onclick="actualizarSocio(${socio.CodUsu})">
                ACTUALIZAR NOMBRE
            </button>
            <button class="boton-borrar" onclick="eliminarSocio(${socio.CodUsu})">
                BORRAR
            </button>
        `;
        
        // Metemos la tarjeta en el contenedor de la página
        contenedor.appendChild(tarjeta);
    });
}

// FUNCIÓN FETCH PARA CONECTAR CON EL BACKEND Y BORRAR
function eliminarSocio(id) {
    // Alerta de confirmación típica de navegador, muy usada en 1º de DAW
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar al socio con ID ${id}?`);
    
    if (confirmar) {
        fetch(`http://localhost:3000/socios/${id}`, {
            method: 'DELETE' // Indicamos el método DELETE que creamos en el backend
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Muestra "Socio eliminado correctamente"
            verSocios(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo eliminar al socio');
        });
    }
}
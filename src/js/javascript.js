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
            contenedor.innerHTML = ""; // Limpiamos la lista antes de volver a pintar
            
            socios.forEach(s => {
                // Modificamos el bloque HTML añadiendo "position: relative" a la caja contenedora
                // y sumamos el botón de borrar con estilos idénticos en la esquina inferior derecha
                contenedor.innerHTML += `
                    <div style="border: 1px solid #ffcc00; padding: 10px; margin-top: 10px; color: white; background: #222; position: relative;">
                        <p><strong>ID: ${s.CodUsu}</strong> - ${s.UsuNom} (${s.UsuEma})</p>
                        
                        <button onclick="actualizarSocio(${s.CodUsu}, '${s.UsuNom}')" style="cursor:pointer; background:#ffcc00; color:black; border:none; padding:5px; font-weight: bold;">
                            ACTUALIZAR NOMBRE
                        </button>

                        <button onclick="eliminarSocio(${s.CodUsu})" style="position: absolute; bottom: 10px; right: 10px; cursor: pointer; background: #FF3333; color: white; border: none; padding: 5px 10px; font-weight: bold;">
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
    const contenedor = document.querySelector(".seccion-membresias");
    if (!contenedor) return;

    fetch('http://localhost:3000/api/membresia')
        .then(respuesta => {
            if (!respuesta.ok) throw new Error('Error al obtener membresías');
            return respuesta.json();
        })
        .then(membresia => {
            contenedor.innerHTML = ""; 
            membresia.forEach(m => {
                contenedor.innerHTML += `
                    <section class="seccion-membresias" style="border: 1px solid #ffcc00; padding: 15px; margin-top: 10px; color: white; background: #111;">
                        <h4>${m.MemNom}</h4>
                        <p>Precio: $${m.MemPre}</p>
                        <button onclick="contratarMembresia(${m.CodMem})" style="cursor:pointer; background:#ffcc00; color:black; border:none; padding:8px 12px; font-weight:bold;">
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
    const contenedorPrincipal = document.getElementById('contenedor-usuarios'); // El id de tu HTML
    contenedorPrincipal.innerHTML = ''; // Limpiamos antes de pintar

    socios.forEach(socio => {
        // Creamos la tarjeta del socio
        const tarjetaSocio = document.createElement('div');
        
        // ESTILOS: Mismo borde amarillo, fondo oscuro y añadimos position relative 
        // para que el botón de borrar se posicione bien abajo a la derecha
        tarjetaSocio.style.border = '1px solid #FFD700'; 
        tarjetaSocio.style.padding = '20px';
        tarjetaSocio.style.marginBottom = '15px';
        tarjetaSocio.style.backgroundColor = '#1a1a1a';
        tarjetaSocio.style.position = 'relative'; // ¡Muy importante!

        // Contenido de texto y botón de actualizar actual
        tarjetaSocio.innerHTML = `
            <p style="color: white; font-weight: bold; text-align: center;">
                ID: ${socio.CodUsu} - ${socio.UsuNom} (${socio.UsuEma})
            </p>
            <button onclick="actualizarSocio(${socio.CodUsu})" style="background-color: #FFD700; color: black; font-weight: bold; border: none; padding: 5px 10px; cursor: pointer;">
                ACTUALIZAR NOMBRE
            </button>
        `;

        // Creamos el botón de borrar de forma manual para asignarle el evento fácilmente
        const botonBorrar = document.createElement('button');
        botonBorrar.innerText = 'BORRAR';
        
        // ESTILOS: Color rojo, y posicionado de forma absoluta abajo a la derecha
        botonBorrar.style.position = 'absolute';
        botonBorrar.style.bottom = '10px';
        botonBorrar.style.right = '10px';
        botonBorrar.style.backgroundColor = '#FF3333';
        botonBorrar.style.color = 'white';
        botonBorrar.style.border = 'none';
        botonBorrar.style.padding = '5px 10px';
        botonBorrar.style.fontWeight = 'bold';
        botonBorrar.style.cursor = 'pointer';

        // Asignamos el evento de click que llamará a la función de la Base de Datos
        botonBorrar.onclick = function() {
            eliminarSocio(socio.CodUsu);
        };

        // Metemos el botón dentro de la tarjeta del socio
        tarjetaSocio.appendChild(botonBorrar);
        
        // Metemos la tarjeta en el contenedor de la página
        contenedorPrincipal.appendChild(tarjetaSocio);
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
            verSocios(); // Vuelve a cargar la lista de socios para actualizar la pantalla
            // Aquí vuelves a llamar a la función que recarga/pinta la lista 
            // de usuarios para que desaparezca visualmente de la pantalla. Ejemplo:
            // obtenerSocios(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo eliminar al socio');
        });
    }
}
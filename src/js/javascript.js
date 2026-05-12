
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('datos-gym');
    const API_URL = 'http://localhost:3000';

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
                        <img src="./assets/images/ThorFitness_logo.png" alt="image/png">
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
});

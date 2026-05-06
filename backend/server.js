// backend/server.js

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'thor',
    database: process.env.DB_NAME || 'thor_db'
};

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig); // Recreamos el objeto de conexión

    connection.connect((err) => {
        if (err) {
            console.error('Error conectando a la BD (reintentando en 5s):', err.message);
            setTimeout(handleDisconnect, 5000); // Espera 5 segundos y reintenta
        } else {
            console.log('Conectado a la base de datos MySQL');
        }
    });

    connection.on('error', (err) => {
        console.error('Error de red en la BD:', err.message);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
            handleDisconnect(); // Si se pierde la conexión, la reiniciamos
        } else {
            throw err;
        }
    });
}

handleDisconnect();
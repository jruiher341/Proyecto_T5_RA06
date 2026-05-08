// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;           // Puerto donde correrá nuestro servidor Express
const ENDPOINT_SERVER = "http://localhost"; // URL base de nuestro servidor

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../src')));

// CONFIGURACIÓN DE CONEXIÓN [cite: 48, 117]
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || 'thor',
//     database: process.env.DB_NAME || 'thor_db'
// });

const pool_mysql = mysql.createPool({
    host: "localhost", // Dirección del servidor
    port: 3306, // Puerto al que nos conectamos en MySQL
    user: "root", // Usuario al que nos conectamos
    password: "", // Contraseña del usuario al que nos conectamos
    database: "thor_db", // Nombre de la base de datos que nos
    waitForConnections: true,
    connectionLimit: 10, // Define el máximo de conexiones simultáneas
    queueLimit: 0
});

pool_mysql.getConnection((error, connection) => {
    if (error) {
        console.error("Error conectando a MySQL:", error);
        process.exit(1); // Si falla la BD, cerramos el servidor
    }
    connection.release();
    // Iniciamos el servidor en el puerto especificado
    app.listen(PORT, () => {
        // Confirmación en la consola de que se ha lanzado el servidor OK
        console.log(`Conectado a MySQL. Servidor corriendo en
http://localhost:${PORT}`);
    });
});



// Conectar a la base de datos
// connection.connect((err) => {
//     if (err) {
//         console.error('Error conectando a la base de datos:', err.message);
//         setTimeout(() => connection.connect(), 2000);
//     } else {
//         console.log('Conectado a la base de datos MySQL');
//     }
// });

// Manejar desconexiones inesperadas
// connection.on('error', (err) => {
//     console.error('Error de conexión a la BD:', err.message);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         connection.connect();
//     }
// });

// ENDPOINT GET: Listar datos [cite: 279]
// En server.js
app.get('/api/centros', (req, res) => {
    const query = 'SELECT * FROM centro';
    pool_mysql.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error no capturado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Thor Fitness en ${ENDPOINT_SERVER}:${PORT}`);
});
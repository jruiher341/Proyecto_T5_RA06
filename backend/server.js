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
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'thor',
    database: process.env.DB_NAME || 'thor_db'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        setTimeout(() => connection.connect(), 2000);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Manejar desconexiones inesperadas
connection.on('error', (err) => {
    console.error('Error de conexión a la BD:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connection.connect();
    }
});

// ENDPOINT GET: Listar datos [cite: 279]
// En server.js
app.get('/api/datos', (req, res) => {
    const query = 'SELECT * FROM centro';
    connection.query(query, (err, results) => {
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
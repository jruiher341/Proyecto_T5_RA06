const PORT = 3000;                        // Puerto donde correrá nuestro servidor Express 
const ENDPOINT_SERVER = "http://localhost"; // URL base de nuestro servidor 
// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../src')));

// CONFIGURACIÓN DE CONEXIÓN [cite: 48, 117]
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'thor', 
    database: 'thor_db'
});

// ENDPOINT GET: Listar datos [cite: 279]
app.get('/api/datos', (req, res) => {
    const query = 'SELECT * FROM tu_tabla';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results); // Envío en formato JSON obligatorio
    });
});

app.listen(3000, () => {
    console.log('Servidor Thor Fitness en http://localhost:3000');
});
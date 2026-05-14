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

const pool_mysql = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // Dirección del servidor
    port: 3306, // Puerto al que nos conectamos en MySQL
    user: process.env.DB_USER || "root", // Usuario al que nos conectamos
    password: process.env.DB_PASSWORD || "", // Contraseña del usuario al que nos conectamos
    database: process.env.DB_NAME || "thor_db", // Nombre de la base de datos que nos conectamos
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
// backend/server.js (Añade esto a tus rutas existentes)
// CREAR SOCIO (POST)
// --- CREAR (POST): Registrar un nuevo socio ---
app.post('/socios', (req, res) => {
    // Recogemos nombre, apellido, email y telefono del frontend
    const { nombre, apellido, email, telefono } = req.body; 
    
    // IMPORTANTE: Tu tabla 'usuario' pide UsuNom, UsuApe, UsuEma, UsuTel, UsuRol, UsuDNI, UsuCon
    const query = 'INSERT INTO usuario (UsuNom, UsuApe, UsuEma, UsuTel, UsuRol, UsuDNI, UsuCon) VALUES (?, ?, ?, ?, "Socio", "Pendiente", "1234")';
    
    pool_mysql.query(query, [nombre, apellido, email, telefono], (err, result) => {
        if (err) {
            console.error("Error SQL detallado:", err.message); // Esto saldrá en tu terminal de Docker
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Socio registrado con éxito', id: result.insertId });
    });
});

// --- LEER (GET): Obtener todos los socios ---
app.get('/socios', (req, res) => {
    // Usamos pool_mysql y los nombres de tu tabla 'usuario'
    pool_mysql.query('SELECT CodUsu, UsuNom, UsuEma, UsuTel FROM usuario WHERE UsuRol = "Socio"', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- ACTUALIZAR (PUT): Modificar nombre de un socio ---
app.put('/socios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body; // Recibimos el nuevo nombre
    
    // Tu tabla usa 'CodUsu' como ID y 'UsuNom' para el nombre
    const query = 'UPDATE usuario SET UsuNom = ? WHERE CodUsu = ?';

    pool_mysql.query(query, [nombre, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Socio actualizado correctamente' });
    });
});
// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error no capturado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});


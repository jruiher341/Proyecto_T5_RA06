// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const PUERTO = process.env.PORT || 3000;           // Puerto del servidor
const URL_BASE = "http://localhost"; // URL base de nuestro servidor

const app = express();
app.use(cors());
app.use(express.json());
// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../src')));

const conexion = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // Dirección
    port: 3306, // Puerto
    user: process.env.DB_USER || "root", // Usuario
    password: process.env.DB_PASSWORD || "", // Contraseña
    database: process.env.DB_NAME || "thor_db", // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10, // Maximo de las conexiones que pueden haber
    queueLimit: 0
});

conexion.getConnection((error, conn) => {
    if (error) {
        console.error("Error conectando a MySQL:", error);
        process.exit(1); // Si falla la BD, se cierra el servidor
    }
    conn.release();
    // Iniciamos el servidor en el puerto especificado
    app.listen(PUERTO, () => {

        console.log(`Conectado a MySQL. Servidor corriendo en http://localhost:${PUERTO}`);
    });
});


// ENDPOINT GET: Listar datos
app.get('/api/centros', (req, res) => {
    const consulta = 'SELECT * FROM centro';
    conexion.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error en la consulta:', error.message);
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// CRUD

// CREAR SOCIO (POST)
// --- CREAR (POST): Registrar un nuevo socio ---
app.post('/socios', (req, res) => {
    // Recogemos nombre, apellido, email y telefono del frontend
    const { nombre, apellido, email, telefono } = req.body; 
    
    const consulta = 'INSERT INTO usuario (UsuNom, UsuApe, UsuEma, UsuTel, UsuRol, UsuDNI, UsuCon) VALUES (?, ?, ?, ?, "Socio", "Pendiente", "1234")';
    
    conexion.query(consulta, [nombre, apellido, email, telefono], (error, resultado) => {
        if (error) {
            console.error("Error SQL detallado:", error.message);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Socio registrado con éxito', id: resultado.insertId });
    });
});

// --- LEER (GET): Obtener todos los socios ---
app.get('/socios', (req, res) => {

    conexion.query('SELECT CodUsu, UsuNom, UsuEma, UsuTel FROM usuario WHERE UsuRol = "Socio"', (error, resultados) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(resultados);
    });
});

// --- ACTUALIZAR (PUT): Modificar nombre de un socio ---
app.put('/socios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body; // Recibimos el nuevo nombre
    
    const consulta = 'UPDATE usuario SET UsuNom = ? WHERE CodUsu = ?';

    conexion.query(consulta, [nombre, id], (error, resultado) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ message: 'Socio actualizado correctamente' });
    });
});


// ==========================================
// SECCIÓN: MEMBRESÍAS
// ==========================================

// --- LEER (GET): Obtener todas las membresías ---
app.get('/api/membresia', (req, res) => {
    const consulta = 'SELECT * FROM membresia';
    conexion.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error en la consulta:', error.message);
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// --- CREAR (POST): Asignar membresía a un socio ---
app.post('/api/membresia/asignar', (req, res) => {
    const { idSocio, idMembresia, fechaInicio, fechaFin } = req.body;
    
    // Insertar en la tabla socio (usuario + membresia)
    const consulta = 'INSERT INTO socio (usuario_CodUsu, membresia_CodMem) VALUES (?, ?)';
    
    conexion.query(consulta, [idSocio, idMembresia], (error, resultado) => {
        if (error) {
            console.error("Error SQL detallado:", error.message);
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Membresía asignada correctamente', id: resultado.insertId });
    });
});

// --- ELIMINAR (DELETE): Borrar un socio ---
app.delete('/socios/:id', (req, res) => {
    const { id } = req.params; // Capturamos el ID de la URL
    
    // Borrar por clave primaria (CodUsu)
    const consulta = 'DELETE FROM usuario WHERE CodUsu = ?';

    conexion.query(consulta, [id], (error, resultado) => {
        if (error) {
            console.error("Error al eliminar socio:", error.message);
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Socio eliminado correctamente' });
    });
});

// Error global
app.use((err, req, res, next) => {
    console.error('Error no capturado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});


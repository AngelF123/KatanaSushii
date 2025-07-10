const express = require('express');
const app = express();
const conexion = require('./conexion');

app.use(express.json());
app.use(express.static('public')); // Ajusta si tu carpeta frontend se llama diferente

app.post('/api/register', (req, res) => {
    console.log("¡Recibí una petición de registro!");
    const { tipo_documento, documento, nombre, apellido, telefono, direccion, ciudad, email, password } = req.body;

    if (!tipo_documento || !documento || !nombre || !apellido || !direccion || !ciudad || !email || !password) {
        return res.status(400).json({ success: false, message: 'Faltan campos obligatorios.' });
    }

    // Aquí defines la variable sql ANTES de usarla
    const sql = `INSERT INTO usuarios 
        (tipo_documento, documento, nombre, apellido, telefono, direccion, ciudad, email, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(sql, [tipo_documento, documento, nombre, apellido, telefono, direccion, ciudad, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error al registrar usuario.', error: err });
        }
        res.json({ success: true, message: 'Usuario registrado correctamente.' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


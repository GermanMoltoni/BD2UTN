const express = require('express');
const mongoose = require('mongoose');
const application = express();
const port = 3000;
application.use(express.json());
// Configuración de CORS
application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoose.connect(
    'mongodb://root:example@mongodb:27017/biblioteca?authSource=admin',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    const db = mongoose.connection.useDb('biblioteca');
});

const LibroModel = mongoose.model('Libro', new mongoose.Schema({
    titulo: String,
    autor: String,
    generos: [String],
    fecha_publicacion: Date,
    precio: Number,
    cantidad: Number
}));

application.get('/libros', async (req, res) => {
    const libros = await LibroModel.find();
    res.json(libros);
})

application.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
}
);

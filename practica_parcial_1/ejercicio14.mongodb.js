//Agregar el precio de alquiler de los libros. Este precio cambia 2 veces por año.

// crear colletion de precios
// de acuerdo a la fecha de egreso, elegir el precio con fecha anterior y máxima.
use("biblioteca");

const libros = db.libros.find();
let precios = [];
libros.forEach(libro => {

    precios = precios.concat([
        { 'book_id': libro._id, 'valor': Math.random() * 10000, 'fecha': new ISODate('2025-02-23') },
        { 'book_id': libro._id, 'valor': Math.random() * 10000, 'fecha': new ISODate('2025-04-23') }
    ]);
})

db.precios_alquiler.insertMany(precios);
// Agregar a cada libro un campo Indice que se corresponde con un array de capítulos. Cada capítulo se corresponde con un 
// objeto con los siguientes campos: Nro, Titulo, Subtitulo. Agregar entre 5 y 10 capítulos por libro.

use("biblioteca");

const libros = db.libros.find();
for (const libro of libros) {
    let capitulos = [];
    for (let index = 1; index < Math.floor(Math.random() * 10) + 5; index++) {

        capitulos.push({
            nro: index,
            titulo: 'Capitulo ' + index,
            subtitulo: 'Subcapitulo ' + index,
        })

    }
    db.libros.updateOne({ _id: libro._id }, { $set: { indice: capitulos } })
}

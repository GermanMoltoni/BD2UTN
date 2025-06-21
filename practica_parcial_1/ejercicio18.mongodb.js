/**
 * Actualizar la colección de libros con un array de autores donde cada autor sea un objeto conformado con dos 
 * atributos: Nombre y Nacionalidad. Cargar una nacionalidad aleatoria para los distintos autores.
 */
use("biblioteca");
db.libros.updateMany({}, { $unset: { autor: '' } })
const autores = ['J. K. Rowling', 'Stephenie Meyer', 'Miguel de Cervantes', 'Gabriel García Márquez', 'Antoine de Saint-Exupéry', 'Oscar Wilde'];
const nacionalidad = ['Argentino', 'Uruguayo', 'Ingles', 'Español'];

const libros = db.libros.find().toArray();
for (let index = 0; index < libros.length; index++) {
    const element = libros[index];
    let nueva_struct = [];
    for (let i = 0; i < 2; i++) {
        let nuevo = {
            nombre: autores[Math.floor(Math.random() * autores.length)],
            nacionalidad: nacionalidad[Math.floor(Math.random() * nacionalidad.length)]
        };
        const tiene_autor = nueva_struct.filter(autor => {
            return autor.nombre == nuevo.nombre
        }).length;
        if (tiene_autor == 0) {
            nueva_struct.push(nuevo);
        }
    }
    db.libros.updateOne({ _id: element._id }, { $set: { autores: nueva_struct } });
}
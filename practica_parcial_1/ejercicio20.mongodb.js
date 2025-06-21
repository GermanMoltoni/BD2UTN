// Almacenar los comentarios de los libros por parte de los usuarios. 
// Registrar usuario, fecha, comentario y un nro de 1 a 5 para indicar qué calificación le asigna.
// Insertar entre 3 y 10 comentarios por libro, de manera aleatoria.
use("biblioteca");

function textoAleatorio() {
    var texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    opciones = texto.split(",");
    posicionAleatoria = Math.floor(Math.random() * opciones.length);
    return opciones[posicionAleatoria];
}



const usuarios = db.usuarios.find().toArray();
const libros = db.libros.find().toArray();
for (let index = 0; index < (Math.floor(Math.random() * 10) + 3); index++) {
    console.log(index)
    const random_book = db.libros.aggregate([{ $sample: { size: 1 } }]).next();
    const random_user = db.usuarios.aggregate([{ $sample: { size: 1 } }]).next();
    const comentario = {
        user_id: random_user._id,
        fecha: new Date(),
        comentario: textoAleatorio(),
        calificacion: Math.floor(Math.random() * 10)
    }
    console.log(comentario)

    db.libros.updateOne({ _id: random_book._id }, { $push: { comentarios: comentario } })

}

import { MongoClient } from 'mongodb';
/**
 * ABM de usuarios
 * ABM de libros
 * Préstamos y devoluciones de libros
 * Nota: Los libros pueden tener mas de un género y pueden existir varios ejemplares por cada uno
 */
const tipo_movimiento = ['I', 'E'];
const uri = 'mongodb://localhost:27017'; // URL de conexión a tu base de datos
const dbName = 'biblioteca'; // Nombre de tu base de datos

function agregaCantidadRandomALibros(libros) {
    libros.forEach(libro => {
        libro.cantidad = Math.floor(Math.random() * 100);
    });
    return libros;
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);

const book_collection = db.collection('libros');
await book_collection.drop()

const libros = [
    { '_id': 1, 'nombre': 'El fantasma de canterville', 'autor': 'Oscar Wilde', 'generos': ['comedia', 'aventura'], 'anio_publicacion': 1887 },
    { '_id': 2, 'nombre': 'El principito', 'autor': 'Antoine de Saint-Exupéry', 'generos': ['aventura', 'fantasia'], 'anio_publicacion': 1943 },
    { '_id': 3, 'nombre': 'Cien años de soledad', 'autor': 'Gabriel García Márquez', 'generos': ['realismo mágico'], 'anio_publicacion': 1967 },
    { '_id': 4, 'nombre': 'Crónica de una muerte anunciada', 'autor': 'Gabriel García Márquez', 'generos': ['realismo mágico'], 'anio_publicacion': 1981 },
    { '_id': 5, 'nombre': 'Don Quijote de la Mancha', 'autor': 'Miguel de Cervantes', 'generos': ['aventura', 'comedia'], 'anio_publicacion': 1605 },
    { '_id': 6, 'nombre': 'Harry Potter y la piedra filosofal', 'autor': 'J. K. Rowling', 'generos': ['fantasia', 'aventura'], 'anio_publicacion': 1997 },
    { '_id': 7, 'nombre': 'Harry Potter y la cámara secreta', 'autor': 'J. K. Rowling', 'generos': ['fantasia', 'aventura'], 'anio_publicacion': 1998 },
    { '_id': 8, 'nombre': 'Harry Potter y el prisionero de Azkaban', 'autor': 'J. K. Rowling', 'generos': ['fantasia', 'aventura'], 'anio_publicacion': 1999 },
    { '_id': 9, 'nombre': 'Crepusculo', 'autor': 'Stephenie Meyer', 'generos': ['fantasia', 'romance'], 'anio_publicacion': 2005 },
];
await book_collection.insertMany(agregaCantidadRandomALibros(libros));
const user_collection = db.collection('usuarios');
await user_collection.drop()
await user_collection.insertMany([
    { 'nombre': 'Matias', 'apellido': 'Garcia', 'legajo': 123 },
    { 'nombre': 'Aldana', 'apellido': 'Perez', 'legajo': 332 },
    { 'nombre': 'Diego', 'apellido': 'Alvarez', 'legajo': 212 },
    { 'nombre': 'Martin', 'apellido': 'Gonzalez', 'legajo': 33 },
]);



async function insertaMovimientos(tipo_movimiento, book_collection, user_collection, movimientos_collection) {
    let movimientos_generados = [];
    for (let i = 0; i < 100; i++) {
        const random_book = await book_collection.aggregate([{ $sample: { size: 1 } }]).next();
        const random_user = await user_collection.aggregate([{ $sample: { size: 1 } }]).next();
        //const book_to_share = await book_collection.findOne({'_id':random_book._id});

        const movimiento = {
            user_id: random_user._id,
            book_id: random_book._id,
            tipo_movimiento: tipo_movimiento,
            fecha: new Date()
        }
        await movimientos_collection.insertOne(movimiento);
    }
}

const movimientos_collection = db.collection('movimientos');
movimientos_collection.drop();
await insertaMovimientos('I', book_collection, user_collection, movimientos_collection);
await insertaMovimientos('E', book_collection, user_collection, movimientos_collection);

const result = await movimientos_collection.find({}).toArray();
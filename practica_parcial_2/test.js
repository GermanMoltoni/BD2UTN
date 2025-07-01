//import { MongoClient } from 'mongodb';
/**
 * Modelizar
 * Libros
 * Usuarios
 * Revisiones de libros
 * Likes
 * Visualizaciones de libros
 */

const uri = 'mongodb://root@localhost:27017';
const dbName = 'biblioteca';


/*const client = new MongoClient(uri);
await client.connect();
const db = client.db(dbName);*/

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
    { '_id': 1, 'nombre': 'Matias', 'apellido': 'Garcia', 'username': 'mgarcia' },
    { '_id': 2, 'nombre': 'Aldana', 'apellido': 'Perez', 'username': 'aperez' },
    { '_id': 3, 'nombre': 'Diego', 'apellido': 'Alvarez', 'username': 'dalvarez' },
    { '_id': 4, 'nombre': 'Martin', 'apellido': 'Gonzalez', 'username': 'mgonzalez' }
]);

const book_revision_collection = db.collection('revison');
await book_revision_collection.drop()
await book_revision_collection.insertMany([

]);
const book_likes_collection = db.collection('likes');
await book_likes_collection.drop()
generateRandomTransaction(book_collection, user_collection, book_likes_collection);

const book_views_collection = db.collection('visualizaciones');
await book_views_collection.drop()
generateRandomTransaction(book_collection, user_collection, book_views_collection);



function agregaCantidadRandomALibros(libros) {
    libros.forEach(libro => {
        libro.cantidad = Math.floor(Math.random() * 100);
    });
    return libros;
}

async function generateRandomTransaction(book_collection, user_collection, destination_collection) {
    for (let i = 0; i < (Math.floor(Math.random() * 5) + 1); i++) {
        const random_book = await book_collection.aggregate([{ $sample: { size: 1 } }]).next();
        const random_user = await user_collection.aggregate([{ $sample: { size: 1 } }]).next();
        const transaction = {
            user_id: random_user._id,
            book_id: random_book._id,
            date: getRandomDateWithinPastYears(Math.floor(Math.random() * 5) + 1)
        }
        await destination_collection.insertOne(transaction);
    }
}

function getRandomDateWithinPastYears(yearsAgo) {
    const now = new Date();
    const past = new Date();
    past.setFullYear(now.getFullYear() - yearsAgo);
    const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
    return new Date(randomTime);
}

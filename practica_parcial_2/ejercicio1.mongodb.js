/**
 * Modelizar
 * Libros
 * Usuarios
 * Revisiones de libros
 * Likes
 * Visualizaciones de libros
 */

const dbase = db.getSiblingDB('biblioteca')

const booksData = [
    { '_id': 1, 'title': 'El fantasma de canterville', 'authors': [{'name':'Oscar Wilde'},{'name':'autor 1'}], 'genres': ['comedy', 'adventure'], 'publication_year': 1887 },
    { '_id': 2, 'title': 'El principito', 'authors':[{'name': 'Antoine de Saint-Exupéry'},{'name':'autor 3'}], 'genres': ['adventure', 'fantasy'], 'publication_year': 1943 },
    { '_id': 3, 'title': 'Cien años de soledad', 'authors':[{'name': 'Gabriel García Márquez'},{'name':'autor 5'}], 'genres': ['magic realism'], 'publication_year': 1967 },
    { '_id': 4, 'title': 'Crónica de una muerte anunciada', 'authors':[{'name': 'Gabriel García Márquez'},{'name':'autor 5'}], 'genres': ['magic realism'], 'publication_year': 1981 },
    { '_id': 5, 'title': 'Don Quijote de la Mancha', 'authors':[{'name': 'Miguel de Cervantes'},{'name':'autor 5'}], 'genres': ['adventure', 'comedy'], 'publication_year': 1605 },
    { '_id': 6, 'title': 'Harry Potter y la piedra filosofal', 'authors':[{'name': 'J. K. Rowling'},{'name':'autor 6'}], 'genres': ['fantasy', 'adventure'], 'publication_year': 1997 },
    { '_id': 7, 'title': 'Harry Potter y la cámara secreta', 'authors':[{'name': 'J. K. Rowling'},{'name':'autor 7'}], 'genres': ['fantasy', 'adventure'], 'publication_year': 1998 },
    { '_id': 8, 'title': 'Harry Potter y el prisionero de Azkaban', 'authors':[{'name': 'J. K. Rowling'},{'name':'autor 8'}], 'genres': ['fantasy', 'adventure'], 'publication_year': 1999 },
    { '_id': 9, 'title': 'Crepusculo', 'authors':[{'name': 'Stephenie Meyer'},{'name':'autor 8'}], 'genres': ['fantasy', 'romance'], 'publication_year': 2005 },
];

const booksCollection = dbase.books;
booksCollection.drop();

booksCollection.insertMany(addRandomQuantityToBooks(booksData));
const usersCollection = dbase.users;
usersCollection.drop();
usersCollection.insertMany([
    { '_id': 1, 'firstName': 'Matias', 'lastName': 'Garcia', 'username': 'mgarcia' },
    { '_id': 2, 'firstName': 'Aldana', 'lastName': 'Perez', 'username': 'aperez' },
    { '_id': 3, 'firstName': 'Diego', 'lastName': 'Alvarez', 'username': 'dalvarez' },
    { '_id': 4, 'firstName': 'Martin', 'lastName': 'Gonzalez', 'username': 'mgonzalez' }
]);
const reviewsCollection = dbase.reviews;
reviewsCollection.drop();
const reviewTransactions = generateRandomTransactions(booksCollection, usersCollection);
reviewsCollection.insertMany(addReviewToTransactions(reviewTransactions));

const likesCollection = dbase.likes;
likesCollection.drop();
likesCollection.insertMany(generateRandomTransactions(booksCollection, usersCollection));

const viewsCollection = dbase.views;
viewsCollection.drop();
viewsCollection.insertMany(generateRandomTransactions(booksCollection, usersCollection));



function addRandomQuantityToBooks(books) {
    books.forEach(book => {
        book.quantity = Math.floor(Math.random() * 100);
    });
    return books;
}
function addReviewToTransactions(transactions) {
    transactions.forEach(transaction => {
        transaction.review = `Review for book ${transaction.book_id} by user ${transaction.user_id}`;
    });
    return transactions;
}
function generateRandomTransactions(booksCollection, usersCollection) {
    let randomTransactions = [];
    for (let i = 0; i < (Math.floor(Math.random() * 300) + 1); i++) {
        const randomBook = booksCollection.aggregate([{ $sample: { size: 1 } }]).next();
        const randomUser = usersCollection.aggregate([{ $sample: { size: 1 } }]).next();
        const transaction = {
            user_id: randomUser._id,
            book_id: randomBook._id,
            fecha: getRandomDateWithinPastYears(Math.floor(Math.random() * 10) + 1)
        }
        randomTransactions.push(transaction);
    }
    return randomTransactions;
}

function getRandomDateWithinPastYears(yearsAgo) {
    const now = new Date();
    const past = new Date();
    past.setFullYear(now.getFullYear() - yearsAgo);
    const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
    return new Date(randomTime);
}


/**
//Máximo tamaño permitido en colecciones: 16MB
//Con docType field
const libros_unidos = [
    {
        book_id: 1,
        docType: 'libro',
        nombre: 'El fantasma de canterville',
        autor: 'Oscar Wilde',
        reviews: [
            { user_id: 1, review: 'Un libro muy divertido y entretenido.' },
            { user_id: 2, review: 'Me encantó la mezcla de comedia y aventura.' }
        ]

    },
    { user_id: 1, docType: 'usuario', nombre: 'Juan', username: 'jgarcia' }
];
//Con overloaded fields
//Ventaja rapidez, desventaja espacio.
const libros_unidos_overload = [
    {
        book_id: 1,
        docType: 'libro',
        nombre: 'El fantasma de canterville',
        autor: 'Oscar Wilde',
        reviews: [
            { username: 'jgarcia', review: 'Un libro muy divertido y entretenido.' },
            { username: 'mperez', review: 'Me encantó la mezcla de comedia y aventura.' }
        ]
    },
    { user_id: 1, docType: 'usuario', nombre: 'Juan', username: 'jgarcia' }
];
*/
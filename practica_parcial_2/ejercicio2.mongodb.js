// Actualizar el array "reviews" de la colección "libros" para reflejar las ultimas 3 revisiones. 
// Creamos un subset de reviews en libros.
// Nos ayuda a tener las últimas 3 reviews para no cargar todas las reviews de un libro.

const dbase = db.getSiblingDB('biblioteca')
let cursor = dbase.reviews.aggregate([
    { $sort: { fecha: -1 } },
    {
        $group: {
            _id: "$book_id",
            reviews: { $push: "$$ROOT" }
        }
    },
    {
        $project: {
            reviews: { $slice: ["$reviews", 3] }
        }
    },
    {
        $project: {
            reviews: {
                $slice: [
                    { $sortArray: { input: "$reviews", sortBy: { fecha: 1 } } },
                    3
                ]
            }
        }
    }
]);
cursor.forEach(element => {
    dbase.books.updateOne({ _id: element._id },
        { $set: { reviews: element.reviews } }
    );
});

// Otra solución
const books = dbase.books.find();
const book_reviews = {};
books.forEach(book => {
    const reviews = dbase.reviews.find({ book_id: book._id })
        .sort({ fecha: -1 })
        .limit(3)
        .toArray();
    book_reviews[book._id] = reviews;

});

Object.keys(book_reviews).forEach((value, index) => {
    dbase.books.updateOne({ _id: index },
        { $set: { reviews: book_reviews[index] } }
    );
});
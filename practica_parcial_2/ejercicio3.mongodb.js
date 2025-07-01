// Actualizar el array "reviews" de la colección "libros" para reflejar las ultimas 3 revisiones.
const dbase = db.getSiblingDB('biblioteca')
const newReview = {
    book_id: 1,
    user_id: 1,
    review: "Excelente libro, muy entretenido.",
    fecha: new Date("2025-10-12")
};
dbase.reviews.insertOne(newReview);
dbase.books.updateOne(
    { _id: newReview.book_id },
    { $pop: { reviews: -1 } }
);
dbase.books.updateOne(
    { _id: newReview.book_id },
    { $push: { reviews: newReview } }
);
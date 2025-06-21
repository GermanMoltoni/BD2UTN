/*
* Listar los libros con autores argentinos cuyo año de publicación sea mayor a 2000
*/
use("biblioteca");
db.libros.aggregate([
    { $match: { 'autores.nacionalidad': 'Uruguayo', 'anio_publicacion': { $gt: 2000 } } }
])
/**
db.libros.aggregate([
    {$unwind:'$autores'},
    {$match:{$and:[{'autores.nacionalidad':'Argentino'},{anio_publicacion:{$gt:2000}}]}}
]);
 */
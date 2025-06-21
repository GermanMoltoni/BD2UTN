// Listar la cantidad de comentarios recibido de cada libro.
use("biblioteca");
/*
db.libros.aggregate([
    {$unwind:'$comentarios'},
    {$group:{_id:'$_id',cantidad_comentarios:{$sum:1}}},
    {
        $project:{book_id:'$_id',cantidad_comentarios:1,_id:0}
    }
])*/
db.libros.aggregate([
    { $unwind: '$comentarios' },
    { $sortByCount: '$_id' },
    { $project: { 'book_id': '$_id', 'cantidad': '$count', _id: 0 } }
]);

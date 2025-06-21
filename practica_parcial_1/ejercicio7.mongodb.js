// Cantidad de documentos por género
use("biblioteca");
db.libros.aggregate([
    { $unwind: '$generos' },
    { $sortByCount: '$generos' },
    { $project: { 'genero': '$_id', 'cantidad': '$count', _id: 0 } },
])
db.libros.aggregate([
    { $unwind: '$generos' },
    { $group: { '_id': '$generos', cantidad: { $sum: 1 } } },
    { $project: { 'genero': '$_id', '_id': 0, 'cantidad': 1 } }
])

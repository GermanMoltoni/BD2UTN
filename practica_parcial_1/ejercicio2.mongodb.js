// Nombres de los libros del género acción ordenado fecha de publicación
use("biblioteca");
db.libros.aggregate([
    { $match: { 'generos': 'Acción' } },
    { $project: { 'titulo': 1, 'fecha_publicacion': 1, _id: 0 } },
    { $sort: { 'fecha_publicacion': 1 } }
])
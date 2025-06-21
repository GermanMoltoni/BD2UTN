// Listar el promedio de calificaciones por libro.
use("biblioteca");

db.libros.aggregate([
    { $unwind: '$comentarios' },
    { $group: { _id: '$_id', promedio_calificacion: { $avg: '$comentarios.calificacion' } } },
    {
        $project: { book_id: '$_id', promedio_calificacion: 1, _id: 0 }
    }
])
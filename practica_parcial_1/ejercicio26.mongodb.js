// Listar los libros con una fecha de edición en los últimos 60 días
use("biblioteca");
db.libros.find({ $expr: { $gte: ['$fecha_edicion', new ISODate('2025-04-01')] } })
db.libros.aggregate([
    {
        $match: {
            $expr: {
                $gte: [
                    '$fecha_edicion',
                    { $dateSubtract: { startDate: '$$NOW', unit: 'day', amount: 60 } }
                ]
            }
        }
    }]);
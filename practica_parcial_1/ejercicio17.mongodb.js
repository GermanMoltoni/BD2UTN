// Mostrar los primeros 3 libros con mas prestamos en el último mes
use("biblioteca");
db.movimientos.updateMany({ 'tipo_movimiento': 'E' }, { $set: { 'fecha': new ISODate('2025-05-18') } })

db.movimientos.aggregate([
    {
        $group: {
            _id: '$book_id',
            alquiladosUltimoMes: {
                $sum: {
                    $cond: [
                        {
                            $and: [
                                { $eq: ['$tipo_movimiento', 'E'] },
                                { $gte: ['$fecha', { $dateSubtract: { startDate: '$$NOW', unit: 'day', amount: 30 } }] }
                            ]
                        }, 1, 0
                    ]
                }
            }


        }
    },
    {
        $project: {
            book_id: '$_id',
            alquilados_ultimo_mes: '$alquiladosUltimoMes',
            _id: 0
        }
    },
    { $match: { alquilados_ultimo_mes: { $gt: 0 } } },
    { $sort: { alquilados_ultimo_mes: -1 } },
    { $limit: 3 }
])
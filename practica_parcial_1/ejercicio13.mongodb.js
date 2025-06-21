/**
 * Crear una colección llamada “stock_actual” con la cantidad de ejemplares disponibles por libro y 
 * la cantidad de ejemplares alquilados en el último mes
 */

use("biblioteca");
//db.movimientos.updateMany({'tipo_movimiento':'E'},{$set:{'fecha' :new ISODate('2025-04-18')}})
//db.movimientos.updateMany({'tipo_movimiento':'I'},{$set:{'fecha' :new ISODate('2025-04-23')}})
db.movimientos.aggregate([
    {
        $group: {
            _id: '$book_id',
            stock: { $sum: { $cond: [{ $eq: ['$tipo_movimiento', 'I'] }, 1, 0] } },
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
            book_id: '$_id', total: '$stock',
            alquilados_ultimo_mes: '$alquiladosUltimoMes',
            stock_actual: { $subtract: ['$stock', '$alquiladosUltimoMes'] }, _id: 0
        }
    },
    { $sort: { book_id: 1 } }
])
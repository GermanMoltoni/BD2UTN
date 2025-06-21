// Listar los libros que tengan stock negativo
use("biblioteca");
db.movimientos.aggregate([
    {
        $group: {
            _id: '$book_id',
            stock: {
                $sum: {
                    $cond: [
                        { $eq: ['$tipo_movimiento', 'E'] }, -1, 1
                    ]
                }

            }
        }
    },
    { $project: { 'book_id': '$_id', 'stock': 1, _id: 0 } },
    { $match: { 'stock': { $lt: 0 } } }
])

/**
 db.movimientos.aggregate(
    [
          
        {$group:{
            _id:'$book_id',
            totalDevueltos:{$sum:{$cond:[{$eq:['$tipo_movimiento','I']},1,0]}},
              totalAlquilados:{$sum:{$cond:[{$eq:['$tipo_movimiento','E']},1,0]}}
        }
    },
 
        {$project: {stock:{$subtract:['$totalDevueltos','$totalAlquilados']}}}
        
    ]
)
 */
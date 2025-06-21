//Calcular el ingreso por alquileres discriminado por año y mes
use("biblioteca");
/**
 * 
 * const movimientos = db.movimientos.find({tipo_movimiento:'I'});
movimientos.forEach(element => {
    const precios = db.precios_alquiler.find(
        {'book_id':element.book_id,'fecha':{$lte:element.fecha}}
      
    ).sort({fecha:-1}).limit(1).toArray();
     db.movimientos.updateOne({_id:element._id},{$set:{precio:precios[0].valor}});
});
 */
db.movimientos.updateMany(
    { 'tipo_movimiento': 'E' },
    [
        {
            $set: { precio: { $multiply: [{ $rand: {} }, 10000] } }
        }
    ]
)

db.movimientos.aggregate(
    [
        {
            $group: {
                '_id': { year: { $year: '$fecha' }, month: { $month: '$fecha' } },
                monto_alquiler: { $sum: '$precio' }
            }
        },
        {
            $project: { year: '$_id.year', month: '$_id.month', _id: 0, monto_alquiler: 1 }
        }
    ]
)
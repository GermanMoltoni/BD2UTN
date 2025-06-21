// Agregar los ejemplares que falten para que el stock no sea negativo

use("biblioteca");
const stock_negativo = db.movimientos.aggregate([
    {
        $group: {
            _id: { book_id: '$book_id', user_id: '$user_id' },
            stock: {
                $sum: {
                    $cond: [
                        { $eq: ['$tipo_movimiento', 'E'] }, -1, 1
                    ]
                }
            }
        }
    },
    //{$project:{ 'stock':1,_id:1}},
    { $match: { 'stock': { $lt: 0 } } }
]).toArray();

let stock_faltante = [];
stock_negativo.forEach(element => {
    for (let index = 0; index < Math.abs(element.stock); index++) {
        stock_faltante.push({
            user_id: element._id.user_id,
            book_id: element._id.book_id,
            tipo_movimiento: 'I',
            fecha: new Date()
        });
    }
});
db.movimientos.insertMany(stock_faltante)
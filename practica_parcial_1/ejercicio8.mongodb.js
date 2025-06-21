// Puntaje promedio recibido por libro
use("biblioteca");
/**
 * Agregar puntaje recibido por libro
 */

db.movimientos.updateMany(
   {'tipo_movimiento':'I'},
   [
      { $set:
         { puntaje:
            { $floor:
               { $multiply: [ { $rand: {} }, 10 ] }
            }
         }
      }
    ]
)
db.movimientos.aggregate([
    {$match:{'tipo_movimiento':'I'}},
    {$group:{'_id':'$book_id',puntaje_promedio:{$avg:'$puntaje'}}},
    {$project:{'book_id':'$_id','_id':0,'puntaje_promedio':1}}
]);
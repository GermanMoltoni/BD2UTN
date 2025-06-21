// Unir la colección de usuarios con la de sus alquileres
use("biblioteca");
db.usuarios.aggregate([
  {
    $lookup: {
      from: 'movimientos',
      localField: '_id',
      foreignField: 'user_id',
      as: 'alquileres'
    }
  }
])
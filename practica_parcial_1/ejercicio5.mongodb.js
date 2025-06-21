// Actualizar el género del _id 8 a “Acción” y “Drama”
use("biblioteca");
db.libros.updateOne({_id:8},{$set:{generos:['Acción','Drama']}})
//db.libros.updateOne({_id:8},{$push:{generos:{$each:['Acción','Drama']}}})
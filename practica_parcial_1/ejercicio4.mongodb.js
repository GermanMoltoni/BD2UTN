// Eliminar los _id de libros entre 2 y 3
use("biblioteca");
db.libros.delete({_id:3})
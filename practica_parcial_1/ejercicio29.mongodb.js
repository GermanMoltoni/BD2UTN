// • Buscar los libros cuyo nombre de autor contenga a “Ralph”
use("biblioteca");

db.libros.find({ "autor": /Rowling/ })
db.libros.find({ "autor": { $regex: /de/ } })
db.libros.find({ "autor": { $regex: /de/ }, comentarios: { $exists: 1 } })// Filtro que existan comments
db.libros.find({ comentarios: { $exists: 1 }, 'comentarios.comentario': /^Lorem/ })// Filtro que existan comments
db.libros.find({ $text: { $search: "una " } })

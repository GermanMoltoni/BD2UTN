// Crear un índice de texto para los campos título, autor y comentarios
use("biblioteca");

db.libros.createIndex({ 'titulo': "text" }, { name: "index_titulo" })
db.libros.createIndex({ 'autor': "text" }, { name: "index_autor" })
db.libros.createIndex({ 'comentarios.comentario': "text" }, { name: "index_comentario" })
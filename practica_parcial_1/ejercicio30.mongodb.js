// • Buscar letra u en campos titulo autor y texto
use("biblioteca");

db.libros.find(
    { $or: [{ "titulo": { $regex: /1/ } }, { "autor": { $regex: /é/ } }, { "comentarios.comentario": { $regex: /1/ } }] }
)
// /i case sensitive

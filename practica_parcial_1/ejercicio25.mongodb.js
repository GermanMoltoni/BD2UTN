// Agregar un atributo indicando la última fecha de edición
use("biblioteca");

function generarFechaAleatoria(cantidad_dias) {
  const ahora = new Date();

  const ultimaFecha = new Date(ahora);
  ultimaFecha.setDate(ahora.getDate() - cantidad_dias);

  const minTimestamp = ultimaFecha.getTime();
  const maxTimestamp = ahora.getTime();
  const timestampAleatorio = Math.random() * (maxTimestamp - minTimestamp) + minTimestamp;
  return timestampAleatorio;

}

const libros = db.libros.find();
db.libros.updateMany({}, { $unset: { 'fecha_edicion': '' } })
for (const libro of libros) {
  db.libros.updateOne({ _id: libro._id }, { $set: { fecha_edicion: new ISODate(generarFechaAleatoria(120)) } });
}
const dbase = db.getSiblingDB('biblioteca')
console.log('Con for:');
mostrarDatosConFor(dbase.libros.find().toArray());
console.log('Con foreach:');

mostrarDatosconForEach(dbase.libros.find());

function mostrarDatosconForEach(datos) {
    if (datos && typeof datos === 'object' && typeof datos.hasNext === 'function') {
        while (datos.hasNext()) {
            printjson(datos.next());
        }
    }
}

function mostrarDatosConFor(datos) {
    for (let index = 0; index < datos.length; index++) {
        console.log(JSON.stringify(datos[index]));
    }
}
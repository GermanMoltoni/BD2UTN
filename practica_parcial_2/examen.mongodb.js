    //**Escenario:** Una tienda de abarrotes tiene una colección `productosTienda` (con `_id`, `nombre`, `stock`, `puntoReorden`, `proveedorId`). Necesitas identificar todos los productos cuyo `stock` actual ha caído **por debajo de su `puntoReorden`** Y que no tienen una `ordenReabastecimientoPendiente: true`. Para cada uno, debes generar una nueva orden de reabastecimiento (simulado con un `console.log`) y marcar el producto con `ordenReabastecimientoPendiente: true`.
    //**Respuesta:**
    //1. **Consulta**: Utiliza `find` para obtener los productos cuyo `stock` es menor que el `puntoReorden` y `ordenReabastecimientoPendiente` es `false`.
    //2. **Simulación de orden de reabastecimiento**: Para cada producto encontrado, imprime un mensaje que simule la creación de una orden de reabastecimiento, incluyendo el nombre del producto, su `stock`, `puntoReorden`, y el nombre del proveedor (obtenido de la colección `proveedores`).
    //3. **Actualización**: Marca el producto con `ordenReabastecimientoPendiente: true` utilizando `updateOne`.
    //4. **Resultado**: Imprime un mensaje indicando que se ha generado una orden de reabastecimiento para cada producto que cumple con las condiciones.
let db = db.getSiblingDB('tienda');
db.productosTienda.insertMany([
    {_id:1,nombre:'Producto A', stock:50,puntoReorden:10,proveedorId:100,ordenReabastecimientoPendiente:false},
    {_id:2,nombre:'Producto B', stock:2,puntoReorden:5,proveedorId:101,ordenReabastecimientoPendiente:false},
    {_id:3,nombre:'Producto C', stock:20,puntoReorden:8,proveedorId:102,ordenReabastecimientoPendiente:false},
    {_id:4,nombre:'Producto D', stock:20,puntoReorden:35,proveedorId:99,ordenReabastecimientoPendiente:true},
]);
const productosTienda = db.productosTienda.find();
productosTienda.forEach(producto => {
    if (producto.stock < producto.puntoReorden && !producto.ordenReabastecimientoPendiente) {
        console.log('Se ha generado una nueva orden para el Producto: '+producto.nombre);
        db.productosTienda.updateOne(
                {_id: producto._id},
                {$set: {ordenReabastecimientoPendiente: true}}
            );
        }
});
/**
 * **Escenario:** Una plataforma IoT recopila datos de `sensores` (con `dispositivoId`, `lectura`, `timestamp`). 
 * Necesitas generar un informe que muestre la cantidad total de lecturas y la lectura promedio para cada `fabricante` de los dispositivos. 
 * La información del `fabricante` se encuentra en la colección `dispositivos` (con `_id`, `modelo`, `fabricante`). 
 * El informe debe considerar solo las lecturas de los **últimos 30 días**.
 */

db = db.getSiblingDB('plataformaIot');
db.sensores.insertMany([
    {dispositivoId:1,lectura:23.5,timestamp:new Date("2025-05-12T10:00:00Z")},
    {dispositivoId:2,lectura:19.8,timestamp:new Date("2025-05-15T10:05:00Z")},
    {dispositivoId:3,lectura:7.3,timestamp:new Date("2025-05-16T10:20:00Z")},
    {dispositivoId:1 ,lectura:22.1,timestamp:new Date("2025-06-12T10:10:00Z")},
    {dispositivoId:2,lectura:25.0,timestamp:new Date("2025-06-13T10:15:00Z")},
    {dispositivoId:3,lectura:18.3,timestamp:new Date("2025-06-14T10:20:00Z")},
    {dispositivoId:3,lectura:18.3,timestamp:new Date("2025-06-14T11:20:00Z")},
    {dispositivoId:3,lectura:18.3,timestamp:new Date("2025-06-14T12:20:00Z")},
    {dispositivoId:1 ,lectura:20.0,timestamp:new Date("2025-06-14T10:25:00Z")},
    {dispositivoId:4 ,lectura:20.0,timestamp:new Date("2025-06-15T10:25:00Z")}
]);
db.dispositivos.insertMany([
    { _id: 1,  modelo:'Modelo 1',fabricante:'Fabricante A' },
    { _id: 2,  modelo:'Modelo 2',fabricante:'Fabricante B' },
    { _id: 3,  modelo:'Modelo 3',fabricante:'Fabricante C' },
    { _id: 4,  modelo:'Modelo 4',fabricante:'Fabricante A' }
]);
const lecturas = db.sensores.aggregate([
    { 
        $match: {
            timestamp: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
        }
    },
    { 
        $lookup: {
            from: 'dispositivos',
            localField: 'dispositivoId',
            foreignField: '_id',
            as: 'dispositivo'
        }
    },
    { $unwind: '$dispositivo' },
    { $group: {
        _id: '$dispositivo.fabricante',
        totalLecturas: { $sum: 1 },
        promedioLectura: { $avg: '$lectura' }
    }},
    { $project: {
        _id: 0,
        fabricante: '$_id',
        totalLecturas: 1,
        promedioLectura:  '$promedioLectura'  
    }}
]);
lecturas.forEach(result => {
    print(`Fabricante: ${result.fabricante}, Total Lecturas: ${result.totalLecturas}, Promedio Lectura: ${result.promedioLectura}`);
});
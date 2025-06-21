// show dbs, show databases
const databases = db.adminCommand('listDatabases');
databases.databases.forEach(element => {
    console.log(element.name);
});
// show users
console.log(db.getUsers());
//show roles
console.log(db.getRoles({showBuiltinRoles:true}));
//show log
//console.log(db.adminCommand({'getLog':''}))
//show logs
console.log(db.adminCommand({'getLog':'*'}))
// use dbname
const dbase = db.getSiblingDB('biblioteca')
//show collections
console.log(dbase.getCollectionNames());
//it
cursor = dbase.libros.find()
console.log(cursor)
while(cursor.hasNext()) {
    printjson(cursor.next());
}


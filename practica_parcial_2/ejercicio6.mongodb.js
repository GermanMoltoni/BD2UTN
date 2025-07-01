

/**
 * 
 * Relación muchos a muchos entre libros y autores. Versión embedded.
 * Si los datos de los autores no cambian, se pueden guardar dentro de los libros.
 * Si los datos de los autores cambian, se recomienda guardar los ids de los autores en los libros.
 * libros = [
 *     { '_id': 1, 'title': 'El fantasma de canterville', 'authors': [{'name':'Oscar Wilde'},{'name':'autor 1'}], 'genres': ['comedy', 'adventure'], 'publication_year': 1887 },  
 * ]
 * 
 * Si solo se encuentran los ids de los libros en los autores o los autores en los libros, es una referencia unidireccional.
 * Si se encuentran los ids de los libros en los autores y los autores en los libros, es una referencia bidireccional.
 * autores = [
 *     { '_id': 1, 'name': 'Oscar Wilde' ,libros:[1,2] },
 *     { '_id': 2, 'name': 'autor 1' },
 * ]
 * 
 * 
 * 
 */
const dbase = db.getSiblingDB('biblioteca')
console.log(dbase.books.aggregate([
    { $unwind: "$authors" },
    {
        $group: {
            _id: "$authors",
            bookCount: { $sum: 1 }
        }
    }
]));
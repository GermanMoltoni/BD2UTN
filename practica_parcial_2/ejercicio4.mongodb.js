// Rediseñar visualizaciones de los libros teniendo en cuenta que se utilizarán reportes mensuales.
//Es un bucket ya que agrupa registros solo a fines informativos, no es una colección de documentos que se consulten directamente.
const dbase = db.getSiblingDB('biblioteca')

const books = dbase.books.find();
const book_visualizations = {};
books.forEach(book => {
    const visualizations = dbase.views.aggregate(
        [
            { $match: { book_id: book._id } },
            {
                $group: {
                    '_id': { year: { $year: '$fecha' }, month: { $month: '$fecha' } },
                    viewCount: { $sum: 1 }
                }
            },
            { $project: { _id: 0, year: '$_id.year', month: '$_id.month', viewCount: 1 } },

        ]
    ).toArray();
    if (visualizations.length > 0) {
        book_visualizations[book._id] = visualizations;
    }
});

Object.keys(book_visualizations).forEach((value, index) => {
    dbase.books.updateOne({ _id: index },
        { $set: { visualizations: book_visualizations[index] } }
    );
}
);

// Otra solución
const visualizationCollection = dbase.views.aggregate(
    [
        {
            $group: {
                '_id': { book_id: '$book_id', year: { $year: '$fecha' }, month: { $month: '$fecha' } },
                viewCount: { $sum: 1 }
            }
        },
        { $project: { _id: 0, year: '$_id.year', month: '$_id.month', book_id: '$_id.book_id', viewCount: 1 } },
    ]
).toArray();

visualizationCollection.forEach(view => {
    dbase.books.updateOne({ _id: view.book_id },
        { $push: { visualizations: view } }
    );
});
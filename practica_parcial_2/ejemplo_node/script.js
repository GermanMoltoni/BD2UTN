function traerLibros() {
    fetch('http://127.0.0.1:3000/libros', { methdod: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            const listaLibros = document.getElementById('tablaLibros');
            data.forEach(libro => {
                const row = document.createElement('tr');
                Object.keys(libro).forEach(key => {
                    const column = document.createElement('td');
                    column.textContent = libro[key];
                    row.appendChild(column);
                }
                );
                listaLibros.appendChild(row);
            });
        })
        .catch(error => console.error('Error al traer los libros:', error));
}
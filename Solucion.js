const readlineSync = require('readline-sync');
const fs = require('fs');

let biblioteca = [];

function guardarBiblioteca() {
    fs.writeFileSync('biblioteca.json', JSON.stringify(biblioteca, null, 2));
}

function desplegarMenu() {
    console.log(`
    --- Menú de Opciones ---
    1. Ingresar nuevo libro
    2. Ver todos los libros
    3. Buscar por título
    4. Quitar libro
    5. Estadísticas de la colección
    6. Ordenar libros
    7. Modificar libro
    8. Finalizar
    `);

    const seleccion = readlineSync.question('Seleccione una opción: ');

    switch (seleccion) {
        case '1':
            ingresarLibro();
            break;
        case '2':
            listarLibros();
            break;
        case '3':
            buscarPorTitulo();
            break;
        case '4':
            quitarLibro();
            break;
        case '5':
            mostrarEstadisticas();
            break;
        case '6':
            ordenarColeccion();
            break;
        case '7':
            modificarLibro();
            break;
        case '8':
            console.log('¡Hasta luego!');
            break;
        default:
            console.log('Opción inválida. Intente de nuevo.');
            desplegarMenu();
            break;
    }
}

// 1. Ingresar libro
function ingresarLibro() {
    const nombre = readlineSync.question('Título del libro: ');
    const escritor = readlineSync.question('Autor del libro: ');
    let costo = parseFloat(readlineSync.question('Precio del libro: '));
    if (costo <= 0) {
        console.log('Precio inválido, por favor intente nuevamente.');
        return ingresarLibro();
    }
    const publicacion = parseInt(readlineSync.question('Año de publicación: '));

    biblioteca.push({ nombre, escritor, costo, publicacion });
    console.log('📘 Libro añadido con éxito.');
    guardarBiblioteca();
    desplegarMenu();
}

// 2. Mostrar catálogo
function listarLibros() {
    if (biblioteca.length === 0) {
        console.log('No hay libros registrados.');
    } else {
        biblioteca.forEach((libro, indice) => {
            console.log(`${indice + 1}. Título: ${libro.nombre}, Autor: ${libro.escritor}, Precio: $${libro.costo}, Año: ${libro.publicacion}`);
        });
    }
    desplegarMenu();
}

// 3. Buscar libro por título
function buscarPorTitulo() {
    const busqueda = readlineSync.question('Ingrese el título a buscar: ');
    const resultado = biblioteca.find(libro => libro.nombre.toLowerCase() === busqueda.toLowerCase());
    if (resultado) {
        console.log(`Título: ${resultado.nombre}, Autor: ${resultado.escritor}, Precio: $${resultado.costo}, Año: ${resultado.publicacion}`);
    } else {
        console.log('No se encontró ningún libro con ese título.');
    }
    desplegarMenu();
}

// 4. Eliminar libro
function quitarLibro() {
    const tituloEliminar = readlineSync.question('Título del libro a eliminar: ');
    const posicion = biblioteca.findIndex(libro => libro.nombre.toLowerCase() === tituloEliminar.toLowerCase());
    if (posicion !== -1) {
        biblioteca.splice(posicion, 1);
        console.log('Libro eliminado exitosamente.');
    } else {
        console.log('No se encontró el libro.');
    }
    desplegarMenu();
}

// 5. Ver estadísticas
function mostrarEstadisticas() {
    if (biblioteca.length === 0) {
        console.log('No hay libros para mostrar estadísticas.');
    } else {
        const cantidad = biblioteca.length;
        const promedio = biblioteca.reduce((acc, libro) => acc + libro.costo, 0) / cantidad;
        const masViejo = biblioteca.reduce((a, b) => a.publicacion < b.publicacion ? a : b);
        const masCostoso = biblioteca.reduce((a, b) => a.costo > b.costo ? a : b);

        console.log(`Cantidad total: ${cantidad}`);
        console.log(`Precio promedio: $${promedio.toFixed(2)}`);
        console.log(`Libro más antiguo: ${masViejo.nombre} (${masViejo.publicacion})`);
        console.log(`Libro más caro: ${masCostoso.nombre} ($${masCostoso.costo})`);
    }
    desplegarMenu();
}

// 6. Ordenar libros
function ordenarColeccion() {
    const criterio = readlineSync.question('¿Ordenar por? 1. Precio 2. Año: ');

    if (criterio === '1') {
        const modo = readlineSync.question('1. Menor a mayor 2. Mayor a menor: ');
        biblioteca.sort((a, b) => modo === '1' ? a.costo - b.costo : b.costo - a.costo);
    } else if (criterio === '2') {
        const modo = readlineSync.question('1. Antiguos primero 2. Nuevos primero: ');
        biblioteca.sort((a, b) => modo === '1' ? a.publicacion - b.publicacion : b.publicacion - a.publicacion);
    } else {
        console.log('Opción no válida.');
    }

    guardarBiblioteca();
    listarLibros();
}

// 7. Editar libro
function modificarLibro() {
    const tituloModificar = readlineSync.question('Título del libro a modificar: ');
    const encontrado = biblioteca.find(libro => libro.nombre.toLowerCase() === tituloModificar.toLowerCase());

    if (encontrado) {
        const nuevoNombre = readlineSync.question('Nuevo título: ');
        const nuevoAutor = readlineSync.question('Nuevo autor: ');
        const nuevoPrecio = parseFloat(readlineSync.question('Nuevo precio: '));
        const nuevoAnio = parseInt(readlineSync.question('Nuevo año: '));

        encontrado.nombre = nuevoNombre;
        encontrado.escritor = nuevoAutor;
        encontrado.costo = nuevoPrecio;
        encontrado.publicacion = nuevoAnio;

        console.log('✅ Libro modificado con éxito.');
        guardarBiblioteca();
    } else {
        console.log('No se encontró el libro.');
    }

    desplegarMenu();
}

// Iniciar aplicación
function iniciarAplicacion() {
    desplegarMenu();
}

iniciarAplicacion();

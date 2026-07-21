document.addEventListener("DOMContentLoaded", () => {
    const formLibro = document.getElementById("form-libro");
    const formPrestamo = document.getElementById("form-prestamo");
    const tablaLibrosBody = document.querySelector("#tabla-libros tbody");
    const tablaPrestamosBody = document.querySelector("#tabla-prestamos tbody");
    const selectLibro = document.getElementById("select-libro");

    // Datos iniciales
    let libros = [
        { id: 1, titulo: "Sistemas Operativos Conceptos", autor: "Silberschatz", categoria: "Programación", estado: "Disponible" },
        { id: 2, titulo: "Cálculo de una Variable", autor: "Thomas", categoria: "Matemáticas", estado: "Disponible" }
    ];

    let prestamos = [];

    function renderizarTodo() {
        // 1. Renderizar Tabla de Inventario
        tablaLibrosBody.innerHTML = "";
        selectLibro.innerHTML = '<option value="">Seleccione un libro</option>';

        libros.forEach((libro, index) => {
            const fila = document.createElement("tr");
            const esDisponible = libro.estado === "Disponible";
            const badgeClass = esDisponible ? "badge-disponible" : "badge-prestado";

            fila.innerHTML = `
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.categoria}</td>
                <td><span class="badge ${badgeClass}">${libro.estado}</span></td>
                <td><button class="btn-action" onclick="eliminarLibro(${index})">Eliminar</button></td>
            `;
            tablaLibrosBody.appendChild(fila);

            // Poblar el menú desplegable solo con libros disponibles
            if (esDisponible) {
                const option = document.createElement("option");
                option.value = libro.id;
                option.textContent = libro.titulo;
                selectLibro.appendChild(option);
            }
        });

        // 2. Renderizar Tabla de Préstamos
        tablaPrestamosBody.innerHTML = "";
        prestamos.forEach((prestamo, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${prestamo.persona}</td>
                <td>${prestamo.libroTitulo}</td>
                <td>${prestamo.fecha}</td>
                <td><button class="btn-devolver" onclick="devolverLibro(${index})">Devolver</button></td>
            `;
            tablaPrestamosBody.appendChild(fila);
        });
    }

    // Guardar Libro Nuevo
    formLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const categoria = document.getElementById("categoria").value;

        libros.push({
            id: Date.now(),
            titulo,
            autor,
            categoria,
            estado: "Disponible"
        });

        renderizarTodo();
        formLibro.reset();
    });

    // Registrar Préstamo
    formPrestamo.addEventListener("submit", (e) => {
        e.preventDefault();
        const persona = document.getElementById("nombre-persona").value;
        const libroId = parseInt(selectLibro.value);

        const libro = libros.find(l => l.id === libroId);
        if (libro) {
            libro.estado = "Prestado";
            prestamos.push({
                persona,
                libroId: libro.id,
                libroTitulo: libro.titulo,
                fecha: new Date().toLocaleDateString('es-ES')
            });

            renderizarTodo();
            formPrestamo.reset();
        }
    });

    // Devolver Libro
    window.devolverLibro = function(index) {
        const prestamo = prestamos[index];
        const libro = libros.find(l => l.id === prestamo.libroId);
        if (libro) {
            libro.estado = "Disponible";
        }
        prestamos.splice(index, 1);
        renderizarTodo();
    };

    // Eliminar Libro
    window.eliminarLibro = function(index) {
        libros.splice(index, 1);
        renderizarTodo();
    };

    renderizarTodo();
});

document.addEventListener("DOMContentLoaded", () => {
    const formLibro = document.getElementById("form-libro");
    const formPrestamo = document.getElementById("form-prestamo");
    const bodyLibros = document.getElementById("body-libros");
    const bodyPrestamos = document.getElementById("body-prestamos");
    const selectLibro = document.getElementById("select-libro");

    // 1. Añadir Libro Nuevo
    formLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const categoria = document.getElementById("categoria").value;

        // Fila en tabla de inventario
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${titulo}</td>
            <td>${autor}</td>
            <td>${categoria}</td>
            <td><span class="badge badge-disponible" id="badge-${titulo}">Disponible</span></td>
            <td><button class="btn-action" onclick="this.closest('tr').remove()">Eliminar</button></td>
        `;
        bodyLibros.appendChild(tr);

        // Opción en el selector de préstamo
        const option = document.createElement("option");
        option.value = titulo;
        option.textContent = titulo;
        selectLibro.appendChild(option);

        formLibro.reset();
    });

    // 2. Registrar Préstamo
    formPrestamo.addEventListener("submit", (e) => {
        e.preventDefault();
        const persona = document.getElementById("nombre-persona").value;
        const libroSelec = selectLibro.value;

        if (!libroSelec) return;

        // Cambiar estado en inventario
        const badge = document.getElementById(`badge-${libroSelec}`);
        if (badge) {
            badge.textContent = "Prestado";
            badge.className = "badge badge-prestado";
        }

        // Agregar a la tabla de Préstamos Activos
        const tr = document.createElement("tr");
        const fecha = new Date().toLocaleDateString('es-ES');
        tr.innerHTML = `
            <td>${persona}</td>
            <td>${libroSelec}</td>
            <td>${fecha}</td>
            <td><button class="btn-devolver" onclick="devolverLibro(this, '${libroSelec}')">Devolver</button></td>
        `;
        bodyPrestamos.appendChild(tr);

        // Remover opción del menú desplegable
        const optionToRemove = Array.from(selectLibro.options).find(opt => opt.value === libroSelec);
        if (optionToRemove) optionToRemove.remove();

        formPrestamo.reset();
    });

    // 3. Devolver Libro
    window.devolverLibro = function(btn, libroTitulo) {
        // Restaurar estado a Disponible
        const badge = document.getElementById(`badge-${libroTitulo}`);
        if (badge) {
            badge.textContent = "Disponible";
            badge.className = "badge badge-disponible";
        }

        // Volver a agregar al menú desplegable
        const option = document.createElement("option");
        option.value = libroTitulo;
        option.textContent = libroTitulo;
        selectLibro.appendChild(option);

        // Eliminar fila de la tabla de préstamos
        btn.closest('tr').remove();
    };
});

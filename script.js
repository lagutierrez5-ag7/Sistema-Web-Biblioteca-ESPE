document.addEventListener("DOMContentLoaded", () => {
    const formLibro = document.getElementById("form-libro");
    const tablaBody = document.querySelector("#tabla-libros tbody");

    // Datos iniciales de demostración
    const librosIniciales = [
        { titulo: "Sistemas Operativos Conceptos", autor: "Silberschatz", categoria: "Programación", estado: "Disponible" },
        { titulo: "Cálculo de una Variable", autor: "Thomas", categoria: "Matemáticas", estado: "Disponible" }
    ];

    function renderizarTabla() {
        tablaBody.innerHTML = "";
        librosIniciales.forEach((libro, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.categoria}</td>
                <td><span class="badge">${libro.estado}</span></td>
                <td><button class="btn-action" onclick="eliminarLibro(${index})">Eliminar</button></td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    formLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const categoria = document.getElementById("categoria").value;

        librosIniciales.push({ titulo, autor, categoria, estado: "Disponible" });
        renderizarTabla();
        formLibro.reset();
    });

    window.eliminarLibro = function(index) {
        librosIniciales.splice(index, 1);
        renderizarTabla();
    };

    renderizarTabla();
});

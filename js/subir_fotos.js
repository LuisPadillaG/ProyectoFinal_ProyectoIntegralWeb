const inputSubirFotos = document.getElementById("inputSubirFotos");
const previewGaleria = document.querySelector(".previewGaleria");
const plantilla = document.getElementById("plantilla-preview");

inputSubirFotos.addEventListener("change", () => {
    const archivos = Array.from(inputSubirFotos.files);

    archivos.forEach(archivo => {
        const imagenURL = URL.createObjectURL(archivo);

        // Clonar plantilla
        const previewDiv = plantilla.content.cloneNode(true);

        // Elementos internos
        const img = previewDiv.querySelector(".imagenPreview");
        const btnEliminar = previewDiv.querySelector(".botonEliminarPreview");
        const emociones = previewDiv.querySelectorAll(".emocion_individual");

        // Poner imagen
        img.src = imagenURL;

        // Acción eliminar tarjeta
        btnEliminar.addEventListener("click", (e) => {
            e.target.closest(".previewImagenIndividual").remove();
        });

        // Selección de emociones
        emociones.forEach(emocion => {
            emocion.addEventListener("click", () => {
                // Quitar selección de todas en la tarjeta actual
                emociones.forEach(e => e.classList.remove("emocionSeleccionada"));
                // Agregar selección a la clickeada
                emocion.classList.add("emocionSeleccionada");
            });
        });

        // Agregar tarjeta a contenedor
        previewGaleria.appendChild(previewDiv);
    });

    // Permite volver a subir las mismas imágenes si se quiere
    inputSubirFotos.value = "";
});

function Regresar(){
    window.history.back();
}
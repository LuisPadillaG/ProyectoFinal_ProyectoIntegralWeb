document.addEventListener("DOMContentLoaded", () => {
    // === Obtener ID del álbum desde sessionStorage ===
    const album_id = sessionStorage.getItem("album_id");
    console.log("📁 ID del álbum:", album_id);

    if (!album_id) {
        console.error("❌ No se encontró album_id en sessionStorage");
        alert("No se encontró el álbum. Por favor, vuelve a seleccionarlo.");
        return;
    }

    // === Obtener datos del álbum ===
    fetch(`obtener_album.php?id=${album_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos del álbum recibidos:", data);

            const TituloAlbumTexto = document.querySelector(".TituloAlbumTexto");

            TituloAlbumTexto.textContent = data.album.nombre;

            // Aplicar estilos según el color del álbum
            /*switch (data.album.color) {
                case "rojo":
                    document.querySelector('.TituloAlbum').style.backgroundImage = 'url("recursos/img/fondoRojo.jpg")';
                    document.querySelector('.ContenedorContenidoAlbum').style.backgroundColor = '#ee828241';
                    break;
                case "azul":
                    document.querySelector('.TituloAlbum').style.backgroundImage = 'url("recursos/img/fondoAzul.jpg")';
                    document.querySelector('.ContenedorContenidoAlbum').style.backgroundColor = '#8299ee41';
                    break;
                case "amarillo":
                    document.querySelector('.TituloAlbum').style.backgroundImage = 'url("recursos/img/fondoAmarillo.jpg")';
                    document.querySelector('.ContenedorContenidoAlbum').style.backgroundColor = '#eece8241';
                    break;
                case "verde":
                    document.querySelector('.TituloAlbum').style.backgroundImage = 'url("recursos/img/fondoVerde.jpg")';
                    document.querySelector('.ContenedorContenidoAlbum').style.backgroundColor = '#90ee8241';
                    break;
                case "rosa":
                    document.querySelector('.TituloAlbum').style.backgroundImage = 'url("recursos/img/fondoRosa.jpg")';
                    document.querySelector('.ContenedorContenidoAlbum').style.backgroundColor = '#ee82e541';
                    break;
                
            }*/
        })
        .catch(error => {
            console.error("Error al obtener el álbum:", error);
        });

    // === Cargar datos del usuario (navbar) ===
    async function CargarDatosUsuario() {
        let respuesta = await fetch("dashboard.php");
        let datos = await respuesta.json();

        if (datos.error === "NO_SESION") {
            window.location.href = "index.html";
            return;
        }

        console.log("Datos usuario:", datos);
        document.querySelector(".fotoNavBar").src = datos.imagen;
        document.querySelector(".nombreNavBar").textContent = datos.nombre;
    }
    CargarDatosUsuario();

    // === Subir fotos ===
    const inputSubirFotos = document.getElementById("inputSubirFotos");
    const previewGaleria = document.querySelector(".previewGaleria");
    const plantilla = document.getElementById("plantilla-preview");
    const btnEnviar = document.querySelector(".buttoncompletoCrearAlbum");

    inputSubirFotos.addEventListener("change", () => {
        const archivos = Array.from(inputSubirFotos.files);

        archivos.forEach(archivo => {
            const previewDiv = plantilla.content.cloneNode(true);
            const img = previewDiv.querySelector(".imagenPreview");
            const btnEliminar = previewDiv.querySelector(".botonEliminarPreview");
            const emociones = previewDiv.querySelectorAll(".emocion_individual");

            img.src = URL.createObjectURL(archivo);
            previewDiv.querySelector(".previewImagenIndividual").archivo = archivo;

            emociones.forEach(emocion => {
                emocion.addEventListener("click", () => {
                    emociones.forEach(e => e.classList.remove("emocionSeleccionada"));
                    emocion.classList.add("emocionSeleccionada");
                });
            });

            // Eliminar tarjeta
            btnEliminar.addEventListener("click", (e) => {
                e.target.closest(".previewImagenIndividual").remove();
            });

            previewGaleria.appendChild(previewDiv);
        });

        // Permite volver a seleccionar los mismos archivos si se desea
        inputSubirFotos.value = "";
    });

    // === Enviar datos al servidor ===
    btnEnviar.addEventListener("click", async () => {
        const previews = document.querySelectorAll(".previewImagenIndividual");

        if (previews.length === 0) {
            alert("No olvides subir tu recuerdo");
            return;
        }

        let formData = new FormData();
        formData.append("album_id", album_id);

        previews.forEach((preview) => {
            const file = preview.archivo;
            const descripcion = preview.querySelector(".inputGeneral").value.trim();
            const emocionSeleccionada = preview.querySelector(".emocionSeleccionada");
            const emocionValue = emocionSeleccionada ? emocionSeleccionada.getAttribute("value") : "feliz";

            formData.append("foto[]", file);
            formData.append("descripcion[]", descripcion);
            formData.append("emocion[]", emocionValue);
        });

        try {
            const response = await fetch("subir_fotos_conexion.php?id=" + album_id, {
                method: "POST",
                body: formData
            });

            const result = await response.text();
            console.log("Servidor:", result);

            alert("Recuerdos guardados con éxito.");
            location.reload();

        } catch (error) {
            console.error("Error al subir fotos:", error);
            alert("Ocurrió un error al enviar los datos.");
        }
    });
  
    window.Regresar = function () {
        window.history.back();
    };
});

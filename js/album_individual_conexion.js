let fotos = []; // Global para el PopUp

document.addEventListener("DOMContentLoaded", () => {

    //Obtener ID del álbum desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get("id");

    if (!albumId) {
        console.error("No se recibió ID del álbum en la URL");
        return;
    }

    console.log("ID del álbum:", albumId);

    //Obtener Datos del Álbum
    fetch(`obtener_album.php?id=${albumId}`)
        .then(response => response.json())
        .then(data => {

            console.log("Datos del álbum recibidos:");
            console.log(data);

            const TituloAlbumTexto = document.querySelector(".TituloAlbumTexto");
            const InfoRecuerdoTexto = document.querySelector(".InfoRecuerdoTexto");

            if (TituloAlbumTexto && InfoRecuerdoTexto) {
                TituloAlbumTexto.innerHTML = data.album.nombre;
                InfoRecuerdoTexto.innerHTML = data.album.descripcion;
            }

            //Colores del álbum
            switch (data.album.color) {
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
            }

            //Renderizado de Fotos ---
            fotos = data.fotos; // Guardar globalmente
            const contenedor = document.getElementById("contenedorGrids");

            if (!contenedor) {
                console.error("❌ No existe #contenedorGrids en el HTML");
                return;
            }

            if (!fotos || fotos.length === 0) {
                contenedor.innerHTML = "<p style='padding:20px;'>No hay recuerdos aún...</p>";
                return;
            }

            let index = 0;

            function agregarGrid() {
                const template = document.getElementById("gridA");
                const clon = template.content.cloneNode(true);
                const imagenes = clon.querySelectorAll(".foto_recuerdo");

                imagenes.forEach(img => {
                    if (index < fotos.length) {
                        img.src = `uploads/${fotos[index].archivo}`;
                        index++;
                    } else {
                        img.parentElement.style.display = "none";
                    }
                });

                contenedor.appendChild(clon);
            }

            //Repetir únicamente gridA en bloques de 5
            while (index < fotos.length) agregarGrid();

            inicializarPopUpAnimado();
        });
});


// Cargar datos usuario ---
async function CargarDatosUsuario() {
    let respuesta = await fetch("dashboard.php");
    let datos = await respuesta.json();

    if (datos.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    document.querySelector(".fotoNavBar").src = datos.imagen;
    document.querySelector(".nombreNavBar").textContent = datos.nombre;
}
CargarDatosUsuario();


// popup -------------
function inicializarPopUpAnimado() {

    const PopUp_VisualizarFotoDeTurno = document.querySelector(".PopUp_VisualizarFotoDeTurno");
    const closePopUp = document.querySelector(".closePopUp");
    const popUpImg = document.getElementById("PopUp_FotografiaRecuerdo");
    const popUpEmocion = document.getElementById("PopUp_Emocion");
    const popUpDescripcion = document.getElementById("PopUp_descripcion");

    function obtenerIconoEmocion(e) {
        switch (e?.toLowerCase()) {
            case "amor": return "recursos/img/emociones/love.png";
            case "feliz": return "recursos/img/emociones/feliz.png";
            case "enojado": return "recursos/img/emociones/enojado.png";
            case "triste": return "recursos/img/emociones/triste.png";
            case "sorprendido": return "recursos/img/emociones/sorprendido.png";
            default: return "recursos/img/emociones/feliz.png";
        }
    }

    // 🔹 Detectar clics en recuerdos individuales
    document.addEventListener("click", e => {
        const card = e.target.closest(".recuerdoIndividual");
        if (!card) return;

        const index = [...document.querySelectorAll(".recuerdoIndividual")].indexOf(card);
        const f = fotos[index];
        if (!f) return;

        // Mostrar datos del recuerdo
        popUpImg.src = `uploads/${f.archivo}`;
        popUpEmocion.src = obtenerIconoEmocion(f.emocion);
        popUpDescripcion.textContent = f.nombre || "Sin descripción";

        // 🌀 Mostrar animación de apertura
        PopUp_VisualizarFotoDeTurno.classList.remove('slide-right', 'slide-left');
        PopUp_VisualizarFotoDeTurno.style.display = 'block';
        PopUp_VisualizarFotoDeTurno.classList.add('slide-left');

        PopUp_VisualizarFotoDeTurno.addEventListener('animationend', (e) => {
            if (e.animationName !== "slide-left") return;
            PopUp_VisualizarFotoDeTurno.classList.remove('slide-left');
        }, { once: true });
    });

    // 🔹 Animación al cerrar
    closePopUp.addEventListener('click', () => {
        PopUp_VisualizarFotoDeTurno.classList.remove('slide-right', 'slide-left');
        PopUp_VisualizarFotoDeTurno.classList.add('slide-right');

        PopUp_VisualizarFotoDeTurno.addEventListener('animationend', (e) => {
            if (e.animationName !== "slide-right") return;
            PopUp_VisualizarFotoDeTurno.classList.remove('slide-right');
            PopUp_VisualizarFotoDeTurno.style.display = 'none';
        }, { once: true });
    });
}

 
document.querySelector(".buttoncompletoCrearAlbum").addEventListener("click", () => {
    const album_id = new URLSearchParams(window.location.search).get("id");
    sessionStorage.setItem("album_id", album_id);
    window.location.href = "subir_fotos_album_individual.html";
});

/*let pin_cuenta;
pin_cuenta = 1111;
async function CargarDatosUsuario() {
    let respuesta = await fetch("dashboard.php");
    let datos = await respuesta.json();

    if (datos.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }
    console.log(datos)
    // Elementos del navbar
    document.querySelector(".fotoNavBar").src = datos.imagen;
    document.querySelector(".nombreNavBar").textContent = datos.nombre;
    pin_cuenta = datos.pin
    // Elementos del panel de perfil
    document.querySelector(".fotopreviewPerfil").src = datos.imagen;
    document.querySelector(".nombrePerfil").textContent = datos.nombre;
    document.querySelector(".correoPerfil").textContent = datos.correo;
}

// Llamamos al cargar página
CargarDatosUsuario();
async function CargarAlbumesUsuario() {
    let respuesta = await fetch("obtener_albumes.php");
    let albums = await respuesta.json();

    if (albums.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    console.log(albums);
    const contenedor = document.querySelector(".ContenedorContenidoAlbum");
    contenedor.innerHTML = ""; // Limpia el contenido anterior

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
        if (album.privado != 1) {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("TarjetaAlbum");
            // guarda el id para uso futuro
            tarjeta.dataset.albumId = album.id;
            // cursor para indicar que es clicable
            tarjeta.style.cursor = "pointer";

            // construir innerHTML según color
            switch(album.color){
                case "rojo":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumROJO"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Rojo.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumROJO">${escapeHtml(album.nombre)}</h4>
                        </div>`;
                    break;
                case "azul":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumAZUL"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Azul.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumAZUL">${escapeHtml(album.nombre)}</h4>
                        </div>`;
                    break;
                case "amarillo":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumAMARILLO"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Amarillo.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumAMARILLO">${escapeHtml(album.nombre)}</h4>
                        </div>`;
                    break;
                case "verde":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumVERDE"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Verde.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumVERDE">${escapeHtml(album.nombre)}</h4>
                        </div>`;
                    break;
                case "rosa":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumROSA"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Rosa.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumROSA">${escapeHtml(album.nombre)}</h4>
                        </div>`;
                    break;
                default:
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum"></div>
                            <h4 class="textoContenidoTarjetaAlbum">${escapeHtml(album.nombre)}</h4>
                        </div>`;
            }

            // click para abrir el álbum
            tarjeta.addEventListener('click', (evt) => {
                // si agregas dentro botones que no deban redirigir, puedes comprobar evt.target aquí
                // si el click viene de un control interno (ej: menú) evita redirigir:
                if (evt.target.closest('.menuHamburguesaTarjetaAlbum')) {
                    // abrir menu, o devolver para no navegar
                    return;
                }
                // redirige a la página que maneja albumes (usa el .php que mostraste)
                window.location.href = `album_individual.html?id=${encodeURIComponent(album.id)}`;
            });

            contenedor.appendChild(tarjeta);
        }
    }
}

// helper simple para evitar inyección de HTML en nombres
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
}

// Llamar al cargar la página
CargarAlbumesUsuario();

async function CargarAlbumesPrivados() {
    let respuesta = await fetch("obtener_albumes.php");
    let albums = await respuesta.json();

    if (albums.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    console.log("Privados:", albums);

    const contenedorPrivado = document.querySelector(".contenidoInternoPrivado");
    contenedorPrivado.innerHTML = ""; // Limpiar antes de agregar

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
 
        if (album.privado == 1) {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("TarjetaAlbum");

            switch(album.color){
                case "rojo":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumROJO"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Rojo.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumROJO">${album.nombre}</h4>
                        </div>`;
                break;

                case "azul":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumAZUL"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Azul.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumAZUL">${album.nombre}</h4>
                        </div>`;
                break;

                case "amarillo":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumAMARILLO"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Amarillo.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumAMARILLO">${album.nombre}</h4>
                        </div>`;
                break;

                case "verde":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumVERDE"></div>
                        
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Verde.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumVERDE">${album.nombre}</h4>
                        </div>`;
                break;

                case "rosa":
                    tarjeta.innerHTML = `
                        <div class="colorTarjetaAlbum colorTarjetaAlbumROSA"></div>
                        <div class="contenidoTarjetaAlbum">
                            <div class="imagenContenidoTarjetaAlbum">
                                <img src="recursos/img/portadaPredeterminada_Rosa.png" alt="">
                            </div>
                            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbumROSA">${album.nombre}</h4>
                        </div>`;
                break;
            }

            contenedorPrivado.appendChild(tarjeta);
        }
    }
}


// Detectar selección de color
let colorActual = "rojo"; // Color por defecto

document.querySelectorAll(".color_individual").forEach(c => {
    c.addEventListener("click", () => {
        document.querySelectorAll(".color_individual").forEach(x => x.classList.remove("color_seleccionado"));
        c.classList.add("color_seleccionado");
        colorActual = c.dataset.color;
    });
});



async function CrearAlbum(event) {
    event.preventDefault(); // No recargar página

    const nombre = document.getElementById("name_new_album").value.trim();
    const descripcion = document.getElementById("descripcion_new_album").value.trim();
    const privado = document.getElementById("privado").checked ? 1 : 0;

    let datos = {
        nombre,
        descripcion,
        privado,
        color: colorActual
    };

    let respuesta = await fetch("crear_album.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    let resultado = await respuesta.json();

    if (resultado.status === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    if (resultado.status === "OK") {
        CerrarPopUpNuevoAlbum();
        CargarAlbumesUsuario(); // <--- después lo crearemos para refrescar vista
    } else {
        alert("Error: " + (resultado.mensaje || "No se pudo crear el álbum"));
    }
}
 
const fondo_Popup_DatosActualizadosCorrectamente = document.querySelector(".fondo_Popup_DatosActualizadosCorrectamente")
const Popup_DatosActualizadosCorrectamente = document.querySelector(".Popup_DatosActualizadosCorrectamente")
const Popup_DatosActualizadosCorrectamente_h2 = document.querySelector(".Popup_DatosActualizadosCorrectamente_h2");
const NotaPopUp = document.querySelector(".NotaPopUp")
function ActualizarDatosVisual(){
    fondo_Popup_DatosActualizadosCorrectamente.style.display = "flex";
    Popup_DatosActualizadosCorrectamente_h2.classList.add('scale-up-center');
    Popup_DatosActualizadosCorrectamente_h2.addEventListener('animationend', () =>{
        NotaPopUp.style.opacity = '1'
        Popup_DatosActualizadosCorrectamente_h2.classList.remove('scale-up-center');
        Popup_DatosActualizadosCorrectamente_h2.addEventListener('click', ()=>{
            fondo_PopupActualizacionDatosCuenta.style.display = 'none'
            fondo_Popup_DatosActualizadosCorrectamente.style.display = 'none'
        }, { once: true });
    }, { once: true });
}
async function ActualizarDatos() {

    const nombre = document.getElementById("username").value.trim();
    const pin_actual = document.getElementById("pin_actual").value.trim();
    const pin_nuevo = document.getElementById("pin_nuevo").value.trim();
    const imagenFile = document.getElementById("subirFoto").files[0];

    if (!nombre | !pin_actual || !pin_nuevo) {
        alert("Completa todos los campos");
        return;
    }
    if(pin_actual != pin_cuenta){
        alert("Ese no era tu PIN.");
        return;
    }
    let formData = new FormData();
    formData.append("nombre", nombre); 
    formData.append("pin_actual", pin_actual);
    formData.append("pin_nuevo", pin_nuevo);

    if (imagenFile) {
        formData.append("imagen", imagenFile);
    }

    let respuesta = await fetch("actualizar.php", {
        method: "POST",
        body: formData
    });

    let data = await respuesta.json();

    if (data.status === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    if (data.status === "OK") {
        ActualizarDatosVisual();
        CargarDatosUsuario();
        pin_cuenta = pin_nuevo
    } else {
        alert(data.mensaje || "Error al actualizar");
    }
}
const VerificacionContenidoPrivadoPro = document.querySelector(".VerificacionContenidoPrivado");
const VisualizarContenidoPrivadoWow = document.querySelector(".VisualizarContenidoPrivado")
const avisoVerificacion = document.querySelector(".avisoVerificacion")
VisualizarContenidoPrivadoWow.addEventListener('click', ()=>{
    const inputVerificacionContenidoPrivado = document.querySelector(".inputVerificacionContenidoPrivado").value.trim();

    if(!inputVerificacionContenidoPrivado){
        avisoVerificacion.innerHTML = "Escribe antes de enviar"
        return;
    }
    if(inputVerificacionContenidoPrivado != pin_cuenta){
        avisoVerificacion.innerHTML = "PIN incorrecto"
        return;
    }
    if(inputVerificacionContenidoPrivado == pin_cuenta){
        VerificacionContenidoPrivadoPro.style.display = 'none'
        CargarAlbumesPrivados();
    } 
})

*/
let pin_cuenta = 1111;

async function CargarDatosUsuario() {
    let respuesta = await fetch("dashboard.php");
    let datos = await respuesta.json();

    if (datos.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    console.log("✅ Usuario:", datos);

    //lo mismo pero el fakin caché
    /*document.querySelector(".fotoNavBar").src = datos.imagen;*/
    const timestamp = new Date().getTime();
    const imagenActualizada = `${datos.imagen}?t=${timestamp}`;
    document.querySelector(".nombreNavBar").textContent = datos.nombre;
    document.querySelector(".fotoNavBar").src = imagenActualizada;
    document.querySelector(".fotopreviewPerfil").src = imagenActualizada;

    pin_cuenta = datos.pin;

    document.querySelector(".fotopreviewPerfil").src = datos.imagen;
    document.querySelector(".nombrePerfil").textContent = datos.nombre;
    document.querySelector(".correoPerfil").textContent = datos.correo;
}
CargarDatosUsuario();
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function CargarAlbumesUsuario() {
    let respuesta = await fetch("obtener_albumes.php");
    let albums = await respuesta.json();

    if (albums.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    console.log("Álbumes públicos:", albums);

    const contenedor = document.querySelector(".ContenedorContenidoAlbum");
    contenedor.innerHTML = "";

    for (const album of albums) {
        if (album.privado == 1) continue;

        const tarjeta = crearTarjetaAlbum(album);
        contenedor.appendChild(tarjeta);
    }
}
CargarAlbumesUsuario();

async function CargarAlbumesPrivados() {
    let respuesta = await fetch("obtener_albumes.php");
    let albums = await respuesta.json();

    if (albums.error === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    console.log("🔐 Álbumes privados:", albums);

    const contenedorPrivado = document.querySelector(".contenidoInternoPrivado");
    contenedorPrivado.innerHTML = "";

    for (const album of albums) {
        if (album.privado != 1) continue;

        const tarjeta = crearTarjetaAlbum(album);
        contenedorPrivado.appendChild(tarjeta);
    }
}

function crearTarjetaAlbum(album) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("TarjetaAlbum");
    tarjeta.dataset.albumId = album.id;
    tarjeta.style.cursor = "pointer";

    // --- Fondo según color ---
    const color = album.color?.toLowerCase() || "rojo";
    const imagenColor = `recursos/img/portadaPredeterminada_${capitalize(color)}.png`;
    const claseColor = color.toUpperCase();

    tarjeta.innerHTML = `
        <div class="colorTarjetaAlbum colorTarjetaAlbum${claseColor}"></div>
        <div class="contenidoTarjetaAlbum">
            <div class="imagenContenidoTarjetaAlbum">
                <img src="${imagenColor}" alt="">
            </div>
            <h4 class="textoContenidoTarjetaAlbum textoContenidoTarjetaAlbum${claseColor}">
                ${escapeHtml(album.nombre)}
            </h4>
        </div>`;

    // Evento de click para abrir
    tarjeta.addEventListener("click", (evt) => {
        if (evt.target.closest('.menuHamburguesaTarjetaAlbum')) return;

        if (album.privado == 1) {
            window.location.href = `album_individual.html?id=${encodeURIComponent(album.id)}`;
        } else {
            window.location.href = `album_individual.html?id=${encodeURIComponent(album.id)}`;
        }
    });

    return tarjeta;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
let colorActual = "rojo";
document.querySelectorAll(".color_individual").forEach(c => {
    c.addEventListener("click", () => {
        document.querySelectorAll(".color_individual").forEach(x => x.classList.remove("color_seleccionado"));
        c.classList.add("color_seleccionado");
        colorActual = c.dataset.color;
    });
});
async function CrearAlbum(event) {
    event.preventDefault();

    const nombre = document.getElementById("name_new_album").value.trim();
    const descripcion = document.getElementById("descripcion_new_album").value.trim();
    const privado = document.getElementById("privado").checked ? 1 : 0;

    if (!nombre) {
        alert("Ponle un nombre a tu álbum.");
        return;
    }

    const datos = { nombre, descripcion, privado, color: colorActual };

    let respuesta = await fetch("crear_album.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    let resultado = await respuesta.json();

    if (resultado.status === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    if (resultado.status === "OK") {
        CerrarPopUpNuevoAlbum?.();
        CargarAlbumesUsuario();
    } else {
        alert("Error: " + (resultado.mensaje || "No se pudo crear el álbum"));
    }
}

async function ActualizarDatos() {
    const nombre = document.getElementById("username").value.trim();
    const pin_actual = document.getElementById("pin_actual").value.trim();
    const pin_nuevo = document.getElementById("pin_nuevo").value.trim();
    const imagenFile = document.getElementById("subirFoto").files[0];

    if (!nombre || !pin_actual || !pin_nuevo) {
        alert("Completa todos los campos");
        return;
    }
    if (pin_actual != pin_cuenta) {
        alert("Ese no era tu PIN.");
        return;
    }

    let formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("pin_actual", pin_actual);
    formData.append("pin_nuevo", pin_nuevo);
    if (imagenFile) formData.append("imagen", imagenFile);

    let respuesta = await fetch("actualizar.php", { method: "POST", body: formData });
    let data = await respuesta.json();

    if (data.status === "NO_SESION") {
        window.location.href = "index.html";
        return;
    }

    if (data.status === "OK") {
        ActualizarDatosVisual();
        CargarDatosUsuario();
        pin_cuenta = pin_nuevo;
    } else {
        alert(data.mensaje || "Error al actualizar");
    }
}
// ============================================================
const fondo_Popup_DatosActualizadosCorrectamente = document.querySelector(".fondo_Popup_DatosActualizadosCorrectamente");
const Popup_DatosActualizadosCorrectamente_h2 = document.querySelector(".Popup_DatosActualizadosCorrectamente_h2");
const NotaPopUp = document.querySelector(".NotaPopUp");

function ActualizarDatosVisual() {
    fondo_Popup_DatosActualizadosCorrectamente.style.display = "flex";
    Popup_DatosActualizadosCorrectamente_h2.classList.add('scale-up-center');
    Popup_DatosActualizadosCorrectamente_h2.addEventListener('animationend', () => {
        NotaPopUp.style.opacity = '1';
        Popup_DatosActualizadosCorrectamente_h2.classList.remove('scale-up-center');
        Popup_DatosActualizadosCorrectamente_h2.addEventListener('click', () => {
            fondo_Popup_DatosActualizadosCorrectamente.style.display = 'none';
        }, { once: true });
    }, { once: true });
}

const VerificacionContenidoPrivadoPro = document.querySelector(".VerificacionContenidoPrivado");
const VisualizarContenidoPrivadoWow = document.querySelector(".VisualizarContenidoPrivado");
const avisoVerificacion = document.querySelector(".avisoVerificacion");

VisualizarContenidoPrivadoWow.addEventListener('click', () => {
    const inputVerificacionContenidoPrivado = document.querySelector(".inputVerificacionContenidoPrivado").value.trim();

    if (!inputVerificacionContenidoPrivado) {
        avisoVerificacion.innerHTML = "Escribe antes de enviar";
        return;
    }
    if (inputVerificacionContenidoPrivado != pin_cuenta) {
        avisoVerificacion.innerHTML = "PIN incorrecto";
        return;
    }

    VerificacionContenidoPrivadoPro.style.display = 'none';
    CargarAlbumesPrivados();
});

function SalirSesion(){
    window.location.href = "index.html";
}
const plantilla = document.querySelector("TarjetaAlbum");
const contenedor = document.querySelector(".ContenedorCartas");
//contenedor.innerHTML = "";
//const menuHamburguesa = clon.querySelector(".menuHamburguesaTarjetaAlbum");

const contenidoAlbumes = document.querySelector(".contenidoAlbumes");
const contenidoPerfil = document.querySelector(".contenidoPerfil");
const contenidoPrivados = document.querySelector(".contenidoPrivados");
    const VerificacionContenidoPrivado = document.querySelector(".VerificacionContenidoPrivado");
    const contenidoInternoPrivado = document.querySelector(".contenidoInternoPrivado")
function VisualizarPerfil() {
    contenidoPerfil.classList.remove('blur-out', 'blur-in');
    contenidoAlbumes.classList.remove('blur-out', 'blur-in');
    contenidoPrivados.classList.remove('blur-out', 'blur-in');
    contenidoInternoPrivado.classList.remove('blur-in', 'blur-out')
    VerificacionContenidoPrivado.classList.remove('scale-up-center', 'scale-down-center');
    
    if(window.getComputedStyle(contenidoAlbumes).display === "block"){
        contenidoAlbumes.classList.add('blur-out')
        contenidoAlbumes.addEventListener('animationend', () => {
            contenidoAlbumes.style.display = 'none';
            contenidoPerfil.style.display = 'block';
            contenidoPerfil.classList.add('blur-in');
        }, { once: true });
    }
    if(window.getComputedStyle(contenidoPrivados).display === "block"){
        contenidoInternoPrivado.classList.add("blur-out")
        VerificacionContenidoPrivado.classList.add("scale-down-center")
        VerificacionContenidoPrivado.addEventListener('animationend', () => {
            contenidoPrivados.style.display = 'none';
            contenidoPerfil.style.display = 'block';
            contenidoPerfil.classList.add('blur-in');
        }, { once: true });
    }

}
function VisualizarAlbumes() {
    contenidoPerfil.classList.remove('blur-out', 'blur-in');
    contenidoAlbumes.classList.remove('blur-out', 'blur-in');
    contenidoPrivados.classList.remove('blur-out', 'blur-in');
    contenidoInternoPrivado.classList.remove('blur-in', 'blur-out')
    VerificacionContenidoPrivado.classList.remove('scale-up-center', 'scale-down-center');
    
    // dato curioso de desarrollador: window.getComputedStyle() para obtener el valor real del display en pantalla, en lugar de style.display, que realmente verifica todo visto desde el JS
    if (window.getComputedStyle(contenidoPrivados).display === "block") {
        contenidoInternoPrivado.classList.add("blur-out")
        VerificacionContenidoPrivado.classList.add("scale-down-center")
        contenidoPrivados.addEventListener('animationend', () => {
            contenidoPrivados.style.display = 'none';
            contenidoAlbumes.style.display = 'block';
            contenidoAlbumes.classList.add('blur-in');
        }, { once: true });
    }
    if (window.getComputedStyle(contenidoPerfil).display === "block") {
        contenidoPerfil.classList.add('blur-out')
        contenidoPerfil.addEventListener('animationend', () => {
            contenidoPerfil.style.display = 'none';
            contenidoAlbumes.style.display = 'block';
            contenidoAlbumes.classList.add('blur-in');
        }, { once: true });
    }

}
function VisualizarPrivados() {
    contenidoPerfil.classList.remove('blur-out', 'blur-in');
    contenidoAlbumes.classList.remove('blur-out', 'blur-in');
    contenidoPrivados.classList.remove('blur-out', 'blur-in');
    contenidoInternoPrivado.classList.remove('blur-in', 'blur-out')
    VerificacionContenidoPrivado.classList.remove('scale-up-center', 'scale-down-center');
    VerificacionContenidoPrivado.style.display = 'flex'
    if (window.getComputedStyle(contenidoPerfil).display === "block") {
        contenidoPerfil.classList.add('blur-out')
        contenidoPerfil.addEventListener('animationend', () => {
            contenidoPerfil.style.display = 'none';
            contenidoPrivados.style.display = 'block';
            contenidoInternoPrivado.classList.add('blur-in');
            VerificacionContenidoPrivado.classList.add('scale-up-center');
        }, { once: true });
    }
    if (window.getComputedStyle(contenidoAlbumes).display === "block") { 
        VerificacionContenidoPrivado.style.display = 'flex'
        contenidoAlbumes.classList.add('blur-out')
        contenidoAlbumes.addEventListener('animationend', () => {
            contenidoAlbumes.style.display = 'none';
            contenidoPrivados.style.display = 'block'; 
            contenidoInternoPrivado.classList.add('blur-in');
            VerificacionContenidoPrivado.classList.add('scale-up-center');
        }, { once: true });
    }
}

/**
 * navegacion para de una pagina a otra.
 */
/**Cargado inicial de modo oscuro o claro de la pagina */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btn = document.getElementById("btnModo");
  const imgIcono = btn.querySelector("img");

  const modoGuardado = localStorage.getItem("modoOscuro");

  if (modoGuardado === "true") {
      body.classList.add("modo-oscuro");
      imgIcono.src = 'recursos/img/moon_icon.png';
  } else {
      body.classList.remove("modo-oscuro");
      imgIcono.src = 'recursos/img/sun_icon.png';
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const vista = localStorage.getItem("vistaDashboard");

    if(vista){
        if(vista === "perfil") VisualizarPerfil();
        if(vista === "albumes") VisualizarAlbumes();
        if(vista === "privados") VisualizarPrivados();
    }

    // Para que no se repita en recargas:
    localStorage.removeItem("vistaDashboard");
});
/*--------------------Fin de la navegacion---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnModo");
  const body = document.body;
  const imgIcono = btn.querySelector("img");

  if (!btn) return; // si no existe, salimos sin errores

  btn.addEventListener("click", () => {
    // alterna la clase modo-oscuro en el body
    const activo = body.classList.toggle("modo-oscuro");
    localStorage.setItem("modoOscuro", activo ? "true" : "false");
    if(activo){
        imgIcono.src = 'recursos/img/moon_icon.png'
    }else{
        imgIcono.src = 'recursos/img/sun_icon.png'
    }
  });
});

const fondo_PopupActualizacionDatosCuenta = document.querySelector(".fondo_PopupActualizacionDatosCuenta")
const PopupActualizacionDatosCuenta = document.querySelector(".PopupActualizacionDatosCuenta")
function CerrarPopUp(){
    PopupActualizacionDatosCuenta.classList.remove('scale-up-center', 'scale-down-center');
    PopupActualizacionDatosCuenta.classList.add('scale-down-center');
    PopupActualizacionDatosCuenta.addEventListener('animationend', () =>{
        fondo_PopupActualizacionDatosCuenta.style.display = 'none'
    }, { once: true });
}
function AbrirPopUp(){
    PopupActualizacionDatosCuenta.classList.remove('scale-up-center', 'scale-down-center');
    fondo_PopupActualizacionDatosCuenta.style.display = 'flex'
    PopupActualizacionDatosCuenta.classList.add('scale-up-center');
}


const defaultFile = "/recursos/img/usuario_predeterminado.png"

const file = document.getElementById("subirFoto");
const img = document.querySelector(".fotopreview");
file.addEventListener('change', e => {
    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    } else {
        img.src = defaultFile;
    }
});

const buttoncompletoCrearAlbum = document.querySelector('.buttoncompletoCrearAlbum')
const PopUpCrearAlbum = document.querySelector(".PopUpCrearAlbum")
const fondo_PopUpCrearAlbum = document.querySelector(".fondo_PopUpCrearAlbum")

buttoncompletoCrearAlbum.addEventListener('click', ()=>{ 
    fondo_PopUpCrearAlbum.style.display = 'flex'
    PopUpCrearAlbum.classList.add('scale-up-center')
    PopUpCrearAlbum.addEventListener('animationend', ()=>{
        PopUpCrearAlbum.classList.remove("scale-up-center")
    },{once: true});
})


function CerrarPopUpNuevoAlbum(){
    PopUpCrearAlbum.classList.add("scale-down-center")
    PopUpCrearAlbum.addEventListener('animationend', ()=>{
        fondo_PopUpCrearAlbum.style.display = 'none'
        PopUpCrearAlbum.classList.remove("scale-down-center")
    },{once: true});
}

  document.addEventListener("DOMContentLoaded", function () {
    const colores = document.querySelectorAll(".color_individual");

    colores.forEach(color => {
      color.addEventListener("click", () => {
        // Quita la clase color_seleccionado de todos
        colores.forEach(c => c.classList.remove("color_seleccionado"));
        
        // Agrega la clase al color clickeado
        color.classList.add("color_seleccionado");
 
        let inputColor = document.querySelector("#color_seleccionado_input");
        if (!inputColor) {
          inputColor = document.createElement("input");
          inputColor.type = "hidden";
          inputColor.name = "color";
          inputColor.id = "color_seleccionado_input";
          document.querySelector("form").appendChild(inputColor);
        }
        inputColor.value = color.getAttribute("value");
      });
    });
  });
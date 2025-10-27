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
        contenidoAlbumes.classList.add('blur-out')
        contenidoAlbumes.addEventListener('animationend', () => {
            contenidoAlbumes.style.display = 'none';
            contenidoPrivados.style.display = 'block'; 
            contenidoInternoPrivado.classList.add('blur-in');
            VerificacionContenidoPrivado.classList.add('scale-up-center');
        }, { once: true });
    }
}
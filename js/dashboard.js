const plantilla = document.querySelector("TarjetaAlbum");
const contenedor = document.querySelector(".ContenedorCartas");
//contenedor.innerHTML = "";
//const menuHamburguesa = clon.querySelector(".menuHamburguesaTarjetaAlbum");

const contenidoAlbumes = document.querySelector(".contenidoAlbumes");
const contenidoPerfil = document.querySelector(".contenidoPerfil");
const contenidoPrivados = document.querySelector(".contenidoPrivados");
function VisualizarPerfil(){
    contenidoPerfil.style.display = 'block';
    contenidoAlbumes.style.display = 'none';
    contenidoPrivados.style.display = 'none';
}
function VisualizarAlbumes(){
    contenidoPerfil.style.display = 'none';
    contenidoAlbumes.style.display = 'block';
    contenidoPrivados.style.display = 'none';
}
function VisualizarPrivados(){
    contenidoPerfil.style.display = 'none';
    contenidoAlbumes.style.display = 'none';
    contenidoPrivados.style.display = 'block';
}
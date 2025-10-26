const defaultFile = "/recursos/img/usuario_predeterminado.png"
var formularioUsadoActualmente = 1;

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

const btnIniciarSesion = document.querySelector(".iniciarSesion");
const btnCrearCuenta = document.querySelector(".crearCuenta");
const contentIniciarSesion = document.querySelector(".contentIniciarSesion");
const contentCrearCuenta = document.querySelector(".contentCrearCuenta");

/*btnIniciarSesion.addEventListener('click', function () {
    contentCrearCuenta.classList.add('blur-out')
    contentCrearCuenta.addEventListener('animationend', () => {
        contentCrearCuenta.style.display = 'none';
        contentIniciarSesion.style.display = 'block';
        contentIniciarSesion.classList.add('blur-in');
    });
    btnCrearCuenta.classList.add('formularioSecundario');
    btnIniciarSesion.classList.add('formularioActual');

});

btnCrearCuenta.addEventListener('click', function () {
    contentIniciarSesion.classList.add('blur-out')
    contentIniciarSesion.addEventListener('animationend', () => {
        contentIniciarSesion.style.display = 'none';
        contentCrearCuenta.style.display = 'block';
        contentIniciarSesion.classList.add('blur-in');
    });
    btnIniciarSesion.classList.add('formularioSecundario');
    btnCrearCuenta.classList.add('formularioActual');
    formularioUsadoActualmente = 1;
});*/

function FormularioCrearCuenta() {
    if (formularioUsadoActualmente != 1) {
        //quitamos efectos en content
        contentCrearCuenta.classList.remove('blur-out', 'blur-in');
        contentIniciarSesion.classList.remove('blur-out', 'blur-in');
        //resto de mi logica
        contentIniciarSesion.classList.add('blur-out')
        contentIniciarSesion.addEventListener('animationend', () => {
            contentIniciarSesion.style.display = 'none';
            contentCrearCuenta.style.display = 'block';
            contentCrearCuenta.classList.add('blur-in');
        }, { once: true });
        btnCrearCuenta.classList.remove('formularioSecundario');
        btnIniciarSesion.classList.remove('formularioActual');
        btnIniciarSesion.classList.add('formularioSecundario');
        btnCrearCuenta.classList.add('formularioActual');
        
        formularioUsadoActualmente = 1;
    } else {
        console.log("ya estabamos en este formulario")
    }
}
function FormularioIniciarSesion() {
    if (formularioUsadoActualmente != 2) {
        contentCrearCuenta.classList.remove('blur-out', 'blur-in');
        contentIniciarSesion.classList.remove('blur-out', 'blur-in');
        contentCrearCuenta.classList.add('blur-out')
        contentCrearCuenta.addEventListener('animationend', () => {
            contentCrearCuenta.style.display = 'none';
            contentIniciarSesion.style.display = 'block';
            contentIniciarSesion.classList.add('blur-in');
        }, { once: true }); 
        btnIniciarSesion.classList.remove('formularioSecundario');
        btnCrearCuenta.classList.remove('formularioActual');
        btnCrearCuenta.classList.add('formularioSecundario');
        btnIniciarSesion.classList.add('formularioActual');
        formularioUsadoActualmente = 2;
    } else {
        console.log("ya estabamos en el formulario de iniciarsesion")
    }
}
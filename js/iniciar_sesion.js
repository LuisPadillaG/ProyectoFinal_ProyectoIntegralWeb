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
const btnEnviarCrearCuentaDisplay = document.querySelector(".crearCuenta_submit")
const btnEnviarIniciarSesionDisplay = document.querySelector(".iniciarSesion_submit")
function FormularioCrearCuenta() {
    if (formularioUsadoActualmente != 1) {
        //quitamos efectos en content
        contentCrearCuenta.classList.remove('blur-out', 'blur-in');
        contentIniciarSesion.classList.remove('blur-out', 'blur-in');
        btnEnviarCrearCuentaDisplay.classList.remove('blur-out', 'blur-in');
        btnEnviarIniciarSesionDisplay.classList.remove('blur-out', 'blur-in');

        //resto de mi logica
        contentIniciarSesion.classList.add('blur-out')
        btnEnviarIniciarSesionDisplay.classList.add('blur-out')

        contentIniciarSesion.addEventListener('animationend', () => {
            contentIniciarSesion.style.display = 'none';
            btnEnviarIniciarSesionDisplay.style.display = 'none'
            contentCrearCuenta.style.display = 'block';
            contentCrearCuenta.classList.add('blur-in');
            btnEnviarCrearCuentaDisplay.style.display = 'block';
            btnEnviarCrearCuentaDisplay.classList.add('blur-in');
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
        btnEnviarCrearCuentaDisplay.classList.remove('blur-out', 'blur-in');
        btnEnviarIniciarSesionDisplay.classList.remove('blur-out', 'blur-in');

        contentCrearCuenta.classList.add('blur-out')
        btnEnviarCrearCuentaDisplay.classList.add('blur-out')
        contentCrearCuenta.addEventListener('animationend', () => {
            contentCrearCuenta.style.display = 'none';
            btnEnviarCrearCuentaDisplay.style.display = 'none'
            contentIniciarSesion.style.display = 'block';
            contentIniciarSesion.classList.add('blur-in');
            btnEnviarIniciarSesionDisplay.style.display = 'block';
            btnEnviarIniciarSesionDisplay.classList.add('blur-in');
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

document.getElementById("formCrearCuenta").addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que el formulario se envíe a crear_cuenta.php

    const form = e.target;
    const datos = new FormData(form);

    try {
        const resp = await fetch("crear_cuenta.php", {
            method: "POST",
            body: datos
        });

        const resultado = await resp.text();
        console.log("Respuesta del servidor:", resultado);

        switch (resultado.trim()) {
            case "OK":
                alert("Cuenta creada con éxito. Redirigiendo...");
                window.location.href = "dashboard.html";
                break;

            case "CORREO_EXISTE":
                alert("❌ Este correo ya está registrado.");
                break;

            case "FALTAN_DATOS":
                alert("⚠️ Por favor, completa todos los campos.");
                break;

            case "PIN_INVALIDO":
                alert("⚠️ El PIN debe tener exactamente 4 dígitos.");
                break;

            case "ERROR":
            default:
                alert("⚠️ Ocurrió un error inesperado. Intenta de nuevo.");
                break;
        }

    } catch (error) {
        console.error("Error en el fetch:", error);
        alert("❌ Error de conexión con el servidor.");
    }
});

document.getElementById("formIniciarSesion").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    let respuesta = await fetch("iniciar_sesion.php", {
        method: "POST",
        body: formData
    });

    let resultado = await respuesta.text();

    if (resultado === "OK") {
        window.location.href = "dashboard.html";
    } 
    else if (resultado === "NO_ENCONTRADO") {
        alert("❌ El correo no está registrado.");
    }
    else if (resultado === "CONTRASENA_INCORRECTA") {
        alert("❌ La contraseña es incorrecta.");
    }
    else {
        alert("⚠ Ocurrió un error inesperado.");
    }
});
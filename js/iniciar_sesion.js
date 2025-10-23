const defaultFile = "/recursos/img/usuario_predeterminado.png"

const file = document.getElementById("subirFoto");
const img = document.querySelector(".fotopreview");
file.addEventListener('change', e =>{
    if(e.target.files[0]){
        const reader = new FileReader();
        reader.onload = function(e){
            img.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }else{
        img.src = defaultFile;
    }
});
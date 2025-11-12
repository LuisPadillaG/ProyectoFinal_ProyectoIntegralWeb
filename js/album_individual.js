function IrDashboard(destino){
    // Guardamos que vista se quiere abrir
    localStorage.setItem("vistaDashboard", destino);
    // Regresamos al dashboard todo bonito
    window.location.href = "dashboard.html";
}

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
/**Btn modo oscuro */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnModo");
  const body = document.body;
  const imgIcono = btn.querySelector("img");

  if (!btn) return; // si no existe, salimos sin errores

  btn.addEventListener("click", () => {
    const activo = body.classList.toggle("modo-oscuro");

    localStorage.setItem("modoOscuro", activo ? "true" : "false");

    if(activo){
        imgIcono.src = 'recursos/img/moon_icon.png';
    } else {
        imgIcono.src = 'recursos/img/sun_icon.png';
    }
});
});



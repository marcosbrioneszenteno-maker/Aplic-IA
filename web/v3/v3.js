/* Opción 3: un solo buscador. Si parece un número de envío, abre el
   seguimiento; si no, busca la localidad. Usa las funciones de app.js. */
(function () {
  "use strict";
  const form = document.getElementById("form-uno");
  const input = document.getElementById("buscar-uno");
  const msg = document.getElementById("uno-msg");
  const esNumero = (v) => /^[\d\s\-\/.]{4,}$/.test(v) && /\d{4,}/.test(v.replace(/\D/g, ""));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    msg.className = "msg";
    if (!v) { input.setAttribute("aria-invalid", "true"); msg.textContent = "Escribí tu número de envío o tu localidad."; input.focus(); return; }
    input.removeAttribute("aria-invalid");
    if (esNumero(v)) { window.SITIO.seguir(v, msg); return; }
    const hit = window.SITIO.buscar(v);
    msg.textContent = hit ? "" : "No encontramos esa localidad. Mirá el mapa o escribinos por WhatsApp.";
    document.getElementById("cobertura").scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();

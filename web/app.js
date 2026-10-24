/* Lógica de la página: seguimiento, cobertura en el mapa, cotización.
   Sin dependencias. Lee EMPRESA, PROVINCIAS y COBERTURA de data.js. */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const E = window.EMPRESA, PROVS = window.PROVINCIAS, COB = window.COBERTURA;
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  const provById = Object.fromEntries(PROVS.map((p) => [p.id, p]));
  const conCobertura = PROVS.filter((p) => COB[p.id] && COB[p.id].localidades.length);
  const conDeposito = conCobertura.filter((p) => COB[p.id].deposito);
  const centroides = (() => { try { return JSON.parse($("#centroides").textContent); } catch (e) { return {}; } })();

  /* ---------- Datos de la empresa ---------- */
  if (E.esEjemplo) $("#aviso-borrador").hidden = false; else document.body.classList.add("final");
  $$("[data-empresa]").forEach((el) => (el.textContent = E.nombre));
  $$("[data-horario]").forEach((el) => (el.textContent = E.horario));
  $("#anio").textContent = new Date().getFullYear();
  const waBase = E.whatsapp ? "https://wa.me/" + E.whatsapp : "";
  if (waBase) {
    $$("[data-wa-link]").forEach((a) => { a.href = waBase; a.target = "_blank"; a.rel = "noopener"; });
    $$("[data-wa-text]").forEach((el) => { el.textContent = "+" + E.whatsapp; el.classList.remove("ph"); });
  }
  if (E.telefono) {
    $$("[data-tel-link]").forEach((a) => (a.href = "tel:" + E.telefono.replace(/[^\d+]/g, "")));
    $$("[data-tel-text]").forEach((el) => { el.textContent = E.telefono; el.classList.remove("ph"); });
  }
  if (E.email) {
    $$("[data-mail-link]").forEach((a) => (a.href = "mailto:" + E.email));
    $$("[data-mail-text]").forEach((el) => { el.textContent = E.email; el.classList.remove("ph"); });
  }

  /* ---------- Menú móvil ---------- */
  const toggle = $("#nav-toggle"), menu = $("#menu");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
  });
  menu.addEventListener("click", (e) => { if (e.target.tagName === "A") { toggle.setAttribute("aria-expanded", "false"); menu.classList.remove("is-open"); } });

  /* ---------- Seguimiento ---------- */
  $("#form-seguir").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#nro-seguimiento"), msg = $("#seg-msg");
    const n = input.value.trim();
    msg.className = "msg";
    if (!n) { input.setAttribute("aria-invalid", "true"); msg.textContent = "Escribí el número para consultarlo."; input.focus(); return; }
    input.removeAttribute("aria-invalid");
    if (!E.seguimientoUrl) { msg.textContent = "El seguimiento se conecta con el sistema de gestión de la empresa (pendiente)."; return; }
    window.open(E.seguimientoUrl.replace("{numero}", encodeURIComponent(n)), "_blank", "noopener");
    msg.textContent = "Abrimos el estado del envío en otra pestaña.";
  });

  /* ---------- Índice de localidades ---------- */
  const indice = [];
  conCobertura.forEach((p) => {
    indice.push({ texto: p.nombre, provId: p.id, tipo: "provincia" });
    COB[p.id].localidades.forEach((l) => indice.push({ texto: l, provId: p.id, tipo: "localidad" }));
  });
  const dl = $("#lista-localidades");
  indice.filter((i) => i.tipo === "localidad").forEach((i) => { const o = document.createElement("option"); o.value = i.texto + ", " + provById[i.provId].nombre; dl.appendChild(o); });

  /* ---------- Mapa ---------- */
  const svg = $("#mapa-hero svg");
  if (svg) {
    svg.classList.add("mapa");
    const NS = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(NS, "g");
    conCobertura.forEach((p) => {
      const path = svg.querySelector("#prov-" + p.id);
      const dep = COB[p.id].deposito;
      if (path) {
        path.classList.add(dep ? "is-dep" : "is-cov");
        path.setAttribute("tabindex", "0"); path.setAttribute("role", "button");
        path.setAttribute("aria-label", p.nombre + (dep ? ", con depósito" : ""));
        path.addEventListener("click", () => activar(p.id, true));
        path.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activar(p.id, true); } });
      }
      const c = centroides[p.id];
      if (!c || p.id === "02") return;
      if (dep) { const pin = document.createElementNS(NS, "circle"); pin.setAttribute("class", "pin"); pin.setAttribute("cx", c.x); pin.setAttribute("cy", c.y - 70); pin.setAttribute("r", 26); g.appendChild(pin); }
      const t = document.createElementNS(NS, "text");
      t.setAttribute("class", "lbl" + (dep ? " lbl--dep" : "")); t.setAttribute("x", c.x); t.setAttribute("y", c.y + (dep ? 60 : 20)); t.setAttribute("text-anchor", "middle");
      t.textContent = p.nombre;
      g.appendChild(t);
    });
    svg.appendChild(g);
  }

  /* ---------- Resultado de cobertura ---------- */
  const sel = $("#sel-prov");
  const o0 = document.createElement("option"); o0.value = ""; o0.textContent = "Ver otra provincia"; sel.appendChild(o0);
  conCobertura.forEach((p) => { const o = document.createElement("option"); o.value = p.id; o.textContent = p.nombre + (COB[p.id].deposito ? " · depósito" : ""); sel.appendChild(o); });
  sel.addEventListener("change", () => { if (sel.value) activar(sel.value, false); });

  function activar(id, scroll, destacar) {
    const p = provById[id], c = COB[id], d = c.deposito;
    if (svg) $$("path", svg).forEach((el) => el.classList.toggle("is-active", el.id === "prov-" + id));
    sel.value = id;
    $("#result-titulo").textContent = "Llegamos a " + p.nombre;
    $("#result-dep").innerHTML = d
      ? `<span class="dep-dot"></span>Depósito en ${d.localidad}: <small${E.esEjemplo ? ' class="ph"' : ""}>${d.direccion}, ${d.horario}</small>`
      : `Sin depósito en ${p.nombre}: entregamos puerta a puerta.`;
    const locs = c.localidades.slice().sort((a, b) => a.localeCompare(b, "es"));
    $("#result-locs").innerHTML = "Localidades: " + locs.map((l) => (destacar && norm(l) === norm(destacar) ? `<b>${l}</b>` : l)).join(", ") + ".";
    if (scroll && window.innerWidth < 1024) $("#result").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("#form-llegamos").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = norm($("#buscar-localidad").value.split(",")[0]);
    if (!q) { $("#buscar-localidad").focus(); return; }
    const hit = indice.find((i) => norm(i.texto) === q) || indice.find((i) => norm(i.texto).startsWith(q)) || indice.find((i) => norm(i.texto).includes(q));
    const title = $("#result-titulo");
    if (hit) {
      activar(hit.provId, true, hit.tipo === "localidad" ? hit.texto : null);
      if (hit.tipo === "localidad") title.textContent = "Sí, llegamos a " + hit.texto;
    } else {
      if (svg) $$("path", svg).forEach((el) => el.classList.remove("is-active"));
      sel.value = "";
      title.textContent = "No figura en nuestra lista";
      $("#result-dep").textContent = "Escribinos por WhatsApp: muchas veces coordinamos igual.";
      $("#result-locs").textContent = "";
      if (window.innerWidth < 1024) $("#result").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  if (conDeposito.length) activar(conDeposito[0].id, false);

  /* ---------- Depósitos en el pie ---------- */
  const deps = $("#deps-contacto");
  conDeposito.forEach((p) => {
    const d = COB[p.id].deposito, li = document.createElement("li");
    const ph = E.esEjemplo ? ' class="ph"' : "";
    li.innerHTML = `<strong>${d.localidad}, ${p.nombre}</strong><span${ph}>${d.direccion}</span> · <span${ph}>${d.horario}</span>` + (d.telefono ? ` · <a href="tel:${d.telefono.replace(/[^\d+]/g, "")}">${d.telefono}</a>` : "");
    deps.appendChild(li);
  });

  /* ---------- Cotizar por WhatsApp ---------- */
  $("#form-cotizar").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, msg = $("#cot-msg");
    let ok = true;
    ["origen", "destino"].forEach((k) => {
      const input = f[k], err = $("#err-" + k);
      if (!input.value.trim()) { ok = false; input.setAttribute("aria-invalid", "true"); err.textContent = "Completá " + (k === "origen" ? "el origen." : "el destino."); }
      else { input.removeAttribute("aria-invalid"); err.textContent = ""; }
    });
    if (!ok) { f.querySelector('[aria-invalid="true"]').focus(); return; }
    const texto = `Hola, quiero cotizar un envío.\nOrigen: ${f.origen.value.trim()}\nDestino: ${f.destino.value.trim()}\nQué envío: ${f.tipo.value}\nPeso aprox.: ${f.peso.value.trim() || "a confirmar"}` + (f.detalle.value.trim() ? `\nDetalle: ${f.detalle.value.trim()}` : "");
    msg.className = "msg";
    if (!waBase) { msg.textContent = "El número de WhatsApp se configura con los datos de la empresa. Mensaje listo: " + texto.replace(/\n/g, " · "); return; }
    window.open(waBase + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
    msg.textContent = "Abrimos WhatsApp con tu consulta.";
  });
})();

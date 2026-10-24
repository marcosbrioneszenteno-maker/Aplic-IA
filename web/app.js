/* Lógica de la página: pestañas, seguimiento, cobertura, cotización.
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

  /* ---------- Datos de la empresa en la página ---------- */
  if (E.esEjemplo) $("#aviso-borrador").hidden = false;
  else document.body.classList.add("final");
  $$("[data-empresa]").forEach((el) => (el.textContent = E.nombre));
  $$("[data-n-provincias]").forEach((el) => (el.textContent = conCobertura.length));
  $$("[data-n-depositos]").forEach((el) => (el.textContent = conDeposito.length));
  const nLoc = conCobertura.reduce((n, p) => n + COB[p.id].localidades.length, 0);
  $$("[data-n-localidades]").forEach((el) => (el.textContent = nLoc));
  $$("[data-horario]").forEach((el) => (el.textContent = E.horario));
  $$("[data-seg-etiqueta]").forEach((el) => (el.textContent = E.seguimientoEtiqueta));
  if (E.aniosEnRubro) $$("[data-anios]").forEach((el) => { el.textContent = E.aniosEnRubro; el.classList.remove("ph"); });
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
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { toggle.setAttribute("aria-expanded", "false"); menu.classList.remove("is-open"); }
  });

  /* ---------- Pestañas del panel ---------- */
  const tabs = $$(".tab");
  function selectTab(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => selectTab(t));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        selectTab(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]);
      }
    });
  });

  /* ---------- Seguimiento ---------- */
  $("#pane-seguir").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#nro-seguimiento"), msg = $("#seg-msg");
    const n = input.value.trim();
    msg.className = "msg";
    if (!n) { input.setAttribute("aria-invalid", "true"); msg.textContent = "Escribí el número para consultarlo."; input.focus(); return; }
    input.removeAttribute("aria-invalid");
    if (!E.seguimientoUrl) {
      msg.textContent = "El seguimiento se conecta con el sistema de gestión de la empresa (pendiente de configurar).";
      return;
    }
    window.open(E.seguimientoUrl.replace("{numero}", encodeURIComponent(n)), "_blank", "noopener");
    msg.textContent = "Abrimos el estado del envío en otra pestaña.";
  });

  /* ---------- Buscador "¿llegamos?" ---------- */
  const indice = []; // { texto, provId, tipo }
  conCobertura.forEach((p) => {
    indice.push({ texto: p.nombre, provId: p.id, tipo: "provincia" });
    COB[p.id].localidades.forEach((l) => indice.push({ texto: l, provId: p.id, tipo: "localidad" }));
  });
  const dl = $("#lista-localidades");
  indice.filter((i) => i.tipo === "localidad").forEach((i) => {
    const o = document.createElement("option"); o.value = i.texto + ", " + provById[i.provId].nombre; dl.appendChild(o);
  });
  $("#pane-llegamos").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = norm($("#buscar-localidad").value.split(",")[0]);
    const msg = $("#llegamos-msg");
    msg.className = "msg";
    if (!q) { msg.textContent = "Escribí una localidad o provincia."; return; }
    const hit = indice.find((i) => norm(i.texto) === q) || indice.find((i) => norm(i.texto).startsWith(q)) || indice.find((i) => norm(i.texto).includes(q));
    if (hit) {
      const p = provById[hit.provId];
      const dep = COB[p.id].deposito;
      msg.classList.add("msg--ok");
      msg.textContent = hit.tipo === "localidad"
        ? `Sí, llegamos a ${hit.texto} (${p.nombre}).` + (dep ? ` Depósito más cercano: ${dep.localidad}.` : "")
        : `Sí, llegamos a ${p.nombre}.` + (dep ? ` Tenemos depósito en ${dep.localidad}.` : "");
      activar(p.id, false);
    } else {
      msg.classList.add("msg--no");
      msg.textContent = "No figura en nuestra lista. Escribinos por WhatsApp: muchas veces coordinamos igual.";
    }
  });

  /* ---------- Mapa ---------- */
  const mapaHero = $("#mapa-hero svg");
  if (mapaHero) {
    mapaHero.classList.add("mapa");
    conCobertura.forEach((p) => {
      const path = mapaHero.querySelector("#prov-" + p.id);
      if (!path) return;
      path.classList.add(COB[p.id].deposito ? "is-dep" : "is-cov");
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", p.nombre + (COB[p.id].deposito ? ", con depósito" : ""));
      path.addEventListener("click", () => activar(p.id, true));
      path.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activar(p.id, true); } });
    });
  }

  /* ---------- Chips, localidades y depósito ---------- */
  const chips = $("#chips");
  PROVS.forEach((p) => {
    const c = COB[p.id];
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.id = p.id; b.setAttribute("role", "listitem");
    b.textContent = p.nombre;
    if (c && c.localidades.length) {
      b.setAttribute("aria-pressed", "false");
      if (c.deposito) { const d = document.createElement("i"); d.className = "dot dot--dep"; d.title = "Con depósito"; b.appendChild(d); }
      b.addEventListener("click", () => activar(p.id, false));
    } else {
      b.classList.add("chip--off"); b.disabled = true; b.title = "Sin cobertura por ahora";
    }
    chips.appendChild(b);
  });

  let activa = null;
  function activar(id, scroll) {
    activa = id;
    $$(".chip[aria-pressed]").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.id === id)));
    if (mapaHero) $$("path", mapaHero).forEach((p) => p.classList.toggle("is-active", p.id === "prov-" + id));
    $("#filtro-localidad").value = "";
    renderLocs();
    renderDep();
    if (scroll) $("#cobertura").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderLocs() {
    const ul = $("#locs"), t = $("#cob-prov-titulo");
    ul.innerHTML = "";
    if (!activa) { t.textContent = "Localidades"; ul.innerHTML = '<li class="empty">Elegí una provincia para ver sus localidades.</li>'; return; }
    const p = provById[activa], c = COB[activa];
    t.textContent = "Localidades en " + p.nombre + (c.localidades.length ? " (" + c.localidades.length + ")" : "");
    const f = norm($("#filtro-localidad").value);
    const list = c.localidades.filter((l) => !f || norm(l).includes(f)).sort((a, b) => a.localeCompare(b, "es"));
    if (!list.length) { ul.innerHTML = '<li class="empty">Ninguna localidad coincide con el filtro.</li>'; return; }
    list.forEach((l) => {
      const li = document.createElement("li"); li.textContent = l;
      if (c.deposito && norm(c.deposito.localidad) === norm(l)) li.classList.add("is-dep");
      ul.appendChild(li);
    });
  }
  function renderDep() {
    const box = $("#dep");
    if (!activa) { box.innerHTML = '<div class="dep-card dep-card--none"><h3>Depósito</h3><p>Al elegir una provincia te mostramos el depósito más cercano, con dirección y horario.</p></div>'; return; }
    const p = provById[activa], d = COB[activa].deposito;
    if (!d) { box.innerHTML = `<div class="dep-card dep-card--none"><h3>Sin depósito en ${p.nombre}</h3><p>Entregamos puerta a puerta y coordinamos el retiro. Consultanos por WhatsApp.</p></div>`; return; }
    const ph = E.esEjemplo ? ' class="ph"' : "";
    box.innerHTML = `<div class="dep-card"><h3><i class="dot dot--dep"></i>Depósito en ${d.localidad}</h3>
      <dl><dt>Dirección</dt><dd${ph}>${d.direccion}</dd><dt>Horario</dt><dd${ph}>${d.horario}</dd>
      <dt>Teléfono</dt><dd>${d.telefono ? `<a href="tel:${d.telefono.replace(/[^\d+]/g, "")}">${d.telefono}</a>` : '<span class="ph">A confirmar</span>'}</dd></dl></div>`;
  }
  $("#filtro-localidad").addEventListener("input", renderLocs);
  if (conDeposito.length) activar(conDeposito[0].id, false); else { renderLocs(); renderDep(); }

  // Depósitos en contacto
  const deps = $("#deps-contacto");
  conDeposito.forEach((p) => {
    const d = COB[p.id].deposito, li = document.createElement("li");
    const ph = E.esEjemplo ? ' class="ph"' : "";
    li.innerHTML = `<svg class="ico" aria-hidden="true"><use href="#i-warehouse"/></svg><div><strong>${d.localidad}, ${p.nombre}</strong><span${ph}>${d.direccion}</span><br><span${ph}>${d.horario}</span></div>`;
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

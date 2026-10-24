/*
  Datos de la empresa. Es el ÚNICO archivo que hay que tocar para actualizar
  provincias, depósitos, localidades y contacto.

  ESTADO: BORRADOR CON DATOS DE EJEMPLO. Todo lo marcado con "ejemplo" se
  reemplaza con la información que manda Victoria.
*/
window.EMPRESA = {
  nombre: "Nombre de la empresa", // ejemplo
  esEjemplo: true,
  whatsapp: "", // ejemplo: "5491122334455" (código de país + área + número, sin + ni espacios)
  telefono: "", // ejemplo: "0351 422-0000"
  email: "", // ejemplo: "ventas@empresa.com.ar"
  horario: "Lunes a viernes de 8 a 18 h", // ejemplo
  // URL del seguimiento del sistema de gestión. {numero} se reemplaza por lo que
  // escribe el cliente. Vacío hasta que Victoria pase el link.
  seguimientoUrl: "",
  seguimientoEtiqueta: "número de remito o guía", // ejemplo
  aniosEnRubro: "", // ejemplo: "18"
  unidades: "", // ejemplo: "25"
};

// Las 24 jurisdicciones, con el id oficial del IGN (coincide con el mapa).
window.PROVINCIAS = [
  { id: "06", nombre: "Buenos Aires" },
  { id: "10", nombre: "Catamarca" },
  { id: "22", nombre: "Chaco" },
  { id: "26", nombre: "Chubut" },
  { id: "02", nombre: "Ciudad de Buenos Aires" },
  { id: "14", nombre: "Córdoba" },
  { id: "18", nombre: "Corrientes" },
  { id: "30", nombre: "Entre Ríos" },
  { id: "34", nombre: "Formosa" },
  { id: "38", nombre: "Jujuy" },
  { id: "42", nombre: "La Pampa" },
  { id: "46", nombre: "La Rioja" },
  { id: "50", nombre: "Mendoza" },
  { id: "54", nombre: "Misiones" },
  { id: "58", nombre: "Neuquén" },
  { id: "62", nombre: "Río Negro" },
  { id: "66", nombre: "Salta" },
  { id: "70", nombre: "San Juan" },
  { id: "74", nombre: "San Luis" },
  { id: "78", nombre: "Santa Cruz" },
  { id: "82", nombre: "Santa Fe" },
  { id: "86", nombre: "Santiago del Estero" },
  { id: "94", nombre: "Tierra del Fuego" },
  { id: "90", nombre: "Tucumán" },
];

// Cobertura: por provincia, si hay depósito y qué localidades se atienden.
// DATOS DE EJEMPLO para mostrar cómo funciona. Reemplazar con la lista real.
window.COBERTURA = {
  "14": {
    deposito: {
      direccion: "Dirección del depósito (ejemplo)",
      localidad: "Córdoba",
      horario: "Lunes a viernes de 8 a 17 h (ejemplo)",
      telefono: "",
    },
    localidades: ["Córdoba", "Villa María", "Río Cuarto", "San Francisco", "Villa Carlos Paz", "Jesús María", "Alta Gracia", "Bell Ville", "Marcos Juárez", "Río Tercero"],
  },
  "06": {
    deposito: {
      direccion: "Dirección del depósito (ejemplo)",
      localidad: "Buenos Aires",
      horario: "Lunes a viernes de 8 a 17 h (ejemplo)",
      telefono: "",
    },
    localidades: ["La Plata", "Mar del Plata", "Bahía Blanca", "Tandil", "Pergamino", "Junín", "Olavarría", "Azul", "San Nicolás", "Zárate", "Campana", "Luján"],
  },
  "02": {
    deposito: null,
    localidades: ["Ciudad de Buenos Aires"],
  },
  "82": {
    deposito: null,
    localidades: ["Rosario", "Santa Fe", "Rafaela", "Venado Tuerto", "Reconquista", "Esperanza"],
  },
  "50": {
    deposito: {
      direccion: "Dirección del depósito (ejemplo)",
      localidad: "Mendoza",
      horario: "Lunes a viernes de 8 a 17 h (ejemplo)",
      telefono: "",
    },
    localidades: ["Mendoza", "San Rafael", "San Martín", "Tunuyán", "Malargüe", "General Alvear"],
  },
  "74": {
    deposito: null,
    localidades: ["San Luis", "Villa Mercedes", "Merlo"],
  },
};

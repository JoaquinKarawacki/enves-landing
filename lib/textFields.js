// Recorta y sanea texto que viene de formularios públicos o del panel admin,
// para no guardar/mostrar payloads gigantes ni valores que no son texto.
export function limitarTexto(valor, max) {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, max);
}

export function esUrlSegura(valor) {
  if (!valor) return true;
  try {
    const url = new URL(valor);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

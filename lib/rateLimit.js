// Límite simple en memoria por IP. No sobrevive a instancias frías de Vercel
// ni se comparte entre regiones, pero frena scripts básicos de fuerza bruta o
// spam sin necesitar una base de datos externa.
const intentos = new Map();
const VENTANA_MS = 60_000;

export function estaLimitado(clave, maximo) {
  const ahora = Date.now();
  const recientes = (intentos.get(clave) || []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  intentos.set(clave, recientes);
  return recientes.length > maximo;
}

export function claveCliente(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

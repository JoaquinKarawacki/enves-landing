import { timingSafeEqual } from "crypto";

function compararSeguro(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function validarToken(request) {
  const token = request.headers.get("x-admin-token");
  const esperado = process.env.ADMIN_TOKEN;
  if (!token || !esperado) return false;
  return compararSeguro(token, esperado);
}

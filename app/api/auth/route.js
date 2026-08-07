import { validarToken } from "@/lib/adminAuth";
import { estaLimitado, claveCliente } from "@/lib/rateLimit";

export async function POST(request) {
  if (estaLimitado(`auth:${claveCliente(request)}`, 10)) {
    return Response.json({ error: "Demasiados intentos, esperá un minuto" }, { status: 429 });
  }
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  return Response.json({ ok: true });
}

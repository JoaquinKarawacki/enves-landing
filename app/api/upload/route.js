import { saveUpload } from "@/lib/storage";
import { validarToken } from "@/lib/adminAuth";
import { estaLimitado, claveCliente } from "@/lib/rateLimit";
import { detectarTipoArchivo, IMAGE_TYPES, CONTENT_TYPES } from "@/lib/fileValidation";

const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request) {
  if (estaLimitado(`upload:${claveCliente(request)}`, 20)) {
    return Response.json({ error: "Demasiadas solicitudes, esperá un minuto" }, { status: 429 });
  }
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const tipoEsperado = formData.get("tipo") === "pdf" ? "pdf" : "imagen";
  if (!file || typeof file === "string") {
    return Response.json({ error: "Falta el archivo" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "El archivo no puede superar los 10MB" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const tipoReal = detectarTipoArchivo(buffer);
  const esValido = tipoEsperado === "pdf" ? tipoReal === "pdf" : IMAGE_TYPES.includes(tipoReal);
  if (!esValido) {
    return Response.json(
      { error: tipoEsperado === "pdf" ? "El archivo no es un PDF válido" : "El archivo no es una imagen válida" },
      { status: 400 }
    );
  }

  const url = await saveUpload(buffer, file.name, CONTENT_TYPES[tipoReal]);
  return Response.json({ url }, { status: 201 });
}

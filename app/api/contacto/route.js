import { Resend } from "resend";
import { estaLimitado, claveCliente } from "@/lib/rateLimit";
import { limitarTexto } from "@/lib/textFields";
import { detectarTipoArchivo } from "@/lib/fileValidation";

const RECIPIENTS = ["contacto@enves.com.uy", "Ldeleon@enves.com.uy", "Scolistro@enves.com.uy"];
const FROM = "Envés Seguros <contacto@enves.com.uy>";
const MAX_CV_SIZE = 5 * 1024 * 1024;

export async function POST(request) {
  if (estaLimitado(`contacto:${claveCliente(request)}`, 5)) {
    return Response.json({ error: "Demasiadas solicitudes, esperá un minuto" }, { status: 429 });
  }

  const formData = await request.formData();

  // Campo trampa: invisible para personas, los bots que autocompletan formularios
  // suelen llenarlo. Si viene con contenido, descartamos en silencio.
  if (formData.get("sitio_web")) {
    return Response.json({ ok: true });
  }

  const tipo = formData.get("tipo") === "cv" ? "cv" : "consulta";
  const nombre = limitarTexto(formData.get("nombre"), 120);
  const email = limitarTexto(formData.get("email"), 200);
  const telefono = limitarTexto(formData.get("telefono"), 40);
  const rubro = limitarTexto(formData.get("rubro"), 60);
  const mensaje = limitarTexto(formData.get("mensaje"), 3000);

  if (!nombre || !email) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }

  const lines = [`Nombre: ${nombre}`];
  if (telefono) lines.push(`Teléfono: ${telefono}`);
  lines.push(`Email: ${email}`);
  if (rubro) lines.push(`Rubro de interés: ${rubro}`);
  if (mensaje) lines.push(`Mensaje: ${mensaje}`);

  const attachments = [];
  const cv = formData.get("cv");
  if (cv && typeof cv !== "string") {
    if (cv.size > MAX_CV_SIZE) {
      return Response.json({ error: "El CV no puede superar los 5MB" }, { status: 400 });
    }
    const buffer = Buffer.from(await cv.arrayBuffer());
    if (detectarTipoArchivo(buffer) !== "pdf") {
      return Response.json({ error: "El CV tiene que ser un PDF válido" }, { status: 400 });
    }
    attachments.push({ filename: "cv.pdf", content: buffer });
  }

  const subject = tipo === "cv" ? `Nuevo CV recibido — ${nombre}` : "Nueva consulta desde la web";

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: RECIPIENTS,
    replyTo: email,
    subject,
    text: lines.join("\n"),
    attachments,
  });

  if (error) {
    console.error(error);
    return Response.json({ error: "No se pudo enviar el mail" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

import { Resend } from "resend";

const RECIPIENTS = ["contacto@enves.com.uy", "Ldeleon@enves.com.uy", "Scolistro@enves.com.uy"];
const FROM = "Envés Seguros <contacto@enves.com.uy>";
const MAX_CV_SIZE = 5 * 1024 * 1024;

export async function POST(request) {
  const formData = await request.formData();
  const tipo = formData.get("tipo") === "cv" ? "cv" : "consulta";
  const nombre = formData.get("nombre")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const telefono = formData.get("telefono")?.toString().trim();
  const rubro = formData.get("rubro")?.toString().trim();
  const mensaje = formData.get("mensaje")?.toString().trim();

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
    attachments.push({ filename: cv.name, content: buffer });
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

import { readData, writeData, deleteUpload } from "@/lib/storage";
import { ordenarPromociones, generarSlug } from "@/lib/promociones";
import { validarToken } from "@/lib/adminAuth";
import { estaLimitado, claveCliente } from "@/lib/rateLimit";
import { limitarTexto, esUrlSegura } from "@/lib/textFields";

export async function GET() {
  const promociones = await readData("promociones", []);
  return Response.json(ordenarPromociones(promociones));
}

export async function POST(request) {
  if (estaLimitado(`promo-write:${claveCliente(request)}`, 20)) {
    return Response.json({ error: "Demasiadas solicitudes, esperá un minuto" }, { status: 429 });
  }
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const item = await request.json();
  const aseguradora = limitarTexto(item.aseguradora, 80);
  const titulo = limitarTexto(item.titulo, 160);
  const resumen = limitarTexto(item.resumen, 300);
  const descripcion = limitarTexto(item.descripcion, 5000);
  const condicionesUrl = limitarTexto(item.condicionesUrl, 500);
  const vigenciaHasta = limitarTexto(item.vigenciaHasta, 60);
  const imagen = limitarTexto(item.imagen, 500);

  if (!aseguradora || !titulo || !resumen || !descripcion) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }
  if (!esUrlSegura(condicionesUrl)) {
    return Response.json({ error: "El link de condiciones no es válido" }, { status: 400 });
  }

  const promociones = await readData("promociones", []);
  const slug = generarSlug(titulo);
  if (promociones.some((p) => p.slug === slug)) {
    return Response.json({ error: "Ya existe una promoción con ese título" }, { status: 400 });
  }

  const nueva = {
    id: Date.now(),
    slug,
    href: `/promociones/${slug}`,
    aseguradora,
    titulo,
    resumen,
    descripcion,
    imagen,
    condicionesUrl,
    vigenciaHasta,
  };
  promociones.unshift(nueva);
  await writeData("promociones", promociones);
  return Response.json(nueva, { status: 201 });
}

export async function DELETE(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  const promociones = await readData("promociones", []);
  const item = promociones.find((p) => p.id === id);
  if (!item) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }
  await deleteUpload(item.imagen);
  await writeData("promociones", promociones.filter((p) => p.id !== id));
  return Response.json({ ok: true });
}

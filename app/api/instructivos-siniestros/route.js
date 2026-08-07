import { readData, writeData, deleteUpload } from "@/lib/storage";
import { ordenarInstructivos, generarSlug } from "@/lib/instructivosSiniestros";
import { validarToken } from "@/lib/adminAuth";
import { estaLimitado, claveCliente } from "@/lib/rateLimit";
import { limitarTexto, esUrlSegura } from "@/lib/textFields";

const RECURSO = "instructivos-siniestros";

export async function GET() {
  const items = await readData(RECURSO, []);
  return Response.json(ordenarInstructivos(items));
}

export async function POST(request) {
  if (estaLimitado(`instructivo-write:${claveCliente(request)}`, 20)) {
    return Response.json({ error: "Demasiadas solicitudes, esperá un minuto" }, { status: 429 });
  }
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const item = await request.json();
  const aseguradora = limitarTexto(item.aseguradora, 80);
  const titulo = limitarTexto(item.titulo, 160);
  const descripcion = limitarTexto(item.descripcion, 5000);
  const archivo = limitarTexto(item.archivo, 500);

  if (!aseguradora || !titulo || !descripcion || !archivo) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }
  if (!esUrlSegura(archivo)) {
    return Response.json({ error: "El archivo no es válido" }, { status: 400 });
  }

  const items = await readData(RECURSO, []);
  const slug = generarSlug(titulo);
  if (items.some((i) => i.slug === slug)) {
    return Response.json({ error: "Ya existe una publicación con ese título" }, { status: 400 });
  }

  const nuevo = {
    id: Date.now(),
    slug,
    href: `/instructivos-siniestros/${slug}`,
    aseguradora,
    titulo,
    descripcion,
    archivo,
  };
  items.unshift(nuevo);
  await writeData(RECURSO, items);
  return Response.json(nuevo, { status: 201 });
}

export async function DELETE(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  const items = await readData(RECURSO, []);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }
  await deleteUpload(item.archivo);
  await writeData(RECURSO, items.filter((i) => i.id !== id));
  return Response.json({ ok: true });
}

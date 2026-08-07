import { readData, writeData } from "@/lib/storage";
import { ordenarInstructivos, generarSlug } from "@/lib/instructivosSiniestros";

const RECURSO = "instructivos-siniestros";

function validarToken(request) {
  const token = request.headers.get("x-admin-token");
  return !!token && token === process.env.ADMIN_TOKEN;
}

export async function GET() {
  const items = await readData(RECURSO, []);
  return Response.json(ordenarInstructivos(items));
}

export async function POST(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const item = await request.json();
  const { aseguradora, titulo, descripcion, archivo } = item;
  if (!aseguradora || !titulo || !descripcion || !archivo) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
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
  if (!items.some((i) => i.id === id)) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }
  await writeData(RECURSO, items.filter((i) => i.id !== id));
  return Response.json({ ok: true });
}

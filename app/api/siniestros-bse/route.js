import { readData, writeData } from "@/lib/storage";
import { ordenarSiniestrosBse, generarSlug } from "@/lib/siniestrosBse";

function validarToken(request) {
  const token = request.headers.get("x-admin-token");
  return !!token && token === process.env.ADMIN_TOKEN;
}

export async function GET() {
  const items = await readData("siniestros-bse", []);
  return Response.json(ordenarSiniestrosBse(items));
}

export async function POST(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const item = await request.json();
  const { titulo, descripcion, archivo } = item;
  if (!titulo || !descripcion || !archivo) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }

  const items = await readData("siniestros-bse", []);
  const slug = generarSlug(titulo);
  if (items.some((i) => i.slug === slug)) {
    return Response.json({ error: "Ya existe una publicación con ese título" }, { status: 400 });
  }

  const nuevo = {
    id: Date.now(),
    slug,
    href: `/siniestros-bse/${slug}`,
    titulo,
    descripcion,
    archivo,
  };
  items.unshift(nuevo);
  await writeData("siniestros-bse", items);
  return Response.json(nuevo, { status: 201 });
}

export async function DELETE(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  const items = await readData("siniestros-bse", []);
  if (!items.some((i) => i.id === id)) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }
  await writeData("siniestros-bse", items.filter((i) => i.id !== id));
  return Response.json({ ok: true });
}

import { readData, writeData } from "@/lib/storage";
import { ordenarPromociones, generarSlug } from "@/lib/promociones";

function validarToken(request) {
  const token = request.headers.get("x-admin-token");
  return !!token && token === process.env.ADMIN_TOKEN;
}

export async function GET() {
  const promociones = await readData("promociones", []);
  return Response.json(ordenarPromociones(promociones));
}

export async function POST(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const item = await request.json();
  const { aseguradora, titulo, resumen, descripcion } = item;
  if (!aseguradora || !titulo || !resumen || !descripcion) {
    return Response.json({ error: "Faltan datos obligatorios" }, { status: 400 });
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
    imagen: item.imagen || "",
    condicionesUrl: item.condicionesUrl || "",
    vigenciaHasta: item.vigenciaHasta || "",
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
  if (!promociones.some((p) => p.id === id)) {
    return Response.json({ error: "No encontrado" }, { status: 404 });
  }
  await writeData("promociones", promociones.filter((p) => p.id !== id));
  return Response.json({ ok: true });
}

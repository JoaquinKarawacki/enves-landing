import { saveUpload } from "@/lib/storage";

function validarToken(request) {
  const token = request.headers.get("x-admin-token");
  return !!token && token === process.env.ADMIN_TOKEN;
}

export async function POST(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return Response.json({ error: "Falta el archivo" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await saveUpload(buffer, file.name, file.type);
  return Response.json({ url }, { status: 201 });
}

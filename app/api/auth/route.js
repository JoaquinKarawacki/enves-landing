function validarToken(request) {
  const token = request.headers.get("x-admin-token");
  return !!token && token === process.env.ADMIN_TOKEN;
}

export async function POST(request) {
  if (!validarToken(request)) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }
  return Response.json({ ok: true });
}

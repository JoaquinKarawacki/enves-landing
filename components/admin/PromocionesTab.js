"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { aseguradora: "", titulo: "", resumen: "", descripcion: "", condicionesUrl: "", vigenciaHasta: "" };

export default function PromocionesTab({ token }) {
  const [promociones, setPromociones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/promociones");
    setPromociones(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Falta la imagen");
      return;
    }
    setSubmitting(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-token": token },
        body: uploadData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.error || "No se pudo subir la imagen");

      const createRes = await fetch("/api/promociones", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ ...form, imagen: uploadJson.url }),
      });
      const createJson = await createRes.json();
      if (!createRes.ok) throw new Error(createJson.error || "No se pudo crear la promoción");

      setForm(EMPTY_FORM);
      setFile(null);
      e.target.reset();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta promoción?")) return;
    await fetch("/api/promociones", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.h2}>Nueva promoción</h2>
        <div style={styles.row}>
          <label style={styles.label}>
            Aseguradora
            <input
              style={styles.input}
              required
              value={form.aseguradora}
              onChange={(e) => updateField("aseguradora", e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Vigencia hasta (opcional)
            <input
              style={styles.input}
              placeholder="31/12/2026"
              value={form.vigenciaHasta}
              onChange={(e) => updateField("vigenciaHasta", e.target.value)}
            />
          </label>
        </div>
        <label style={styles.label}>
          Título
          <input style={styles.input} required value={form.titulo} onChange={(e) => updateField("titulo", e.target.value)} />
        </label>
        <label style={styles.label}>
          Resumen (para la tarjeta del listado)
          <input
            style={styles.input}
            required
            value={form.resumen}
            onChange={(e) => updateField("resumen", e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Descripción completa (para la página de la promoción)
          <textarea
            style={{ ...styles.input, minHeight: 100, resize: "vertical" }}
            required
            value={form.descripcion}
            onChange={(e) => updateField("descripcion", e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Link a condiciones completas (opcional)
          <input
            style={styles.input}
            placeholder="https://..."
            value={form.condicionesUrl}
            onChange={(e) => updateField("condicionesUrl", e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Imagen
          <input style={styles.input} type="file" accept="image/*" required onChange={(e) => setFile(e.target.files[0])} />
        </label>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={submitting} style={styles.button}>
          {submitting ? "Guardando..." : "Publicar promoción"}
        </button>
      </form>

      <h2 style={styles.h2}>Promociones publicadas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : promociones.length === 0 ? (
        <p style={{ color: "#666" }}>Todavía no hay promociones.</p>
      ) : (
        <ul style={styles.list}>
          {promociones.map((p) => (
            <li key={p.id} style={styles.listItem}>
              <img src={p.imagen} alt={p.titulo} style={styles.thumb} />
              <div style={{ flex: 1 }}>
                <strong>{p.titulo}</strong>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {p.aseguradora} ·{" "}
                  <a href={p.href} target="_blank" rel="noopener">
                    {p.href}
                  </a>
                </div>
              </div>
              <button onClick={() => handleDelete(p.id)} style={styles.deleteButton}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    padding: "1.5rem",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  h2: { fontSize: "1.05rem", margin: "0 0 0.5rem" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" },
  label: { display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 600, color: "#333" },
  input: {
    padding: "0.55rem 0.7rem",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: "0.95rem",
    fontWeight: 400,
    fontFamily: "inherit",
  },
  error: { color: "#c0392b", margin: 0, fontSize: "0.9rem" },
  button: {
    alignSelf: "flex-start",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: 4,
    background: "#f39236",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    padding: "0.75rem 1rem",
  },
  thumb: { width: 56, height: 56, objectFit: "cover", borderRadius: 6, flexShrink: 0 },
  deleteButton: {
    padding: "0.4rem 0.8rem",
    border: "1px solid #c0392b",
    borderRadius: 4,
    background: "#fff",
    color: "#c0392b",
    cursor: "pointer",
  },
};

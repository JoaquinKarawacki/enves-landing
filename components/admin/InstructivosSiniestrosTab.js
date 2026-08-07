"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { aseguradora: "", titulo: "", descripcion: "" };
const MAX_PDF_SIZE = 10 * 1024 * 1024;

export default function InstructivosSiniestrosTab({ token }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/instructivos-siniestros");
    setItems(await res.json());
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
      setError("Falta el PDF");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("El archivo tiene que ser un PDF");
      return;
    }
    if (file.size > MAX_PDF_SIZE) {
      setError("El PDF no puede superar los 10MB");
      return;
    }
    setSubmitting(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("tipo", "pdf");
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-token": token },
        body: uploadData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.error || "No se pudo subir el PDF");

      const createRes = await fetch("/api/instructivos-siniestros", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ ...form, archivo: uploadJson.url }),
      });
      const createJson = await createRes.json();
      if (!createRes.ok) throw new Error(createJson.error || "No se pudo publicar el instructivo");

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
    if (!confirm("¿Eliminar este instructivo?")) return;
    await fetch("/api/instructivos-siniestros", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id }),
    });
    await load();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.h2}>Nuevo instructivo de siniestros</h2>
        <label style={styles.label}>
          Aseguradora
          <input
            style={styles.input}
            required
            placeholder="BSE, Mapfre, Sura..."
            value={form.aseguradora}
            onChange={(e) => updateField("aseguradora", e.target.value)}
          />
        </label>
        <label style={styles.label}>
          Título
          <input style={styles.input} required value={form.titulo} onChange={(e) => updateField("titulo", e.target.value)} />
        </label>
        <label style={styles.label}>
          Texto explicativo (para compartir con el cliente)
          <textarea
            style={{ ...styles.input, minHeight: 120, resize: "vertical" }}
            required
            value={form.descripcion}
            onChange={(e) => updateField("descripcion", e.target.value)}
          />
        </label>
        <label style={styles.label}>
          PDF (máx. 10MB)
          <input style={styles.input} type="file" accept="application/pdf" required onChange={(e) => setFile(e.target.files[0])} />
        </label>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={submitting} style={styles.button}>
          {submitting ? "Guardando..." : "Publicar instructivo"}
        </button>
      </form>

      <h2 style={styles.h2}>Instructivos publicados</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#666" }}>Todavía no hay instructivos.</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <div style={{ flex: 1 }}>
                <strong>{item.titulo}</strong>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {item.aseguradora} ·{" "}
                  <a href={item.href} target="_blank" rel="noopener">
                    {item.href}
                  </a>
                </div>
              </div>
              <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>
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
  deleteButton: {
    padding: "0.4rem 0.8rem",
    border: "1px solid #c0392b",
    borderRadius: 4,
    background: "#fff",
    color: "#c0392b",
    cursor: "pointer",
  },
};

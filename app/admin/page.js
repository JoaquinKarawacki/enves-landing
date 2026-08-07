"use client";

import { useEffect, useState } from "react";
import PromocionesTab from "@/components/admin/PromocionesTab";
import InstructivosSiniestrosTab from "@/components/admin/InstructivosSiniestrosTab";

// Cada feature futura agrega su propia entrada acá:
// { key, label, render: (token) => <Componente token={token} /> }
const TABS = [
  { key: "promociones", label: "Promociones", render: (token) => <PromocionesTab token={token} /> },
  { key: "instructivos-siniestros", label: "Instructivos de Siniestros", render: (token) => <InstructivosSiniestrosTab token={token} /> },
];

async function verify(token) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "x-admin-token": token },
  });
  return res.ok;
}

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(TABS[0]?.key ?? null);

  useEffect(() => {
    const stored = sessionStorage.getItem("adminToken");
    if (!stored) {
      setChecking(false);
      return;
    }
    verify(stored).then((ok) => {
      if (ok) setToken(stored);
      else sessionStorage.removeItem("adminToken");
      setChecking(false);
    });
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const ok = await verify(input);
    if (!ok) {
      setError("Token incorrecto");
      return;
    }
    sessionStorage.setItem("adminToken", input);
    setToken(input);
  }

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    setToken(null);
    setInput("");
  }

  if (checking) return null;

  if (!token) {
    return (
      <div style={styles.loginWrap}>
        <form onSubmit={handleLogin} style={styles.loginForm}>
          <h1 style={styles.title}>Panel de administración</h1>
          <input
            type="password"
            placeholder="Token de administrador"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            autoFocus
          />
          <button type="submit" style={styles.button}>Entrar</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <h1 style={styles.title}>Panel de administración</h1>
        <button onClick={handleLogout} style={styles.logout}>Cerrar sesión</button>
      </header>

      {TABS.length === 0 ? (
        <p style={styles.empty}>Todavía no hay secciones configuradas.</p>
      ) : (
        <>
          <nav style={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  ...styles.tabButton,
                  ...(activeTab === tab.key ? styles.tabButtonActive : {}),
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div>{TABS.find((t) => t.key === activeTab)?.render(token)}</div>
        </>
      )}
    </div>
  );
}

const styles = {
  loginWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    background: "#f5f5f5",
  },
  loginForm: {
    background: "#fff",
    padding: "2rem",
    borderRadius: 8,
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    minWidth: 280,
  },
  title: { margin: 0, fontSize: "1.1rem" },
  input: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: "1rem",
  },
  button: {
    padding: "0.6rem",
    border: "none",
    borderRadius: 4,
    background: "#f39236",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: { color: "#c0392b", margin: 0, fontSize: "0.9rem" },
  shell: { fontFamily: "sans-serif", padding: "2rem", maxWidth: 960, margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  logout: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer",
  },
  empty: { color: "#666" },
  tabs: { display: "flex", gap: "0.5rem", marginBottom: "1.5rem" },
  tabButton: {
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer",
  },
  tabButtonActive: { background: "#f39236", color: "#fff", borderColor: "#f39236" },
};

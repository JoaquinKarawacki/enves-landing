import { logoDeAseguradora } from "@/lib/instructivosSiniestros";

function truncar(texto, max) {
  if (texto.length <= max) return texto;
  return texto.slice(0, max).trim() + "…";
}

const placeholderStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--paper-warm)",
  color: "var(--orange-deep)",
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "uppercase",
  letterSpacing: ".04em",
};

export default function InstructivosSiniestrosGrid({ items }) {
  if (!items.length) {
    return (
      <p style={{ color: "var(--ink-soft)" }}>
        Todavía no hay instructivos de siniestros publicados.
      </p>
    );
  }

  return (
    <div className="news-grid">
      {items.map((item) => {
        const logo = logoDeAseguradora(item.aseguradora);
        return (
          <article className="news-card" key={item.id}>
            <div className="news-thumb">
              {logo ? (
                <img src={logo} alt={item.aseguradora} style={{ objectFit: "contain", padding: "2rem", background: "var(--paper-warm)" }} />
              ) : (
                <div style={placeholderStyle}>{item.aseguradora}</div>
              )}
            </div>
            <div className="news-body">
              <span className="news-date">{item.aseguradora}</span>
              <h3>{item.titulo}</h3>
              <p>{truncar(item.descripcion, 140)}</p>
              <a href={item.href} className="news-link">
                Ver instructivo
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

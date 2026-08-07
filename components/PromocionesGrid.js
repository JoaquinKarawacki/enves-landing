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

export default function PromocionesGrid({ promociones }) {
  if (!promociones.length) {
    return (
      <p style={{ color: "var(--ink-soft)" }}>
        Todavía no hay promociones cargadas. Muy pronto vamos a publicar acá los beneficios y convenios vigentes con
        las aseguradoras con las que trabajamos.
      </p>
    );
  }

  return (
    <div className="news-grid">
      {promociones.map((promo) => (
        <article className="news-card" key={promo.id}>
          <div className="news-thumb">
            {promo.imagen ? (
              <img src={promo.imagen} alt={promo.titulo} />
            ) : (
              <div style={placeholderStyle}>{promo.aseguradora}</div>
            )}
          </div>
          <div className="news-body">
            <span className="news-date">{promo.aseguradora}</span>
            <h3>{promo.titulo}</h3>
            <p>{promo.resumen}</p>
            <a href={promo.href} className="news-link">
              Ver promoción
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

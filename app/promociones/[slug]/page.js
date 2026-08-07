import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { readData } from "@/lib/storage";

export const dynamic = "force-dynamic";

async function getPromocion(slug) {
  const promociones = await readData("promociones", []);
  return promociones.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const promo = await getPromocion(slug);
  if (!promo) return {};
  return {
    title: `${promo.titulo} — Envés Seguros`,
    description: promo.resumen,
  };
}

export default async function PromocionDetallePage({ params }) {
  const { slug } = await params;
  const promo = await getPromocion(slug);
  if (!promo) notFound();

  return (
    <>
      <Header active="promociones" />
      <section className="page-hero">
        <div className="stripe-corner"></div>
        <div className="container">
          <div className="breadcrumb"><a href="/">Inicio</a> / <a href="/promociones">Promociones</a> / {promo.titulo}</div>
          <span className="eyebrow on-dark"><span className="dot"></span> {promo.aseguradora}</span>
          <h1>{promo.titulo}</h1>
          <p>{promo.resumen}</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container" style={{ maxWidth: 760 }}>
          {promo.imagen && (
            <img
              src={promo.imagen}
              alt={promo.titulo}
              style={{ width: "100%", borderRadius: "var(--radius-lg)", marginBottom: "2rem" }}
            />
          )}
          {promo.descripcion.split("\n").filter(Boolean).map((parrafo, i) => (
            <p key={i} style={{ marginBottom: "1.2rem" }}>{parrafo}</p>
          ))}
          {promo.vigenciaHasta && (
            <p style={{ fontWeight: 700, color: "var(--orange-deep)" }}>Vigencia: hasta {promo.vigenciaHasta}</p>
          )}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {promo.condicionesUrl && (
              <a href={promo.condicionesUrl} target="_blank" rel="noopener" className="btn btn-dark">
                Ver condiciones completas
                <span className="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></span>
              </a>
            )}
            <a href="/contacto" className="btn btn-primary">
              Consultar por esta promoción
              <span className="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></span>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

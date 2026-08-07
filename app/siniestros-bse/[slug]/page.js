import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { readData } from "@/lib/storage";

export const dynamic = "force-dynamic";

async function getItem(slug) {
  const items = await readData("siniestros-bse", []);
  return items.find((i) => i.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) return {};
  return {
    title: `${item.titulo} — Envés Seguros`,
    description: item.descripcion.slice(0, 160),
  };
}

export default async function SiniestroBseDetallePage({ params }) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  return (
    <>
      <Header active="siniestros" />
      <section className="page-hero">
        <div className="stripe-corner"></div>
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Inicio</a> / <a href="/siniestros-bse">Siniestros BSE</a> / {item.titulo}
          </div>
          <span className="eyebrow on-dark"><span className="dot"></span> BSE</span>
          <h1>{item.titulo}</h1>
        </div>
      </section>
      <section className="section-pad">
        <div className="container" style={{ maxWidth: 760 }}>
          {item.descripcion.split("\n").filter(Boolean).map((parrafo, i) => (
            <p key={i} style={{ marginBottom: "1.2rem" }}>{parrafo}</p>
          ))}

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0 2rem" }}>
            <a href={item.archivo} target="_blank" rel="noopener" className="btn btn-primary">
              Ver / descargar PDF
              <span className="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></span>
            </a>
            <a href="/contacto" className="btn btn-dark">
              Tengo dudas, quiero asesoramiento
              <span className="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg></span>
            </a>
          </div>

          <iframe
            src={item.archivo}
            title={item.titulo}
            style={{ width: "100%", height: "80vh", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)" }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

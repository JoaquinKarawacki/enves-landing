import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiniestrosBseGrid from "@/components/SiniestrosBseGrid";
import { readData } from "@/lib/storage";
import { ordenarSiniestrosBse } from "@/lib/siniestrosBse";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Siniestros BSE — Envés Seguros",
  description: "Instructivos y guías del BSE para la gestión de siniestros, listos para compartir con nuestros clientes.",
};

export default async function SiniestrosBsePage() {
  const items = ordenarSiniestrosBse(await readData("siniestros-bse", []));

  return (
    <>
      <Header active="siniestros" />
      <section className="page-hero">
        <div className="stripe-corner"></div>
        <div className="container">
          <div className="breadcrumb"><a href="/">Inicio</a> / <a href="/siniestros">Siniestros</a> / BSE</div>
          <span className="eyebrow on-dark"><span className="dot"></span> Guías del BSE</span>
          <h1>Instructivos de siniestros del BSE</h1>
          <p>Guías oficiales del BSE para gestionar tu siniestro paso a paso. Compartilas con quien las necesite.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <SiniestrosBseGrid items={items} />
        </div>
      </section>
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstructivosSiniestrosGrid from "@/components/InstructivosSiniestrosGrid";
import { readData } from "@/lib/storage";
import { ordenarInstructivos } from "@/lib/instructivosSiniestros";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Instructivos de siniestros — Envés Seguros",
  description: "Instructivos y guías de las aseguradoras para la gestión de siniestros, listos para compartir con nuestros clientes.",
};

export default async function InstructivosSiniestrosPage() {
  const items = ordenarInstructivos(await readData("instructivos-siniestros", []));

  return (
    <>
      <Header active="siniestros" />
      <section className="page-hero">
        <div className="stripe-corner"></div>
        <div className="container">
          <div className="breadcrumb"><a href="/">Inicio</a> / <a href="/siniestros">Siniestros</a> / Instructivos</div>
          <span className="eyebrow on-dark"><span className="dot"></span> Guías paso a paso</span>
          <h1>Instructivos de siniestros</h1>
          <p>Guías oficiales de las aseguradoras para gestionar tu siniestro paso a paso. Compartilas con quien las necesite.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <InstructivosSiniestrosGrid items={items} />
        </div>
      </section>
      <Footer />
    </>
  );
}

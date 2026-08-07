import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromocionesGrid from "@/components/PromocionesGrid";
import { readData } from "@/lib/storage";
import { ordenarPromociones } from "@/lib/promociones";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Promociones — Envés Seguros",
  description: "Promociones y convenios vigentes con las aseguradoras con las que trabaja Envés Seguros.",
};

export default async function PromocionesPage() {
  const promociones = ordenarPromociones(await readData("promociones", []));

  return (
    <>
      <Header active="promociones" />
      <section className="page-hero">
        <div className="stripe-corner"></div>
        <div className="container">
          <div className="breadcrumb"><a href="/">Inicio</a> / Promociones</div>
          <span className="eyebrow on-dark"><span className="dot"></span> Beneficios vigentes</span>
          <h1>Promociones y convenios con nuestras aseguradoras</h1>
          <p>Descuentos y beneficios especiales que gestionamos junto a las compañías con las que trabajamos.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <PromocionesGrid promociones={promociones} />
        </div>
      </section>
      <Footer />
    </>
  );
}

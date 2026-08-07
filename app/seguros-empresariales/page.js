import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Seguros Empresariales — Envés Seguros",
  description:
    "Coberturas empresariales en Uruguay: accidentes de trabajo, colectivos de vida, construcción y montaje, multirriesgo, flotas, fianzas, responsabilidad civil y más.",
};

export default function SegurosEmpresarialesPage() {
  return (
    <>
      <Header active="empresariales" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("seguros-empresariales") }} />
      <Footer />
    </>
  );
}

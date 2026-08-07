import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Siniestros — Envés Seguros",
  description:
    "Teléfonos de contacto por aseguradora y guía de qué hacer en caso de siniestro de auto, cristales u hogar. Envés te acompaña en todo el trámite.",
};

export default function SiniestrosPage() {
  return (
    <>
      <Header active="siniestros" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("siniestros") }} />
      <Footer />
    </>
  );
}

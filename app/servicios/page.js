import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Servicios — Envés Seguros",
  description:
    "Por qué elegir Envés y por qué trabajar con un broker de seguros: análisis objetivo, atención personalizada y acompañamiento en cada siniestro, sin costo adicional para vos.",
};

export default function ServiciosPage() {
  return (
    <>
      <Header active="servicios" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("servicios") }} />
      <Footer />
    </>
  );
}

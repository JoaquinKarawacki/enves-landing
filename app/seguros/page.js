import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Seguros por rubro — Envés Seguros",
  description:
    "Conocé el detalle de nuestras coberturas: automotor, hogar, vida, salud, viajes y agropecuario.",
};

export default function SegurosPage() {
  return (
    <>
      <Header active="personales" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("seguros") }} />
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Envés Seguros — Asesoramiento profesional en seguros",
  description:
    "Envés Seguros: asesoramiento profesional en seguros de autos, hogar, vida, salud, viajes, empresariales y agropecuarios en Uruguay.",
};

export default function HomePage() {
  return (
    <>
      <Header active="inicio" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("index") }} />
      <Footer />
    </>
  );
}

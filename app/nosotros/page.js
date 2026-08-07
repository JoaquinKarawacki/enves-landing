import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Quiénes somos — Envés Seguros",
  description:
    "Conocé a Envés Seguros: asesoramiento profesional, honestidad, responsabilidad y respeto por cada cliente.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header active="nosotros" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("nosotros") }} />
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageContent } from "@/lib/pageContent";

export const metadata = {
  title: "Contacto — Envés Seguros",
  description:
    "Contactá a Envés Seguros por teléfono, WhatsApp, email o formulario. Te asesoramos sin costo.",
};

export default function ContactoPage() {
  return (
    <>
      <Header active="contacto" />
      <div dangerouslySetInnerHTML={{ __html: getPageContent("contacto") }} />
      <Footer />
    </>
  );
}

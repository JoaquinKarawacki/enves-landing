export { generarSlug } from "@/lib/slug";

export function ordenarInstructivos(items) {
  return [...items].sort((a, b) => b.id - a.id);
}

const LOGOS_CONOCIDOS = {
  bse: "bse.png",
  mapfre: "mapfre.png",
  sura: "sura.png",
  "sura seguros": "sura.png",
  berkley: "berkley.png",
  "berkley international seguros": "berkley.png",
  "porto seguro": "portoseguros.png",
  "porto seguros": "portoseguros.png",
  portoseguros: "portoseguros.png",
  sancor: "sancor.png",
  "sancor seguros": "sancor.png",
  surco: "surco.png",
  "surco seguros": "surco.png",
};

export function logoDeAseguradora(aseguradora) {
  const archivo = LOGOS_CONOCIDOS[aseguradora.trim().toLowerCase()];
  return archivo ? `/img/aseguradoras/${archivo}` : null;
}

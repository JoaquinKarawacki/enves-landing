export { generarSlug } from "@/lib/slug";

export function ordenarPromociones(promociones) {
  return [...promociones].sort((a, b) => b.id - a.id);
}

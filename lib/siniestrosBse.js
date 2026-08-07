export { generarSlug } from "@/lib/slug";

export function ordenarSiniestrosBse(items) {
  return [...items].sort((a, b) => b.id - a.id);
}

const DIACRITICS_REGEX = new RegExp(String.fromCharCode(91, 0x0300, 45, 0x036f, 93), "g");

export function generarSlug(texto) {
  return texto
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

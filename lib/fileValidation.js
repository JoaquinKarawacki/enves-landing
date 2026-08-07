// Valida el contenido real de un archivo por sus primeros bytes ("magic numbers"),
// en vez de confiar en la extensión o el Content-Type que declara el navegador
// (eso lo puede falsificar cualquiera con un archivo renombrado).
const SIGNATURES = {
  pdf: [{ offset: 0, bytes: [0x25, 0x50, 0x44, 0x46, 0x2d] }], // %PDF-
  jpeg: [{ offset: 0, bytes: [0xff, 0xd8, 0xff] }],
  png: [{ offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  gif: [{ offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] }],
  webp: [
    { offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
    { offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] },
  ],
};

export const CONTENT_TYPES = {
  pdf: "application/pdf",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export const IMAGE_TYPES = ["jpeg", "png", "gif", "webp"];

function coincide(buffer, firmas) {
  return firmas.every((f) => f.bytes.every((byte, i) => buffer[f.offset + i] === byte));
}

export function detectarTipoArchivo(buffer) {
  for (const [tipo, firmas] of Object.entries(SIGNATURES)) {
    if (coincide(buffer, firmas)) return tipo;
  }
  return null;
}

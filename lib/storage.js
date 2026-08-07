import { readFile, writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const isProd = !!process.env.VERCEL;

const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

export async function readData(name, fallback = []) {
  if (isProd) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `data/${name}.json`, limit: 1 });
    if (!blobs.length) return fallback;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    return res.json();
  }
  await ensureDir(LOCAL_DATA_DIR);
  try {
    const raw = await readFile(path.join(LOCAL_DATA_DIR, `${name}.json`), "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function writeData(name, data) {
  const json = JSON.stringify(data);
  if (isProd) {
    const { put } = await import("@vercel/blob");
    await put(`data/${name}.json`, json, {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });
    return;
  }
  await ensureDir(LOCAL_DATA_DIR);
  await writeFile(path.join(LOCAL_DATA_DIR, `${name}.json`), json, "utf-8");
}

export async function saveUpload(buffer, filename, contentType) {
  const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  if (isProd) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${safeName}`, buffer, {
      access: "public",
      contentType,
    });
    return blob.url;
  }
  await ensureDir(LOCAL_UPLOAD_DIR);
  await writeFile(path.join(LOCAL_UPLOAD_DIR, safeName), buffer);
  return `/uploads/${safeName}`;
}

export async function deleteUpload(url) {
  if (!url) return;
  if (isProd) {
    const { del } = await import("@vercel/blob");
    try {
      await del(url);
    } catch {
      // El archivo puede ya no existir; no es un error fatal para el borrado del registro.
    }
    return;
  }
  if (url.startsWith("/uploads/")) {
    try {
      await unlink(path.join(process.cwd(), "public", url));
    } catch {
      // Idem en local.
    }
  }
}

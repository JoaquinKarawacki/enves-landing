import { readFileSync } from "fs";
import path from "path";

export function getPageContent(name) {
  return readFileSync(path.join(process.cwd(), "content", `${name}.html`), "utf-8");
}

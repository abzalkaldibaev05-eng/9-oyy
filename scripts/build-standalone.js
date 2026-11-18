import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "dist", "index.html");
const html = await readFile(htmlPath, "utf8");
const assetNames = [...html.matchAll(/(?:src|href)="\.\/assets\/([^"]+)"/g)]
  .map((match) => match[1]);

if (!assetNames.some((name) => name.endsWith(".js")) || !assetNames.some((name) => name.endsWith(".css"))) {
  throw new Error("Production JavaScript and CSS assets were not found in dist/index.html.");
}

let standalone = html;
for (const assetName of assetNames) {
  const asset = await readFile(path.join(root, "dist", "assets", assetName), "utf8");
  if (assetName.endsWith(".css")) {
    const assetUrl = `href="./assets/${assetName}"`;
    standalone = standalone.replace(/<link\b[^>]*>/g, (tag) =>
      tag.includes(assetUrl) ? `<style>${asset}</style>` : tag);
  } else if (assetName.endsWith(".js")) {
    const escaped = asset.replace(/<\/script/gi, "<\\/script");
    const assetUrl = `src="./assets/${assetName}"`;
    standalone = standalone.replace(/<script\b[^>]*><\/script>/g, (tag) =>
      tag.includes(assetUrl) ? `<script type="module">${escaped}</script>` : tag);
  }
}

if (/\bsrc=["']\.\/assets\//.test(standalone) || /\bhref=["']\.\/assets\//.test(standalone)) {
  throw new Error("Standalone HTML still references external build assets.");
}

const outputPath = path.join(root, "AI-CV-Builder.html");
await writeFile(outputPath, standalone, "utf8");
console.log(`Created standalone frontend: ${path.relative(root, outputPath)}`);

// Set at build time for sub-path hosting (GitHub Pages: /mesh); empty when served from the root.
export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const u = (path: string) => base + path;
export const withBase = (html: string) => html.replaceAll('="/', `="${base}/`);

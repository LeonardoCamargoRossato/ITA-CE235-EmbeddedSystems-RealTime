const ASSET_VERSION = "lcr-assets-v1";

function publicAsset(path: string) {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}?v=${ASSET_VERSION}`;
}

export function imagePair(slug: string) {
  return {
    src: publicAsset(`assets/WebP/${slug}.webp`),
    fullSrc: publicAsset(`assets/PNG/${slug}.png`),
  };
}

export const assets = {
  hero: publicAsset("assets/WebP/portal/ce235-satellite-brazil-hero.webp"),
  profile: publicAsset("assets/WebP/portal/foto-perfil.webp"),
  itaLogo: publicAsset("assets/SVG/marcas/ita-logo.svg"),
} as const;

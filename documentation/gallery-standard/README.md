# LCR gallery consolidation — CE-235

Scope: local academic images already approved for publication. The canonical viewer is `code/src/components/viewers/ImageViewer.tsx`, adapted from the actual LCR Portfolio main 67e8877 (ImageLightbox.tsx) with native dialog, ordered toolbar (+, %, −, download, fullscreen, close), focus restoration, pointer/pinch gestures, bounded panning and maximized fallback. `DemandImage` gates WebP by viewport with zero root margin. PNG appears only in mounted viewer/download. No new production dependencies. Existing PNG/WebP paths and PDF are unchanged.

## Product structure mapping / existing asset catalog
- `/sprint1` / List 3: SprintMediaGallery → ImageViewer, four pairs `sprint-1/github/*`.
- `/list4`: SprintSpriteFigure and SprintEvidenceCarousel → ImageViewer, all eleven pairs `sprint-2/us221/*`; Kanban figure now zoomable, issue link remains separate.
- `/list5`: ZoomableImage → ImageViewer, three pairs `sprint-3/us330/*` (approved diagram, sanitized portal, sanitized Kanban); report PDF unchanged.
- `/list1`, `/list2`: EvidenceGallery accepts explicit approved WebP/PNG pairs through the shared viewer; existing six Drive iframe galleries preserved because local publication rights/content not established. Lab1: 7 + 5 images; Lab2: 3; Lab3 folders: one inaccessible (404), two large frame collections (at least 100 each on first page). No bulk migration or permission changes.
- Home: hero and portrait remain decorative. Navbar/footer SVG identity not zoomable. Project, List0, Artifacts, SCADE and other pages: no new local zoomable evidence found in inspected JSX. PDF components untouched. FinalReport untouched.

Existing path resolver: `code/src/data/assets.ts`, `imagePair` uses BASE_URL. No asset binary changed, original hashes in previous Sprint 3 documentation remain applicable. Legacy sprite atlas is archived, not referenced by active pages. No new remote image dependency.

## Validation
`code/scripts/sprint3-smoke.mjs` runs against local Vite preview in Chromium on desktop/mobile. Requests to external origins are blocked; live Drive and backend are not tested by this suite. Screenshots and network results saved as CI artifact. This is functional/viewport network validation, not production field performance or warm cache measurement. Separate lint script is not defined in package.json; TypeScript is executed by build. Existing security warnings and audit outside this scoped change are not silently resolved.

## Drive curadoria
Original root ID preserved; no deletion or permission change. Two v1 reports and Telegram historical record moved by ID to "Arquivos de menor necessidade"; new inventory in root. Existing link sharing deserves separate review by owner. Technical context retained under Cirineu. No private content copied to GitHub.

// Complete page renderings of approved, existing PDF documents. Original PDFs remain unchanged.
export const pdfPreviews = {
  "sprint1-enunciado": [
    {
      "path": "assets/WebP/sprint-1/pdf/sprint1-enunciado-p01.webp",
      "width": 1600,
      "height": 2071
    },
    {
      "path": "assets/WebP/sprint-1/pdf/sprint1-enunciado-p02.webp",
      "width": 1600,
      "height": 2071
    }
  ],
  "sprint2-relatorio": [
    {
      "path": "assets/WebP/sprint-2/pdf/sprint2-relatorio-p01.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-2/pdf/sprint2-relatorio-p02.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-2/pdf/sprint2-relatorio-p03.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-2/pdf/sprint2-relatorio-p04.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-2/pdf/sprint2-relatorio-p05.webp",
      "width": 1600,
      "height": 2263
    }
  ],
  "sprint3-relatorio": [
    {
      "path": "assets/WebP/sprint-3/pdf/sprint3-relatorio-p01.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-3/pdf/sprint3-relatorio-p02.webp",
      "width": 1600,
      "height": 1132
    },
    {
      "path": "assets/WebP/sprint-3/pdf/sprint3-relatorio-p03.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-3/pdf/sprint3-relatorio-p04.webp",
      "width": 1600,
      "height": 2263
    },
    {
      "path": "assets/WebP/sprint-3/pdf/sprint3-relatorio-p05.webp",
      "width": 1600,
      "height": 2263
    }
  ]
} as const;
export type PdfPreviewKey = keyof typeof pdfPreviews;

type Item={src:string;fullSrc:string;alt:string;caption:string};
const relative:Record<string,Item[]>={
  "1RB-NLsBF7WKgWIa9OfINEZLJk2dhT5gI": [
    {
      "src": "assets/WebP/list-1/lab-1/evidence/Lab1_01_Estrutura_LandingGear.webp",
      "fullSrc": "assets/PNG/list-1/lab-1/evidence/Lab1_01_Estrutura_LandingGear.png",
      "alt": "Lab1 01 Estrutura LandingGear",
      "caption": "Lab1 01 Estrutura LandingGear"
    },
    {
      "src": "assets/WebP/list-1/lab-1/evidence/Lab1_02_Projeto_LandingGear.webp",
      "fullSrc": "assets/PNG/list-1/lab-1/evidence/Lab1_02_Projeto_LandingGear.png",
      "alt": "Lab1 02 Projeto LandingGear",
      "caption": "Lab1 02 Projeto LandingGear"
    }
  ],
  "1sHHQ81PZqDwbDf3d_MKftquSTjPh7scI": [
    {
      "src": "assets/WebP/list-1/lab-1/landing-gear/Figure_1_diag.webp",
      "fullSrc": "assets/PNG/list-1/lab-1/landing-gear/Figure_1_diag.png",
      "alt": "Figure 1 diag",
      "caption": "Figure 1 diag"
    },
    {
      "src": "assets/WebP/list-1/lab-1/landing-gear/Figure_2_diag.webp",
      "fullSrc": "assets/PNG/list-1/lab-1/landing-gear/Figure_2_diag.png",
      "alt": "Figure 2 diag",
      "caption": "Figure 2 diag"
    }
  ],
  "1FhelNsgOto5OMgCpo8NrjZ5n7fsD00bN": [
    {
      "src": "assets/WebP/list-1/lab-2/evidence/Lab2_01_Estrutura_FuelManagement.webp",
      "fullSrc": "assets/PNG/list-1/lab-2/evidence/Lab2_01_Estrutura_FuelManagement.png",
      "alt": "Lab2 01 Estrutura FuelManagement",
      "caption": "Lab2 01 Estrutura FuelManagement"
    },
    {
      "src": "assets/WebP/list-1/lab-2/evidence/Lab2_02_Arquivos_SCADE_FuelManagement.webp",
      "fullSrc": "assets/PNG/list-1/lab-2/evidence/Lab2_02_Arquivos_SCADE_FuelManagement.png",
      "alt": "Lab2 02 Arquivos SCADE FuelManagement",
      "caption": "Lab2 02 Arquivos SCADE FuelManagement"
    },
    {
      "src": "assets/WebP/list-1/lab-2/evidence/Lab2_03_Codigo_C_Gerado_Simulation.webp",
      "fullSrc": "assets/PNG/list-1/lab-2/evidence/Lab2_03_Codigo_C_Gerado_Simulation.png",
      "alt": "Lab2 03 Codigo C Gerado Simulation",
      "caption": "Lab2 03 Codigo C Gerado Simulation"
    }
  ],
  "1TcEBITsXk-H7qtuWt4mKWqZ5QO_2YBh7": [
    {
      "src": "assets/WebP/list-2/lab-3/evidence/Lab3_01_Estrutura_ListEx2.webp",
      "fullSrc": "assets/PNG/list-2/lab-3/evidence/Lab3_01_Estrutura_ListEx2.png",
      "alt": "Lab3 01 Estrutura ListEx2",
      "caption": "Lab3 01 Estrutura ListEx2"
    },
    {
      "src": "assets/WebP/list-2/lab-3/evidence/Lab3_02_Estrutura_Lab3.webp",
      "fullSrc": "assets/PNG/list-2/lab-3/evidence/Lab3_02_Estrutura_Lab3.png",
      "alt": "Lab3 02 Estrutura Lab3",
      "caption": "Lab3 02 Estrutura Lab3"
    }
  ],
  "1_-kE0v3LOyjVWtBOHU5gc-soH-xi7_N4": [
    {
      "src": "assets/WebP/list-2/lab-3/evidence/project-1-report-p3.webp",
      "fullSrc": "assets/PNG/list-2/lab-3/evidence/project-1-report-p3.png",
      "alt": "Project 1 — evidência do relatório individual, página 3",
      "caption": "Project 1 — evidência do relatório individual, página 3"
    }
  ],
  "1Qmd4Owbn12u17GEXMEVgO38Y7dR4fmZz": [
    {
      "src": "assets/WebP/list-2/lab-3/evidence/project-2-report-p4.webp",
      "fullSrc": "assets/PNG/list-2/lab-3/evidence/project-2-report-p4.png",
      "alt": "Project 2 — evidência do relatório individual, página 4",
      "caption": "Project 2 — evidência do relatório individual, página 4"
    }
  ]
};
export const labEvidence=Object.fromEntries(Object.entries(relative).map(([id,items])=>[id,items.map(i=>({...i,src:import.meta.env.BASE_URL+i.src,fullSrc:import.meta.env.BASE_URL+i.fullSrc}))]));

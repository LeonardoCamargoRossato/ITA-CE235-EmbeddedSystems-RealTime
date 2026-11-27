# List 5 — US330 / Sprint 3

Base main: 04b6146c60a50eee56cac3b71d2daf0de72930eb. Entrega individual, não Relatório Final. Consulta de issues em 27/11/2026: #146 e #162 fechadas, #192–194 abertas; #168 fechada e #170 aberta. Quadro parcial: 4/1/6/15, Done desconhecido. Enunciado específico não encontrado na pasta pessoal; dashboard autenticado pendente. Teste de 180 pacotes é histórico, não aceitação oficial.

## Assets públicos

- `diagrama-us330`: PNG aprovado (1920×1080); WebP derivado com qualidade 90. SHA-256 PNG 06169d90541d61f1c73782ada7cba3e2dc3979d645dbb101ebaca4626c2654a1; WebP 998c980246248c7d32b4b78e2e430fe9381a2c02c067eedf0dc1bfc42e2e2454.
- `portal-us330`: captura de 26/11, derivada com QR ocultado; PNG e WebP, falha preservada. SHA-256 PNG af622471690f6bed8cdf9c8d65cbd3e7bcba8df10958b741aba5d54bb131e229; WebP 41773c5f6d86a3502efe41011396a485ad51b0a8669da930f117b0da35fc2bac.
- `kanban-sprint3`: recorte dos cabeçalhos do PDF de 27/11; exclui avatares e conteúdo dos cartões.
- PDF individual preliminar, cinco páginas, com diagrama original e captura sanitizada.

Caminho Git: code/public/assets/{PNG,WebP,PDF}/sprint-3/us330/. Acervo Drive: Sprint 3 (Leo + Cirineu + Roger)/Imagens. Originais, histórico e contexto Cirineu preservados no Drive; não publicar ZIP, guias operacionais, credenciais ou logs. Acesso ao acervo conforme permissões existentes.

Revisão 2: relatório inclui tabela de métricas históricas, recorte sanitizado do Kanban e referências navegáveis. Versão anterior preservada no Drive com sufixo v1. Arquivos PNG/WebP do Kanban: SHA-256 443cc09f3c700c02df29d31687dae7daafc029f2f35a87bc9670df3f0945f1f7 / 27e58d273170e950bc8e02ad91e2c396658a8183e26ec112b6eb46d03a958978.

## Identidade Ground Station API (27/11/2026)

O novo diagrama conceitual complementa o diagrama detalhado anterior. Fonte SVG fornecida no prompt, rasterização CairoSVG/Pillow: proporção 340:292, PNG 2040×1752, WebP 1020×876. LCR Asset Organization Standard v1.2 consultado. Catálogo: `code/src/data/assets.ts` (groundStationComponents), rota /list5?secao=evolucao. WebP on demand; PNG só na ampliação/download.

| Formato | Caminho relativo a code/public/assets | Git blob SHA-1 |
| --- | --- | --- |
| SVG | SVG/sprint-3/us330/ground-station-api-componentes.svg | 988553441c2cfc2983d5832570de7206643bf87a |
| PNG | PNG/sprint-3/us330/ground-station-api-componentes.png | 5bd1ec70575a75100eb562820287355256151a3e |
| WebP | WebP/sprint-3/us330/ground-station-api-componentes.webp | b04c3c6de2801a250335463c7bfc267802286d80 |

Nomenclatura retrospectiva V1, V2 e V3 centralizada em groundStation.ts; nenhum nome de repositório, API ou banco alterado. Preserva documentos históricos e autoria coletiva. A comparação dos cards usa a main PR #10: links, classes, estrutura, estilos, limites de geometria e capturas; hashes de raster são diferentes por alteração editorial autorizada. CI existente executa tsc e build, sem script lint independente.


---

### Autor

**Leonardo Camargo Rossato**

[@leonardocamargorossato — Portfólio profissional](https://leonardocamargorossato.github.io/LCR-SolutionsArchitecture-IA-Quantum/#/)

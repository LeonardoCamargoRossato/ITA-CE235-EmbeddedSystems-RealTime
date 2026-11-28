# CE-235 — Final UX V2

Baseline: db0289c69f05e3b06aecda98bbe9f86dbc0dffef.
Scope: Home, trajectory, artifacts, curriculum and a narrow CSS correction for the existing ListEx 0 overflow detected in the previous release CI. No new academic assets; LCR asset standard previously verified and unchanged. Resource rows reuse the official links and artifact catalog; original permissions unchanged. Portfolio URL centralized in links.ts; embedded lazily only on Curriculum; no changes to portfolio repository or framing protections. External open button remains available. Network access in local environment was unavailable; CI records actual public HTTP/framing headers and real iframe render separately from isolated functional tests.

Direct routes: /?secao=recursos, /?secao=recursos-academicos&recursos=abertos, /?secao=projeto-coletivo, /?secao=trajetoria, /?secao=evolucao, /artefatos?modo=grade, /artefatos?modo=lista, /curriculo?secao=portfolio. All use HashRouter.

---
title: Project Directory
date: 2026-03-06
status: working-document
---

# Project Directory

Cross-repository index of project files not held in the Claude project space. Used to orient Claude to what exists and where without loading every file into active context.

Files in the CT repo are verified present there. Files in the ZK vault are verified present there. Once all files are accounted for and the "Files retained in project space" section is no longer needed, that section will be removed.

---

## Directory

| # | Filename | Location | Contents |
|---|---|---|---|
| D-01 | devstack-api.md | CT/docs/devstack | API layer reference: provider endpoints, authentication headers, request/response patterns, error handling |
| D-02 | devstack-auth.md | CT/docs/devstack | Cloudflare Access setup, email OTP configuration, worker-based key distribution |
| D-03 | devstack-dns.md | CT/docs/devstack | DNS configuration, GoDaddy to Cloudflare nameserver transfer, subdomain setup |
| D-04 | devstack-frontend.md | CT/docs/devstack | Single-file HTML architecture, React setup, marked.js rendering, UI component patterns |
| D-05 | devstack-hosting.md | CT/docs/devstack | Cloudflare Pages deployment, GitHub integration, custom domain configuration |
| D-06 | devstack-overview.md | CT/docs/devstack | Devstack summary: full stack overview, technology choices, architecture rationale |
| D-07 | devstack-security.md | CT/docs/devstack | AES-256-GCM key encryption, .ctk file format, security principles and threat model |
| D-08 | devstack-storage.md | CT/docs/devstack | Cloudflare R2 setup, crosstalk-keys bucket, key file distribution via Worker |
| D-09 | devstack-workers.md | CT/docs/devstack | Cloudflare Workers implementation, CORS configuration, R2 integration |
| D-10 | devstack-index.html | CT/docs/devstack | Three-column devstack reader: sidebar nav, prose rendering, TOC, localStorage annotations |
| D-11 | SETUP.md | CT/ | Early quickstart guide; largely superseded by ct-quickstart-guide.md |
| D-12 | ct-logo-handoff.md | CT/docs | Logo specification for designer handoff: geometry, vertex colors, edge gradients, glow treatment |
| D-13 | ct-color-system-philosophy.md | CT/docs | Color system rationale: vertex colors, warm midpoints as epistemic friction, bioluminescent glow |
| D-14 | ct-design-rationale.md | CT/docs | Public-facing design rationale; wireframe philosophy, equivalence-of-vertices argument |
| D-15 | ct-elevator-email.md | CT/docs | Email-format elevator pitch for CT |
| D-16 | ct-elevator-spoken.md | CT/docs | Spoken elevator pitch for CT |
| D-17 | ctlogoreferencegeminiv3.png | CT/docs/assets | Gemini-generated logo reference image; correct atmosphere, incorrect geometry (square pyramid) |
| D-18 | crosstalklaboverview.pdf | CT/docs | CT overview document; shareable reference |
| D-19 | ct-tetras-session-map.md | CT/docs/logs | Session map for Tetras ideation thread 2026-03-06; 22 entries; working document to be retired |
| D-20 | the-in-between.md | ZK/permanent | Philosophical grounding for In-Between Tetra; Winnicott transitional space, Vygotsky ZPD, Bakhtin heteroglossia |

---

## Files retained in project space

*Remove this section once all files are verified and cleanup is complete.*

| Filename | Location | Notes |
|---|---|---|
| CT-TRACKER.md | CT/ | Living document; actively consulted |
| ct-interaction-design-taxonomy.md | CT/docs | Constantly relevant to development decisions |
| index.html | CT/ | Active development |
| ct-prompt-engineering-surfaces.md | CT/docs | Active reference |
| ct-accessibility-design-principles.md | CT/docs | Active reference |
| ct-conversation-moves.md | CT/docs | Active reference |
| ct-session-log-2026-03-04.md | ZK/log | Session record |
| ct-demo-setup.md | CT/docs | Living document; evolves with CT |
| ct-quickstart-guide.md | CT/docs | Living document; evolves with CT |
| reciprocal-teaching-ct-preset.md | ZK/permanent | Theoretical foundation; actively referenced |
| ethics-of-becoming.md | ZK/permanent | Theoretical foundation; actively referenced |
| heteroglossia-compression-ai-provenance.md | ZK/permanent | Theoretical foundation; actively referenced |
| sociocultural-hermeneutics.md | ZK/permanent | Theoretical foundation; actively referenced |
| vnenakhodimost-surplus-of-seeing.md | ZK/permanent | Theoretical foundation; actively referenced |
| emergent-role-behavior-model-self-positioning.md | ZK/permanent | Theoretical foundation; actively referenced |
| provenance-preservation-multimodel-handoffs.md | ZK/permanent | Theoretical foundation; actively referenced |

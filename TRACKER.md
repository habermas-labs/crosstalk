# Crosstalk Lab / Codex Kitchen — Feature Tracker

A living document tracking features, ideas, infrastructure decisions, and rejected paths across both projects.
Low barrier to entry — if it crossed our minds, it belongs here.

**Status legend:**
- `idea` — raw, unevaluated
- `planned` — decided to do it, not started
- `in-progress` — actively being built
- `implemented` — done and deployed
- `deferred` — real, but not now
- `rejected` — considered and decided against (reason noted)

**Project tags:** `[CT]` Crosstalk Lab · `[CK]` Codex Kitchen · `[INFRA]` shared infrastructure

---

## Tracker

| # | Project | Feature / Idea | Description | Status | Origin | Date |
|---|---------|---------------|-------------|--------|--------|------|
| 001 | `[CT]` | Parallel mode | Send prompt to all active models simultaneously, responses displayed side by side | `implemented` | Core concept | 2026-03 |
| 002 | `[CT]` | Directed routing | Send one model's response to another model with a structured reaction prompt | `implemented` | Core concept | 2026-03 |
| 003 | `[CT]` | Per-model system prompts | Custom instructions for each model set in Settings | `implemented` | Core concept | 2026-03 |
| 004 | `[CT]` | AES-256-GCM encrypted key storage | API keys encrypted to portable `.ctk` files via PBKDF2 passphrase derivation | `implemented` | Claude suggestion | 2026-03 |
| 005 | `[CT]` | Conversation history panel | Turn-by-turn log displayed below response grid | `implemented` | Core concept | 2026-03 |
| 006 | `[INFRA]` | Cloudflare Pages deployment | Static hosting with GitHub integration for both projects | `implemented` | Infrastructure decision | 2026-03 |
| 007 | `[INFRA]` | Cloudflare Access authentication | Email OTP gating during development phase | `implemented` | Infrastructure decision | 2026-03 |
| 008 | `[INFRA]` | R2 bucket for .ctk storage | `crosstalk-keys` bucket created for secure remote key file hosting | `implemented` | Claude suggestion | 2026-03 |
| 009 | `[INFRA]` | Cloudflare Worker for R2 retrieval | Serverless function to serve .ctk file through authenticated endpoint | `planned` | Claude suggestion | 2026-03 |
| 010 | `[CT]` | Load .ctk from URL | Settings UI addition — fetch encrypted key file from a remote URL | `planned` | Claude suggestion | 2026-03 |
| 011 | `[CT]` | Mobile interface — accordion layout | Vertical accordion layout optimized for thumb navigation, one model visible at a time | `deferred` | User insight | 2026-03 |
| 012 | `[CT]` | Conductor mode | Queue models to respond in sequence, each seeing prior responses before answering | `idea` | Claude suggestion | 2026-03 |
| 013 | `[CT]` | Synthesis mode | Designate one model as synthesizer — summarizes points of convergence and divergence | `idea` | Claude suggestion | 2026-03 |
| 014 | `[CT]` | Adversarial mode | Models prompted to challenge and stress-test each other's responses | `idea` | Triangulation philosophy | 2026-03 |
| 015 | `[CT]` | Handoff summaries | Compressed context summaries enabling model role-swapping mid-conversation | `idea` | User insight | 2026-03 |
| 016 | `[CT]` | Export transcript | Save full triangulation session as formatted markdown | `idea` | Claude suggestion | 2026-03 |
| 017 | `[CT]` | Cost tracking | Estimate token usage and API cost per turn | `idea` | Claude suggestion | 2026-03 |
| 018 | `[CT]` | Model version selection | Choose specific model versions per provider in Settings | `idea` | Claude suggestion | 2026-03 |
| 019 | `[INFRA]` | IndexedDB local storage | Persist conversation history locally across sessions | `planned` | Infrastructure decision | 2026-03 |
| 020 | `[INFRA]` | Obsidian / Zettelkasten integration | Knowledge graph building from triangulation sessions | `idea` | User insight | 2026-03 |
| 021 | `[CT]` | Mockups index page | `/mockups/` directory index listing design prototypes with descriptions | `implemented` | User insight | 2026-03 |
| 022 | `[INFRA]` | Cloudflare email/password login | Switched from Google OAuth to direct login for multi-network reliability | `implemented` | Environmental constraint | 2026-03 |

---

## Rejected

| # | Project | Feature / Idea | Reason for rejection | Origin | Date |
|---|---------|---------------|----------------------|--------|------|
| R001 | `[INFRA]` | Server-side key handling | Would break the browser-only architecture — keys should never touch a server in transit | Claude suggestion | 2026-03 |
| R002 | `[INFRA]` | Project-specific Obsidian vaults | Single vault aligns with Luhmann's methodology; project silos would fragment the knowledge graph | User insight | 2026-03 |

---

## Notes

- Worker + URL-load feature (009, 010) to be built from home network — school environment blocked Cloudflare Access setup
- Mobile interface (011) deferred until desktop feature set is complete; restructuring of existing React components, not a rewrite
- Codex Kitchen shares all infrastructure patterns with Crosstalk and serves as its primary test case

---
*Last updated: 2026-03-02*

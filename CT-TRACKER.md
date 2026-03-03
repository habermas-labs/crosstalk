# Crosstalk Lab — Feature Tracker

A living document tracking features, ideas, and infrastructure decisions for Crosstalk Lab.
Low barrier to entry — if it crossed our minds, it belongs here.

**Status legend:**
- `idea` — raw, unevaluated
- `planned` — decided to do it, not started
- `in-progress` — actively being built
- `implemented` — done and deployed
- `deferred` — real, but not now
- `rejected` — considered and decided against (reason noted)

**Project tags:** `[CT]` Crosstalk Lab · `[INFRA]` shared infrastructure

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
| 009 | `[INFRA]` | Cloudflare Worker for R2 retrieval | Serverless function to serve .ctk file through authenticated endpoint | `implemented` | Claude suggestion | 2026-03 |
| 010 | `[CT]` | Load .ctk from URL | Settings UI addition — fetch encrypted key file from a remote URL | `implemented` | Claude suggestion | 2026-03 |
| 011 | `[CT]` | Mobile interface — accordion layout | Vertical accordion layout optimized for thumb navigation, one model visible at a time | `deferred` | User insight | 2026-03 |
| 012 | `[CT]` | Conductor mode | Queue models to respond in sequence, each seeing prior responses before answering | `idea` | Claude suggestion | 2026-03 |
| 013 | `[CT]` | Synthesis mode | Designate one model as synthesizer — summarizes points of convergence and divergence | `idea` | Claude suggestion | 2026-03 |
| 014 | `[CT]` | Adversarial mode | Models prompted to challenge and stress-test each other's responses | `idea` | Triangulation philosophy | 2026-03 |
| 015 | `[CT]` | Handoff summaries | Compressed context summaries (compressed local heteroglossia) enabling model role-swapping mid-conversation | `idea` | User insight | 2026-03 |
| 016 | `[CT]` | Export transcript | Save full triangulation session as formatted markdown | `idea` | Claude suggestion | 2026-03 |
| 017 | `[CT]` | Cost tracking | Estimate token usage and API cost per turn | `idea` | Claude suggestion | 2026-03 |
| 018 | `[CT]` | Model version selection | Choose specific model versions per provider in Settings | `idea` | Claude suggestion | 2026-03 |
| 019 | `[INFRA]` | IndexedDB local storage | Persist conversation history locally across sessions | `planned` | Infrastructure decision | 2026-03 |
| 020 | `[INFRA]` | Obsidian / Zettelkasten integration | Knowledge graph building from triangulation sessions | `idea` | User insight | 2026-03 |
| 021 | `[CT]` | Mockups index page | `/mockups/` directory index listing design prototypes with descriptions | `implemented` | User insight | 2026-03 |
| 022 | `[INFRA]` | Cloudflare email/password login | Switched from Google OAuth to direct login for multi-network reliability | `implemented` | Environmental constraint | 2026-03 |
| 023 | `[CT]` | PWA / home screen installability | Web app manifest and service worker additions to enable install-to-homescreen on mobile | `deferred` | Claude suggestion | 2026-03 |
| 024 | `[CT]` | Ko-fi funding integration | Crowdfunding support for ongoing development | `idea` | User insight | 2026-03 |
| 025 | `[CT]` | Acquisition / IP strategy | Consideration of acquisition opportunities and intellectual property positioning | `idea` | User insight | 2026-03 |
| 026 | `[INFRA]` | Static site generator decision | Select and document SSG for CT; decision should be consistent with CK choice as both repos share infrastructure philosophy | `planned` | Cross-project coordination | 2026-03 |
| 027 | `[INFRA]` | Frontmatter schema v1 | Canonical required/optional fields for content entries; to be decided in coordination with CK to maintain cross-project consistency | `planned` | Cross-project coordination | 2026-03 |
| 028 | `[INFRA]` | CI validation | Markdown lint + frontmatter schema enforcement on PRs; tooling depends on SSG decision | `idea` | Cross-project coordination | 2026-03 |
| 029 | `[INFRA]` | Obsidian / Zettelkasten flow direction | Single vault is decided; flow direction (Obsidian→repo, repo→Obsidian, or bidirectional) must be resolved in coordination with CK before tooling is selected | `idea` | Cross-project coordination | 2026-03 |
| 030 | `[CT]` | Export options in Settings | Dedicated Settings section for export preferences: format, scope (full session vs current turn), metadata toggle | `idea` | User insight | 2026-03 |
| 031 | `[CT]` | Summary export | Send full session to a designated model to synthesize key points of convergence and divergence; closely related to Synthesis mode (013) | `idea` | Session discussion | 2026-03 |
| 032 | `[CT]` | Backend agent layer / MCP server architecture | Server-side agent intermediating between client and model APIs via MCP; enables multi-user scenarios and more sophisticated orchestration; natural evolution when single-file architecture becomes a constraint | `idea` | External suggestion | 2026-03 |
| 033 | `[CT]` | Password manager for credential workflow | Recommend and document a credential management approach in onboarding documentation for the key setup workflow | `idea` | Session discussion | 2026-03 |

---

## Rejected

| # | Project | Feature / Idea | Reason for rejection | Origin | Date |
|---|---------|---------------|----------------------|--------|------|
| R001 | `[INFRA]` | Server-side key handling | Would break the browser-only architecture — keys should never touch a server in transit | Claude suggestion | 2026-03 |
| R002 | `[INFRA]` | Project-specific Obsidian vaults | Single vault aligns with Luhmann's methodology; project silos would fragment the knowledge graph | User insight | 2026-03 |
| R003 | `[CT]` | Separate per-project feature trackers as one master doc | Gets unwieldy as both projects mature; cross-pollination handled by duplicating relevant entries with origin notes | User insight | 2026-03 |

---

## Notes

- Worker + URL-load feature (009, 010) to be built from home network — school environment blocked Cloudflare Access setup
- Mobile interface (011) and PWA (023) deferred until desktop feature set is complete
- Handoff summaries (015) coined by Skooter as "compressed local heteroglossia" — captures the idea of context compression that preserves the multi-voice character of the triangulation session
- Codex Kitchen is tracked separately in its own repo; INFRA entries appear in both trackers
- Entries 026–029 are cross-project infrastructure decisions being coordinated with CK-TRACKER; SSG (026) and frontmatter schema (027) must be resolved jointly before CI validation (028) and Zettelkasten flow direction (029) can move forward

---
*Last updated: 2026-03-02*

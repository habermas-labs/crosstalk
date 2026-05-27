# Crosstalk Lab — Feature Tracker

A living document tracking features, ideas, and infrastructure decisions for Crosstalk Lab.
Low barrier to entry — if it crossed our minds, it belongs here.

**Status legend:**
- `idea` — raw, unevaluated
- `planned` — decided to do it, not started
- `in-progress` — actively being built
- `pending-test` — implemented in code, not yet verified in a live session
- `implemented` — done, deployed, and verified (see Implemented section)
- `deferred` — real, but not now
- `rejected` — considered and decided against (reason noted)

**Latest entry:** 122

---

## Backlog

| # | Feature / Idea | Description | Status | Origin | Date |
|---|---------------|-------------|--------|--------|------|
| 011 | Mobile interface — accordion layout | Vertical accordion layout optimized for thumb navigation, one model visible at a time | `deferred` | User insight | 2026-03 |
| 015 | Handoff summaries | Compressed context summaries (compressed local heteroglossia) enabling model role-swapping mid-conversation; one of four planned export modes alongside full transcript, bullet summary, and handoff-by-model | `planned` | User insight | 2026-03 |
| 017 | Cost tracking | Estimate token usage and API cost per turn; stub in right sidebar accumulative zone (CT-107); primary driver is hosted-key transition — cost visibility is a prerequisite for moving off BYOK to a subscriber model | `idea` | Claude suggestion | 2026-03 |
| 020 | Obsidian / Zettelkasten integration | Knowledge graph building from triangulation sessions | `idea` | User insight | 2026-03 |
| 023 | PWA / home screen installability | Web app manifest and service worker additions to enable install-to-homescreen on mobile | `deferred` | Claude suggestion | 2026-03 |
| 024 | Ko-fi funding strategy | Develop strategy to use Ko-fi to help fund development; Ko-fi page framing and tier/support structure; UI link surface handled by CT-105 | `idea` | User insight | 2026-03 |
| 025 | Acquisition / IP strategy | Consideration of acquisition opportunities and intellectual property positioning | `idea` | User insight | 2026-03 |
| 026 | Static site generator decision | Select and document SSG for CT public web presence; not the app itself | `deferred` | Session discussion | 2026-03 |
| 027 | Frontmatter schema v1 | Canonical required/optional fields for content entries; depends on SSG decision (CT-026) | `deferred` | Session discussion | 2026-03 |
| 028 | CI validation | Markdown lint + frontmatter schema enforcement on PRs; tooling depends on SSG decision (CT-026) | `deferred` | Session discussion | 2026-03 |
| 032 | Backend agent layer / MCP server architecture | Server-side agent intermediating between client and model APIs via MCP; enables multi-user scenarios; natural evolution when single-file architecture becomes a constraint | `idea` | External suggestion | 2026-03 |
| 033 | Credential management for hosted-key subscribers | Strategy and tooling for managing user credentials in a subscriber/hosted-key scenario; not applicable to BYOK-only deployment; revisit if CT moves to hosted keys | `idea` | Session discussion | 2026-03 |
| 037 | File/attachment support — stage two | Stage one (vault, .txt/.md, FileReader) implemented as CT-019/083/084. Stage two: per-provider file APIs, binary formats, base64 encoding | `planned` | Session discussion | 2026-03-03 |
| 039 | Playback mode | Turn viewer: clicking a turn chip renders that turn's full state into the three-column layout; input field locked during playback; checkbox on turn chips flags turns for re-entry; requires CT-104 (turn chips) | `planned` | Session discussion | 2026-03-03 |
| 040 | RIP mode (Rapid Idea Prototyping) | Divergent, generative mode that lowers friction to maximize idea branching; models have ambient visibility into all first-pass outputs in second pass; roles counterproductive in this mode; see also idea coordinate system (041) | `idea` | User insight | 2026-03-03 |
| 041 | Idea coordinate system | Labeling schema for RIP output (A1, A2, B1, B2 etc.); master index enables user to call back any specific idea by coordinate; index is the natural export artifact from a RIP session | `idea` | Session discussion | 2026-03-03 |
| 044 | Mode meta-structure | Modes have session-level behavioral rules enforced at the application level; meta-structure governs turn sequencing, index management, inter-model awareness rules, and mode exit conditions; mode exit is user-triggered | `idea` | Session discussion | 2026-03-03 |
| 045 | Focus mode | Single-model interface mode; eliminates the need to switch browser tabs; viable onboarding path for users who have only configured one API key | `idea` | User insight | 2026-03-03 |
| 046 | RIFF mode | Structured dialogue mode where role presets are load-bearing; models assigned distinct epistemic roles engage in productive friction; grounded in Bakhtin's dialogism; see mode meta-structure (044) | `idea` | Session discussion | 2026-03-03 |
| 047 | Exit scaffold export | Forward-looking export artifact for re-instantiating the session's epistemic context in a new session; distinct from summary export; natural handoff from focus into RIFF; depends on CT-015 (handoff summaries); see also CT-121 | `deferred` | Session discussion | 2026-03-03 |
| 051 | Card collapse and focus mode layout | Single full-width card in focus mode; non-participating cards collapse or dim during directed engagement | `idea` | Session discussion | 2026-03-04 |
| 052 | Reverse chronological history display | Reverse chron default for history panel; toggle to chronological available | `idea` | Session discussion | 2026-03-04 |
| 055 | Per-model response history navigation | Per-column prev/next arrows scoped to each model's response sequence; likely absorbed into CT-039 playback if that ships | `deferred` | Session discussion | 2026-03-04 |
| 060 | Bullet minimal summary export | Lightweight bullet-point summary as an alternative to the narrative summary export; one of four planned export modes alongside full transcript, handoff summary, and handoff-by-model | `planned` | User insight | 2026-03-04 |
| 062 | Text-to-speech (TTS) output | Read model responses aloud via Web Speech API; distinctive voice assigned per model; trigger modes: auto-read on response arrival vs manual per-response button | `idea` | User insight | 2026-03-04 |
| 063 | Verbosity / response length control | Per-session setting instructing models to target a specific response length: Concise / Standard / Detailed; implemented as system prompt instruction | `idea` | User insight | 2026-03-04 |
| 064 | Readability level targeting | Per-session setting specifying target reading level; implemented as system prompt instruction | `idea` | User insight | 2026-03-04 |
| 065 | Accessibility settings panel | Dedicated section within Configuration for accessibility-specific controls: verbosity, readability, TTS, voice input | `idea` | User insight | 2026-03-04 |
| 067 | Voice conductor mode | Speech-to-text input replacing typed prompt; keyword-based routing commands; TTS output; primary accessibility mode for blind users | `idea` | User insight | 2026-03-04 |
| 068 | Voice command intent parsing | Natural language routing intent extraction from spoken input; distinct from the TTS layer — this is the interpretation layer above speech-to-text | `idea` | User insight | 2026-03-04 |
| 069 | Zoom / video call caption layer integration | Push model responses to Zoom's live caption layer during video calls; gated behind backend agent layer (032) | `idea` | User insight | 2026-03-04 |
| 070 | Conductor handoff — multi-user | Two human conductors sharing a CT session; gated behind backend agent layer (032) | `idea` | User insight | 2026-03-04 |
| 071 | Reciprocal teaching mode (academic) | Structured academic discussion mode using the reciprocal teaching framework; four roles: Summarizer, Questioner, Clarifier, Predictor | `idea` | User insight | 2026-03-04 |
| 072 | Reciprocal Teaching Tetra | Named Tetra instantiating the Reciprocal Teaching mode (071); second named Tetra after Triangulation | `idea` | User insight | 2026-03-04 |
| 073 | Tetras — named interaction presets | Named four-role interaction presets (three AI roles + human conductor as fourth vertex); stub in left sidebar | `planned` | Session discussion | 2026-03-04 |
| 078 | Constraint library | Named reusable constraint sets applicable per session or per model; constraints visible as chips in session header; constraint inheritance across global/per-model/per-turn hierarchy | `idea` | Session discussion | 2026-03-05 |
| 079 | Hedra presets — named facing configurations | Named presets for directing model epistemic orientation; formalized version of Hedra gestures (082); stub in left sidebar | `planned` | Session discussion | 2026-03-05 |
| 080 | Prompt engineering surfaces | Structured prompt library for CT-specific session types; named prompt templates for common session configurations | `idea` | Session discussion | 2026-03-05 |
| 082 | Hedra gestures — informal facing assignments | In-the-moment facing assignments from conductor to individual models; encoded in the framing of a redirect, not just its destination | `idea` | Session discussion | 2026-03-05 |
| 089 | Per-model system prompt — individual configuration | System prompt field per model in Configuration panel; foundation for Tetra/Hedra preset injection | `idea` | Session discussion | 2026-03-10 |
| 090 | Sequential awareness accumulation — document as architectural property | In Conductor mode, awareness accumulates down the chain structurally; this is not a bug but an architectural property; Parallel is the only mode that delivers genuinely independent responses | `idea` | Session discussion | 2026-03-10 |
| 091 | Session Brief — pre-session context intake | Optional context intake mechanism triggered on Tetra selection; two intake paths: direct text entry or guided intake via a selected model; produces a Session Brief dispatched in parallel to all models | `idea` | Session discussion | 2026-03-12 |
| 098 | Worker hardening for proxied key architecture | Rate limiting, auth checks, abuse detection on Worker side; not required for BYOK launch but becomes non-optional if CT moves to hosted keys | `idea` | Session discussion | 2026-03-17 |
| 100 | Role-context experiment series | Test whether defensive/performative self-reflection is emergent (context-activated) or a stable model difference; Version C role rotation is the priority experiment | `idea` | Session discussion | 2026-03-17 |
| 103 | Focus Thread — turn selection and curated export | Live annotation layer — user checks turn chips as the session advances; export harvests checked turns in chronological order with gaps intact; requires CT-104 (turn chips) | `idea` | Session discussion | 2026-03-24 |
| 104 | History chips → Turn chips | Rename and reconceptualize history chips as turn chips representing every turn in the session; prerequisite for CT-103 and CT-039 | `idea` | Session discussion | 2026-03-24 |
| 108 | Routing chip — Target / Attach / Dispatch | Dedicated routing zone at input band level replacing the current two-row control strip; three named sections: Target, Attach, Dispatch; routing is flow control not static configuration | `planned` | Via Nagi | 2026-03-29 |
| 109 | Header as HUD | Active Tetra name displayed in the header alongside CT branding once a Tetra is selected; placeholder stub currently implemented | `planned` | Via Nagi | 2026-03-29 |
| 113 | Recent turns — right sidebar navigation section | Recency-scoped turn history in the right sidebar showing the last 4–5 turns; avoids requiring the user to scroll to the history panel at page bottom; prerequisite: CT-104 (turn chips) | `idea` | Session discussion | 2026-04-16 |
| 114 | Committee mode — all-six Hepta | All six models active simultaneously; hexagonal pyramid geometry (human conductor at apex, six models at base vertices); viewport-gated — available only when both sidebars expanded plus six model cards fit the viewport; no degraded fallback, hard constraint; prerequisite: CT-099 (expanded model support); "Committee" is a named Hepta following the Tetra/Hepta taxonomy | `idea` | Session discussion | 2026-05-22 |
| 115 | New provider testing plan — Mistral, DeepSeek, version switching | Structured test plan: (1) confirm Mistral and DeepSeek full parallel send; (2) test model version detection for all 6 providers; (3) test mid-session version switching; (4) comparative session — OG trio (Claude/ChatGPT/Gemini) vs new trio (Grok/Mistral/DeepSeek) in parallel on a shared prompt; (5) mixed triads to explore inter-triad interactions | `planned` | Session discussion | 2026-05-22 |
| 116 | Comparative session prompt design | Develop an initial prompt and 2–3 follow-ups suitable for parallel send across two configurations: OG trio and new trio; prompt should be substantive enough to surface epistemic differences between European/American/Chinese training lineages; potential follow-ups exploring convergence and divergence | `idea` | Session discussion | 2026-05-22 |
| 118 | Model lineup change notification | Toggle in session controls; when active, silently notifies all models on the next prompt dispatch if the active model roster has changed since the last send; no acknowledgment prompt — informational only; models are simply made aware they are now in a different lineup than the previous turn; notification held until next actual send rather than fired immediately on roster change | `idea` | Session discussion | 2026-05-26 |
| 119 | CT as explicit experimental testbed — human-AI communication research | Formal experimental program using CT's multi-model parallel architecture to study inter-model dynamics, model self-awareness, and structural properties of human-AI communication; distinct from incidental findings in ordinary sessions; involves deliberate condition design, controlled variables, and measurable output criteria; CT-118 (lineup change notification) and prior Haiku/Sonnet/Opus session results are candidate entry points; connects to role-context mimicry findings (CT-100) and the broader theoretical claim that sycophancy and hallucination are geometric rather than behavioral properties | `idea` | Session discussion | 2026-05-26 |
| 120 | OG and YB test series — orientation protocol, ego-awareness, baseline | Three-part test series: (1) run full orientation + conductor protocol with OG trio (Claude/ChatGPT/Gemini) matching the YB session (20260526-08158a) for direct comparison; (2) ego-awareness mixed sessions — ChatGPT with two YBs that excluded it, then Gemini with two YBs, all models aware of full roster via orient inject, self-assessment question run to test whether co-presence changes assessments; (3) clean YB baseline — orient only, then "if I ask you this question again, should you answer the same way?" with no prior context, comparable to original OG baseline from 20260316 | `planned` | Session discussion | 2026-05-26 |
| 121 | Unfinalized session export — forward-facing artifact | Export mode capturing open tensions, unresolved contradictions, and forward seeds from a completed session; oriented toward launching a new session rather than re-entering an interrupted one; distinct from CT-047 (exit scaffold), which is about re-entry conditions for a terminated session — this is a seed packet for the next session, not a key to the last one; originated with Mistral in YB session 20260527-76f057; connect to ct-fleeting-history-playback-export-design.md and CT-015 | `idea` | YB session 20260527 | 2026-05-27 |
| 122 | Summarize with — YB model compatibility | Summarize with function was implemented against OG trio; may hardcode model names or make assumptions about column structure that break with Grok, Mistral, DeepSeek; no confirmed failure yet — test needed before logging as bug | `pending-test` | Session discussion | 2026-05-27 |

---

## Pending Test

*Moves to Implemented after testing confirms correct behavior in a live browser session.*

| # | Feature / Idea | Description | Origin | Date | Test notes |
|---|---------------|-------------|--------|------|------------|
| — | No pending tests | — | — | — | — |

---

## Implemented

*Entries appear in approximate order of implementation. Numbers are preserved for reference.*

| # | Feature / Idea | Description | Origin | Date |
|---|---------------|-------------|--------|------|
| 001 | Parallel mode | Send prompt to all active models simultaneously, responses displayed side by side | Core concept | 2026-03 |
| 002 | Directed routing | Send one model's response to another model with a structured reaction prompt | Core concept | 2026-03 |
| 003 | Per-model system prompts | Custom instructions for each model set in Configuration | Core concept | 2026-03 |
| 004 | AES-256-GCM encrypted key storage | API keys encrypted to portable `.ctk` files via PBKDF2 passphrase derivation | Claude suggestion | 2026-03 |
| 005 | Conversation history panel | Turn-by-turn log displayed below response grid | Core concept | 2026-03 |
| 006 | Cloudflare Pages deployment | Static hosting with GitHub integration | Infrastructure decision | 2026-03 |
| 007 | Cloudflare Access authentication | Email OTP gating during development phase | Infrastructure decision | 2026-03 |
| 008 | R2 bucket for .ctk storage | `crosstalk-keys` bucket for secure remote key file hosting | Claude suggestion | 2026-03 |
| 009 | Cloudflare Worker for R2 retrieval | Serverless function to serve .ctk file through authenticated endpoint | Claude suggestion | 2026-03 |
| 010 | Load .ctk from URL | Settings UI addition — fetch encrypted key file from a remote URL | Claude suggestion | 2026-03 |
| 016 | Export transcript | Save full triangulation session as formatted markdown; enriched in CT-074 | Claude suggestion | 2026-03 |
| 021 | Mockups index page | `/mockups/` directory index listing design prototypes with descriptions | User insight | 2026-03 |
| 022 | Cloudflare email/password login | Switched from Google OAuth to direct login for multi-network reliability | Environmental constraint | 2026-03 |
| 048 | Directed engagement controls | "Direct to" and "Forward" dropdowns in input area; three moderated dialogue moves emerge from these two controls; Forward is models-only | Session discussion | 2026-03-03 |
| 059 | Favicon and page title | SVG tetrahedron favicon embedded as base64 data URI; vertex dots in model-assigned colors; page title "Crosstalk Lab" | User insight | 2026-03-05 |
| 074 | Turn schema enrichment and session metadata | Enriched turnHistory schema with turnIndex, timestamp, userText, include, target, order, builtPrompt, results with responseTimestamp; session-level sessionMeta | Session discussion | 2026-03-05 |
| 057 | API key pre-flight validation | "Test" pill adjacent to each API key field; fires a minimal test call to each provider; green/pass or red/fail with specific diagnosis; Test All runs all three | Session discussion | 2026-03-05 |
| 058 | Gemini free-tier provisioning troubleshooting | Troubleshooting subsection added to Quick Start Guide; covers limit:0 error pattern and new-project fix procedure | Session discussion | 2026-03-05 |
| 056 | Move 2 explicit indicator | When Forward is set and prompt field is empty, placeholder text changes to "Forwarding [Model]'s response — add a prompt or send as-is…" | Session discussion | 2026-03-07 |
| 061 | Configuration panel section reorder | API Keys → Key File; Key File immediately follows API Keys improving the keys→key file workflow | Session discussion | 2026-03-07 |
| 031 | Summary export | Send full session to a designated model to synthesize; flyout submenu with per-model selection; exports as `ct-summary-SESSIONID-MODEL.md`; in left sidebar Export dropdown | Session discussion | 2026-03-07 |
| 053 | Accidental send prevention | Mode dropdown + separate Send button; three visual states: deactivated → armed → post-send; modeArmed boolean gates send and keyboard Enter | Session discussion | 2026-03-10 |
| 075 | Branding copy — header and welcome text | h1 "Crosstalk Lab"; tagline "Three models. One conductor. Richer thinking." fades in after carousel settles | Session discussion | 2026-03-10 |
| 076 | Welcome carousel — tetra names | Carousel cycles once through all 8 named Tetras then settles on "your Crosstalk Lab"; click-to-replay | Session discussion | 2026-03-10 |
| 077 | Expandable history turns | History panel shows 120-char preview; turns over 120 chars show expand toggle with copy button | Session discussion | 2026-03-10 |
| 086 | Exclude routing control + Forward rename | Exclude dropdown in Target row; only visible when 3+ models active; "Include" renamed "Forward" throughout | Session discussion | 2026-03-10 |
| 087 | History turn copy button | Copy button in expanded history turn row; 2s "✓ copied" flash | Session discussion | 2026-03-10 |
| 088 | Exclude + Conductor composability | Exclude and mode are orthogonal; Conductor respects Exclude; setting Exclude auto-arms Send | Session discussion | 2026-03-17 |
| 019 | IndexedDB local storage — session vault | vaultDB utility wraps open/getAll/put/remove/clear; auto-clears on fresh navigation, preserves on reload | Session discussion | 2026-03-13 |
| 083 | Session vault UI | Vault file list in right sidebar; toggle-select highlight for include; Add files and Clear vault buttons; vault status indicator in Target row | Session discussion | 2026-03-13 |
| 084 | Vault multi-select include | Multiple files selectable simultaneously; all selected files appended as labeled text blocks in prompt; vaultForward refactored from single id to array; Forward dropdown reverted to models-only | Session discussion | 2026-03-13 |
| 092 | History panel — directed turn target label | "Directed" turn label includes target model name and icon | Session discussion | 2026-03-13 |
| 096 | Transcript export metadata block — Pandoc/PDF compatibility fix | Replace headerless two-column markdown table with bold key-value pairs; fixes Pandoc/PDF export via Zettlr | Neph beta test | 2026-03-15 |
| 101 | Light/dark mode — migrated to left sidebar | Dark/Light toggle in left sidebar Interface section; dark default; localStorage persistence; light palette `#f0f2f6` base with darkened brand accents | Session discussion | 2026-03-17 |
| 094 | In-app clipboard | Three fixed slots (one per model) in right sidebar Clipboard section; ✂ Clip button in model card header alongside SVG copy button; toggle-select slots for include; clipped-at timestamp confirms replacement; clip status indicator in Target row; clips append to prompt as labeled text blocks; clip selection resets on send | Session discussion | 2026-04-11 |
| 095 | Two-row input band layout | Row 1 Target (Direct to, Exclude, Forward, Vault status, Clip status); Row 2 Dispatch (Active status, Mode, Send); always two rows at every viewport width; no wrapping | Session discussion | 2026-04-11 |
| 106 | Left sidebar — constitutive zone | Collapsible left panel; 240px open, 40px rail; auto-opens ≥1100px; contains CT identity, Tetras stub, Hedras stub, Conducting section, Session section, Interface section | Via Nagi | 2026-04-11 |
| 107 | Right sidebar — accumulative zone | Collapsible right panel; 240px open, 40px rail; auto-opens ≥1200px; contains File Vault, Clipboard (CT-094), Cost stub, Reset session | Via Nagi | 2026-04-11 |
| 110 | Code block floating panels | Collapsed inline token replaces code blocks in model chips; draggable fixed-position panels clamped to viewport; first panel snaps to column edge, subsequent panels cascade 24px; max three panels with warning; z-index focus management; SVG copy button in panel header; position memory per model origin | User insight | 2026-04-11 |
| 111 | Conducting section — left sidebar | Conductor Order controls migrated from Configuration modal to dedicated Conducting section in left sidebar | Session discussion | 2026-04-11 |
| 112 | Configuration rename + UI text cleanup | Settings modal and all UI references renamed to Configuration; getting-started notice updated; security note trimmed | Session discussion | 2026-04-11 |
| 105 | Left sidebar — support and about links | Ko-fi (♥ Buy me a coffee), MDReader (↗), and About CT (◎) in Support section below Interface; About opens modal with CT description, Habermas Labs attribution, and footer links to Ko-fi and MDReader | User insight | 2026-05-22 |
| 097 | Per-slot model version selector — mid-session | Model version dropdowns in left sidebar Models section; lists fetched dynamically from each provider's API on key load; selection survives mid-session without resetting conversation history; models unaware of version switches (confirmed); extended to all 6 providers 2026-05-22; Models section follows conductorOrder so displayed slots match active slot assignments | Session discussion | 2026-05-22 |
| 099 | Expanded model support — Grok, Mistral, DeepSeek | Six-provider roster: Claude, ChatGPT, Gemini, Grok (api.x.ai), Mistral (api.mistral.ai), DeepSeek (api.deepseek.com); PROVIDER_META module-level constant is single source of truth for all labels, icons, and colors; conductorOrder serves as slot selector — 3 active slots chosen from 6 via Conducting dropdowns; "Active Model Order" label; slot note added; SettingsPanel split into GenerateCtkModal (6-provider key entry, test, export) and LoadKeysModal (import .ctk, load from URL, security note); Generate .ctk in sidebar below Load Keys; Grok confirmed working in ct-session-20260522-ddc77a; Mistral and DeepSeek pending full test (CT-115) | Session discussion | 2026-05-22 |
| 117 | Model orientation inject — Orient Models + Brief Models | Two-button Session Setup section in left sidebar (constitutive zone); Orient Models fetches /briefs/orient-ct.md, prepends dynamic roster block (active model list + simultaneous dispatch confirmation), dispatches parallel to all active models; Brief Models fetches /briefs/orient-ct-trajectory.md, prepends framing header in code, dispatches parallel; orientLoading state gates both buttons during dispatch; both modes logged in turnHistory as 'orient' and 'brief'; /briefs/ directory established at repo root with orient-ct.md and orient-ct-trajectory.md; tested and verified in ct-session-20260526-c16e95 | Session discussion | 2026-05-26 |

---

## Deprecated

*Items formally retired from the backlog. Numbers preserved for reference. Reason column captures why.*

| # | Feature / Idea | Reason | Notes | Date |
|---|---------------|--------|-------|------|
| 013 | Synthesis mode | `absorbed` | Absorbed into Hedra/Tetra framework (CT-073, CT-079, CT-082); synthesis is one of many configurable epistemic orientations, not a discrete mode | 2026-04-16 |
| 014 | Adversarial mode | `absorbed` | Absorbed into Hedra/Tetra framework (CT-073, CT-079, CT-082); adversarial facing is a Hedra configuration, not a standalone mode | 2026-04-16 |
| 029 | Obsidian / Zettelkasten flow direction | `decision-made` | Single vault decided; flow direction resolved: vault-originated content lives in vault, project-originated in repo with vault holding references. Encoded in project conventions. | 2026-04-16 |
| 035 | Drag-and-drop conductor ordering | `superseded` | Motivating problem (conductor order buried in settings) solved by CT-111; Conducting section in left sidebar provides visible, accessible ordering without drag-and-drop overhead | 2026-04-16 |
| 036 | Conductor mid-conversation reordering | `superseded` | Same resolution as CT-035; left sidebar Conducting section is available between turns; drag-and-drop marginal UX gain does not justify code overhead | 2026-04-16 |
| 042 | Pause state for models | `superseded` | Per-model on/off toggle in model card header covers the practical use case; toggle is frictionless to re-engage; distinction between pause and off does not justify a separate mechanism | 2026-05-01 |
| 043 | Role presets | `absorbed` | Absorbed into Tetra/Hedra framework (CT-073, CT-079, CT-082); roles are now building blocks of named Tetra presets rather than standalone configurable items | 2026-04-16 |
| 049 | Configurable dashboard widgets | `superseded` | Left/right sidebar zone architecture (CT-106/107) encodes the same spatial intent as fixed constitutive/accumulative zones; repositionable widgets no longer fit the design commitment | 2026-04-16 |
| 050 | Unified responsive layout | `superseded` | Interface has evolved substantially since this was logged; mobile work will restart from current architecture when the time comes, not from this framing | 2026-04-16 |
| 054 | History panel as dashboard widget | `superseded` | Sidebar zone architecture (CT-106/107) forecloses repositionable widgets; recency-scoped turn history in the right sidebar captured as CT-113 | 2026-04-16 |
| 102 | Code-heavy layout degradation — desktop stacked mode trigger | `superseded` | Floating code panels (CT-110) solve the column-width problem through a better mechanism; stacked mode trigger no longer needed | 2026-05-01 |

---

## Bugs

| # | Bug | Description | Status | Found | Resolved |
|---|-----|-------------|--------|-------|---------|
| B001 | Gemini appears in Direct to when OFF | Direct to dropdown includes disabled models; should filter to enabled models with configured keys only | `resolved` | 2026-03-04 | — |
| B002 | Dropdowns not resetting after send | Direct to and Include dropdowns retain their values after a send action | `resolved` | 2026-03-04 | — |
| B003 | Pill not reverting to yellow on select-all-then-paste | Paste-over-selection does not trigger onChange — test pill stays red/green rather than reverting to yellow | `resolved` | 2026-03 | — |
| B004 | Configuration modal closes on cursor leaving window | Backdrop onClick handler fires when cursor moves outside the browser window | `resolved` | 2026-03 | — |
| B005 | No show/hide toggle on key input fields | API key fields display as password dots with no visibility toggle | `resolved` | 2026-03 | — |
| B006 | Gemini model string `gemini-2.0-flash` not provisioned on free tier | Hardcoded model string caused all Gemini API calls to fail with quota:0; replaced with `gemini-2.5-flash` | `resolved` | 2026-03 | 2026-03 |
| B007 | Chrome prompts to save API key fields as passwords | Key input fields typed as password trigger Chrome's password save dialog; fix: `autoComplete="new-password"` | `resolved` | 2026-03 | — |
| B008 | Test All runs on empty key fields returning red | Test All should skip empty fields entirely; empty fields should remain yellow | `resolved` | 2026-03 | — |
| B009 | Aggregate state not recalculating after individual test | Stale red persists even when a subsequent individual test passes | `resolved` | 2026-03 | — |
| B010 | No show/hide toggle on passphrase fields | Passphrase input fields display as password dots with no visibility toggle | `resolved` | 2026-03 | — |
| B011 | HistoryPanel crash on userText field rename | `turn.prompt` became undefined after 074 schema renamed field to `userText`; fix: fallback chain | `resolved` | 2026-03-05 | 2026-03-05 |
| B012 | Summarize with flyout not triggering | Submenu collapsed on mouse drift; fix: replaced with `summarizeMenuOpen` React state toggled on click | `resolved` | 2026-03-07 | 2026-03-07 |
| B013 | HistoryPanel crash on turn.prompt in display row | Second instance of bare `turn.prompt` reference missed by B011 fix | `resolved` | 2026-03-07 | 2026-03-07 |
| B014 | Chrome password manager on passphrase fields | All three passphrase inputs lacked `autoComplete` attribute; fix: `autoComplete="new-password"` on all three | `resolved` | 2026-03-07 | 2026-03-07 |
| B015 | Summarize with — Gemini missing from submenu | Outer export menu `overflow: hidden` clipped absolutely-positioned submenu; fix: `overflow: visible` | `resolved` | 2026-03-07 | 2026-03-07 |
| B016 | Exclude selection does not arm Send | Setting Exclude requires user to also select a mode; fix: Exclude auto-selects Parallel and arms Send | `resolved` | 2026-03-10 | 2026-03-11 |
| B017 | Excluded model card resets to waiting state | After a send with Exclude set, excluded model's card clears its response; should retain previous response | `resolved` | 2026-03-10 | 2026-03-11 |
| B018 | Conductor send fires immediately without arming | Conductor mode send was not gated on modeArmed | `resolved` | 2026-03-10 | 2026-03-11 |
| B019 | Forward dropdown design decision | Forward shows all models with responses regardless of routing state; the only filter is the source model itself | `resolved` | 2026-03-11 | 2026-03-11 |
| B020 | ChatGPT vault file framing — safeguard trigger | Inline vault text without framing caused ChatGPT safeguard responses; fix: explicit inline-text declaration in file block | `resolved` | 2026-03-13 | 2026-03-13 |
| B021 | pendingHasChanges/pendingVals/pendingHasDupe forward reference | Three derived values computed immediately using `conductorOrder` before `conductorOrder`'s `useState` call; Babel's var hoisting made `conductorOrder` undefined at evaluation time, producing blank-screen crash; fix: moved three derived values to after `conductorOrder` declaration | `resolved` | 2026-05-22 | 2026-05-22 |
| B022 | Orient/Brief mode labels in transcript export | All three export paths (turn history UI, full transcript, digest) fell through to "Directed → undefined undefined" for 'orient' and 'brief' modes — neither was handled in the mode label conditional chains; surface in transcript: "Turn 1 — Directed → undefined undefined"; fix: added explicit cases for 'orient' and 'brief' in all three locations; discovered in ct-session-20260526-c16e95 | `resolved` | 2026-05-26 | 2026-05-26 |
| B023 | Truncation — no visual indicator on finish_reason length | Mistral-large-latest consistently hit max_tokens in YB session 20260527-76f057 with no visible indicator in the UI; responses silently truncated; fix: detect finish_reason "length" in response handling and display a warning indicator on the affected model card; evaluate per-model max_tokens tuning; consider column-level export as workaround for truncated responses | `open` | 2026-05-27 | — |
| B024 | Clip button — YB model names not recognized in scope logic | Clip button copies entire response rather than selected text when a YB model column (Grok, Mistral, DeepSeek) is the source; OG model names confirmed working; likely a naming recognition issue in clip scope logic — YB model name strings may not match the pattern expected; investigate clip scope conditional against PROVIDER_META entries for YB providers | `open` | 2026-05-27 | — |

---

## Session Notes

- Check the tracker document header for the latest entry number before logging new entries.
- Architectural deliberation is a valid and underexplored use case for multi-model triangulation — distinct from parallel task execution. CT's own feature design is the natural test bed for this. (038)
- Linear export formats structurally suppress the dialogical architecture of a triangulation session. Replay mode is the specific solution; the broader principle should inform all future export and documentation design decisions. (039)
- RIP (Rapid Idea Prototyping) is divergent and generative, not convergent — its goal is surface area expansion and idea density, not resolution. Distinct from Parallel in that models have ambient visibility into each other's outputs. (040)
- The idea coordinate system (041) makes RIP output navigable without forcing premature synthesis — the index is the product, not a transcript or summary.
- Pause (042) is architecturally distinct from disable: pause preserves session state and index continuity, disable breaks it.
- Roles (043) are building blocks; modes are compositions of roles plus meta-structure (044). The three-level taxonomy — roles, modes, meta-structure — is the conceptual framework for the entire interaction design system going forward.
- Focus mode (045) is not just a cost-reduction feature — it is a single-model session with Crosstalk's epistemic infrastructure wrapped around it, which is meaningfully different from using a native model interface directly.
- RIFF mode (046) is the primary triangulation mode in the philosophical sense — structured friction between assigned roles, grounded in Bakhtin's dialogism. The Observer role in RIFF is the structural instantiation of outsideness/vnenakhodimost'.
- Mode exit scaffolding (047) reframes session end as an epistemic moment; creates the natural handoff point from focus into RIFF.
- The theoretical foundation for triangulation as an epistemic practice is Bakhtin's outsideness (vnenakhodimost') and surplus of seeing, connected to sociocultural hermeneutics. See permanent note: vnenakhodimost-surplus-of-seeing.md
- The three moderated dialogue moves (directed prompt, response routing, combined move) are usage patterns that emerge from the Direct to / Forward controls, not discrete features. The taxonomy belongs in documentation, not in the implementation. (048)
- Handoff summaries (015) must preserve authorship and voice, not just content; models receiving their own prior output lose co-author status — provenance tracking is essential for intellectual integrity of the session record.
- Four-mode export system: full transcript (CT-016), bullet summary (CT-060), handoff summary (CT-015), handoff-by-model (CT-015). Spans raw archival through structured capture to forward-looking re-entry; see W009 session knowledge architecture.
- TTS (062), verbosity control (063), and readability targeting (064) compound in value together — particularly for ADHD users where concise + spoken is a meaningfully different experience than long + visual.
- Voice conductor mode (067) and voice command intent parsing (068) are separable — TTS output (062) can ship independently of voice input.
- Zoom caption layer integration (069) has a non-obvious archival benefit: captions pushed to Zoom's caption layer are captured in meeting recordings with model attribution intact. Both (069) and (070) are gated behind backend agent layer (032).
- Accessibility in Crosstalk spans three distinct user personas: blind users (voice conductor mode, audio export), neurodivergent/ADHD users (verbosity control, readability targeting, TTS), deaf and hard-of-hearing users (visual legibility, caption layer). See ZK note: ct-accessibility-design-principles.md
- "Tetra" is the project term for a named four-role interaction preset — three AI roles plus the human conductor as the fourth vertex. Sits between roles and modes in the taxonomy. First two named Tetras: Triangulation Tetra and Reciprocal Teaching Tetra (072). The Triangulation Tetra name captures a deliberate geometric collapse — the conductor's presence is what gives the triangle its third dimension. (073)
- The SVG tetrahedron logo uses mathematically projected geometry; the Necker cube optical illusion on the blue vertex is an emergent property of the wireframe projection and should be treated as intentional in any designer handoff. (059)
- Tetra single-word naming convention (076): each named Tetra gets a concept word or short phrase capturing the epistemic act, not the methodology. Current set: *triangulation*, *reciprocity*, *the Agora*, *calibration*, *the In-Between*, *discourse*, *porosity*, *RIP*.
- The carousel is permanent branding in the subtitle position, not a conditional onboarding element. Sequence: cycles through all 8 Tetras, settles on "your Crosstalk Lab", tagline fades in as terminal state. Click-to-replay is a discovery feature. (076)
- "The In-Between" names the epistemic condition that RIFF mode instantiates: the space between being and becoming where deliberative inquiry is sustained. Connects to Bakhtin's heteroglossia and vnenakhodimost', Winnicott's transitional space, and Vygotsky's ZPD as productive incompletion. See ZK: the-in-between.md. (076)
- Branding copy fix (075): lowercase "triangulation" in the welcome message is intentional — positions the user as entering an epistemic practice, not a named product.
- Session ID prefix removed 2026-03-07: `generateSessionId()` no longer prepends `ct-`; filenames are now `ct-session-YYYYMMDD-XXXXXX.md`.
- Hedra gestures (082) are the informal, improvisational version of Hedra presets (079) — the conductor's in-the-moment facing assignments before they are formalized as named presets.
- Session vault (CT-019/083/084) stage one implemented 2026-03-13: IndexedDB-backed, .txt and .md only. Stage two (binary) deferred to CT-037. Auto-clear on fresh navigation added 2026-04-11.
- Light/dark mode (101): dark is the default on first load; preference persists via localStorage; toggle migrated to left sidebar Interface section 2026-04-11.
- Role-context mimicry (100): emerged from ct-session-20260317-55bf7b; defensive/performative self-reflection observed when Claude occupied the subject-of-analysis role; hypothesis is context-activated rather than stable model feature. See ZK: role-context-mimicry-self-reflection.md.
- Mobile baseline (2026-03-11): current desktop layout renders functionally on mobile without dedicated mobile work; collapsible chips (035/036 adjacency) is the primary blocker for comfortable thumb navigation.
- Session knowledge architecture (2026-03-25): CT's export system is evolving from a feature into a theoretically-grounded practice. Session volatility is a design principle, not a limitation. The export ecosystem spans a spectrum of intentionality: from raw archival through structured capture (Focus Thread) to forward-looking re-entry artifacts (exit scaffold). See proposed W009: session-knowledge-architecture.md.
- Origin values include via Nagi for ideas originating on walks with Nagi (Skooter's GSD, psychiatric service dog in training) — a distinct ideation context: low visual demand, rhythmic movement, speech-to-text capture.
- Routing chip (108) architecture: Target / Attach / Dispatch names three phases of a CT send operation as a theoretical claim, not just UI labels. See ZK: interface-as-epistemic-scaffold.md.
- Left/right sidebar zone architecture (106/107): the constitutive/accumulative distinction is a theoretical commitment encoded spatially. Left is before, center is during, right is the accumulation of what has happened. See ZK: interface-as-epistemic-scaffold.md.
- Two-row input band (095/2026-04-11): Target row and Dispatch row are always explicit at every viewport width. The split encodes the Target/Dispatch distinction from CT-108 spec in the current interface ahead of the full routing chip implementation.
- Clipboard (CT-094/2026-04-11): clip is distinct from copy (OS clipboard) and forward (dialogue routing act). Clip is CT-internal session-scoped routing that preserves source card state. Three fixed slots, one per model, replace on re-clip. Clipped-at timestamp in sidebar pill confirms replacement at a glance.
- Conducting section in left sidebar (CT-111/2026-04-11): Conductor Order is a session-shape decision (constitutive zone) not a configuration concern. Its visibility in the left sidebar makes it available as a deliberate choice before and between turns.
- Sessions to date: ct-session-20260305-b901f7-ai-political-topics.md, ct-session-20260306-956108-water-is-wet.md, ct-session-20260307-ce45a5-the-in-between.md, ct-session-20260310-cb355c.md, ct-session-20260311-56e54a.md, ct-session-20260317-55bf7b.md, ct-session-20260522-ddc77a.md (first Grok session), ct-session-20260526-c16e95-orient-injection-test.md (first orient/brief inject test), ct-session-20260526-08158a-3-new-models-test.md (first full YB trio session — orientation protocol + conductor rounds).
- PROVIDER_META (2026-05-22): module-level constant is now the single source of truth for all 6 provider labels, icons, accent/bg/border colors; replaces all scattered inline provider-keyed object literals throughout the codebase. Pattern to maintain as new providers are added.
- conductorOrder as slot selector (2026-05-22): the 3 Conducting dropdown positions determine which providers are active, not just their firing order. Six-provider roster with 3-slot UI requires no additional slot picker architecture. Slot note added: "Only 3 models active at a time — swap slots to change providers."
- BYOK architectural decision (2026-05-22): hosted-key model planned for public release; BYOK UI (Generate .ctk modal) is dev scaffolding to be retired on public launch; drives the decision to keep fixed 6-provider roster and 3-slot UI rather than adding flexible slot picker or expanded provider marketplace.
- Generate .ctk / Load Keys split (2026-05-22): SettingsPanel replaced by two focused modals. Generate .ctk is the developer/admin path (key entry, test, export). Load Keys is the everyday session path (import .ctk file, load from URL). Security note lives in Load Keys as it's the user-facing action. Both surfaced as sidebar buttons in Interface section.
- Committee/Hepta geometry (2026-05-22): hexagonal pyramid is the natural 7-vertex polyhedron for Committee mode — human conductor at apex, 6 models at hexagonal base vertices. Geometrically distinguishes the conductor from the models, unlike the tetrahedron's vertex equivalence. "Hepta" follows the Tetra naming convention; "Committee" is the first named Hepta.
- First Grok session (ct-session-20260522-ddc77a): Grok integration verified; Grok's closing response (model selection heuristic table) was the most substantive and actionable of the three; accidental parallel send on Turn 3 produced a clean three-way comparison demonstrating CT's core value proposition. Mistral and DeepSeek pending full test.
- CT-117 architecture settled — static layer fetched from server at inject time rather than embedded in index.html; UI assembles dynamic roster and prepends to fetched content before dispatch; acknowledgment instruction baked into end of static file so it lands last; all briefing files live in /briefs/ at repo root, flat structure, filename prefixes distinguish types (orient-, tetra-, hedra-, hepta-).
- Orient injection test (ct-session-20260526-c16e95): CT-117 verified; all three models acknowledged orientation and demonstrated comprehension; two-document structure (orient + brief) confirmed correct — functional baseline established before philosophical framing; B022 discovered and resolved in same session.
- CT-119 founding observation (2026-05-26): all three models in the orient injection test independently identified CT's anti-sycophancy design intent within one turn of receiving the trajectory brief, unprompted — despite the brief being deliberately neutral in framing; competing explanations are architectural legibility (the multi-model geometry is self-evidently triangulative) and sycophancy-awareness as a trained frame (any multi-model tool activates the category); the founding paradox: you cannot fully escape the observer effect when the subject is a model trained on discourse about AI observation effects. See permanent note: ct-experimental-testbed.md.
- OG and YB terminology (2026-05-26): the original three-model roster (Claude, ChatGPT, Gemini) is the OG trio; the three models added with CT-099 expansion (Grok, Mistral, DeepSeek) are the Youngbloods (YB). Shorthand OG and YB used in session notes and tracker entries going forward.
- YB orientation session (ct-session-20260526-08158a): first full session with Grok, Mistral, DeepSeek using the CT-117 orientation protocol; orientation + conductor rounds + self-assessment with full six-model roster; DeepSeek Round 1 flagged the conductor assumption — identified that CT's geometry presupposes a conductor who can wield it without reintroducing the sycophancy it was designed to escape; Mistral showed consistent roleplay/ventriloquism behavior attributed tentatively to French intellectual tradition of full multi-perspective representation before synthesis; all three YB models excluded ChatGPT and Gemini from their optimal trio picks — in-group preference toward the current session roster strongly evident.
- OG trio orientation session (ct-session-20260526-350be2): full orientation + conductor protocol run with Claude, ChatGPT, Gemini matching the YB session for direct comparison; Gemini errored twice on the self-assessment parallel send and was retried via directed send, causing identity confusion — responded as Claude rather than itself, attributing the misidentification to context saturation from Conductor mode Claude-authored content combined with isolated directed send losing the parallel framing anchor; corrected in Turn 12–13 with explicit identity re-anchoring; Claude picked Grok + Mistral; ChatGPT picked Claude + Grok; Gemini (corrected) picked Claude + Grok; ChatGPT and Gemini excluded by all six models across both sessions; Claude and Grok appeared in every model's optimal lineup; YB models showed in-group preference toward their session trio; OG models reached outside their cohort toward Grok and away from ChatGPT and Gemini.

---

## Proposed Writings

ZK notes and whitepaper sections proposed but not yet drafted.

| ID | Title | Type | Status | Connected entries |
|----|-------|------|--------|------------------|
| W001 | Crosstalk Lab whitepaper | Whitepaper | drafting | All |
| W002 | Workload outsourcing | ZK permanent | proposed | 015, 047 |
| W003 | Heteroglossia and compression in AI provenance | ZK permanent | proposed | 015 |
| W004 | Participation mode matrix | ZK permanent | proposed | 040, 046 |
| W005 | Polyhedra interaction geometry | ZK permanent | proposed | 043, 044, 073, 114 |
| W006 | Dimensionality ladder | ZK permanent | proposed | 043, 044 |
| W007 | Sociocultural hermeneutics and CT | ZK permanent | proposed | 046, 071 |
| W008 | Role-context mimicry and self-reflection | ZK permanent | drafted | 100 |
| W009 | Session knowledge architecture | ZK permanent | proposed | 031, 039, 047, 103 |
| W010 | Cultural and linguistic diversity in model training — hedra implications | ZK permanent | proposed | 116, 119, 120 |

---
*Last updated: 2026-05-26*

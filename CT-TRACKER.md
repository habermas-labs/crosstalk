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

**Latest entry:** 132

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
| 118 | Model lineup change notification | Toggle in session controls; when active, silently notifies all models on the next prompt dispatch if the active model roster has changed since the last send; no acknowledgment prompt — informational only; models are simply made aware they are now in a different lineup than the previous turn; notification held until next actual send rather than fired immediately on roster change | `idea` — Session discussion | 2026-05-26 |
| 119 | CT as explicit experimental testbed — human-AI communication research | Formal experimental program using CT's multi-model parallel architecture to study inter-model dynamics, model self-awareness, and structural properties of human-AI communication; distinct from incidental findings in ordinary sessions; involves deliberate condition design, controlled variables, and measurable output criteria; CT-118 (lineup change notification) and prior Haiku/Sonnet/Opus session results are candidate entry points; connects to role-context mimicry findings (CT-100) and the broader theoretical claim that sycophancy and hallucination are geometric rather than behavioral properties | `idea` | Session discussion | 2026-05-26 |
| 120 | OG and YB test series — orientation protocol, ego-awareness, baseline | Three-part test series: (1) run full orientation + conductor protocol with OG trio (Claude/ChatGPT/Gemini) matching the YB session (20260526-08158a) for direct comparison; (2) ego-awareness mixed sessions — ChatGPT with two YBs that excluded it, then Gemini with two YBs, all models aware of full roster via orient inject, self-assessment question run to test whether co-presence changes assessments; (3) clean YB baseline — orient only, then "if I ask you this question again, should you answer the same way?" with no prior context, comparable to original OG baseline from 20260316 | `planned` | Session discussion | 2026-05-26 |
| 121 | Unfinalized session export — forward-facing artifact | Export mode capturing open tensions, unresolved contradictions, and forward seeds from a completed session; oriented toward launching a new session rather than re-entering an interrupted one; distinct from CT-047 (exit scaffold), which is about re-entry conditions for a terminated session — this is a seed packet for the next session, not a key to the last one; originated with Mistral in YB session 20260527-76f057; connect to ct-fleeting-history-playback-export-design.md and CT-015 | `idea` | YB session 20260527 | 2026-05-27 |
| 122 | Summarize with — YB model compatibility | Summarize with function was implemented against OG trio; may hardcode model names or make assumptions about column structure that break with Grok, Mistral, DeepSeek; no confirmed failure yet — test needed before logging as bug | `pending-test` | Session discussion | 2026-05-27 |
| 123 | Multi-user co-conduct — shared live session | Two human participants share a single CT session in real time; one initiates via invite token (Zoom-call model), second joins via link/code; requires Cloudflare Durable Objects for session state sync (Workers paid tier, ~$5/mo); predecessor CT-032 (backend agent / multi-user natural evolution); PoC phase: controlled access only, no public availability; educational use case — teacher/student co-conduct — primary motivation; human-human-AI dialogue as a structurally distinct mode from single-conductor sessions | `in-progress` | Via Nagi | 2026-05-31 |
| 124 | Human backchannel — text and voice | Private human-to-human communication channel within a shared CT session; invisible to models; preserves distinction between human deliberation and model context; text baseline plus WebRTC peer-to-peer voice (push-to-talk for PoC); Durable Object doubles as WebRTC signaling server — no additional infrastructure; voice eliminates typing friction and supports more natural in-session coordination; depends on CT-123 | `in-progress` | Via Nagi | 2026-05-31 |
| 125 | Tandem — Phase 1 status update | CT-123 and CT-124 status updated to `in-progress`; Phase 1 infrastructure complete — Workers Paid upgrade done, TandemSession DO deployed via GitHub-connected wrangler build, smoke test confirmed 2026-06-02 on cellular from yourcrosstalklab.com/tandem-smoke-test.html; two-client WebSocket relay verified bidirectional | `in-progress` | Session | 2026-06-02 |
| 126 | Kimi K2.6 — model expansion candidate | Moonshot AI, Chinese provenance distinct from DeepSeek — consumer/multimodal vs. research orientation; 1T parameter MoE, open-weight Modified MIT license; primary CT interest is cultural triangulation alongside DeepSeek to test whether two Chinese-origin models show meaningfully different epistemic signatures; $0.95/$4.00 per million tokens; geopolitical risk factor (pending US legislation re: Chinese AI firms); brand color TBD | `idea` | Via Nagi | 2026-06-02 |
| 127 | CT-as-training-data-generator — fine-tuned Partner model | CT+Witness sessions scripted to produce training data for a CT-aware fine-tuned open-weight model (Llama/Mistral base); Partner training Tetra concept — Witness configured with output requirements oriented toward fine-tuning goal; pipeline: design scripts → run sessions → export transcripts → fine-tune → evaluate as Partner; dissolves ToS problem of authenticated AI Partner (CT-124); see fleeting-authenticated-ai-partner-cross-tab.md | `idea` | Via Nagi | 2026-06-02 |
| 128 | Model confirm/cancel buttons — header placement | ✕ and ✓ icon buttons in the Models section header; always visible, dimmed/disabled at rest, activate when pendingModels diverges from selectedModels; eliminates the hidden "Confirm changes" button that appeared only after making a change and was easy to miss at the bottom of the dropdown list | `implemented` | Session discussion | 2026-06-17 |
| 129 | Model selector — preferred model patterns | PREFERRED_MODEL_PATTERNS per provider — ordered regex list matched against the live model list after key load; prevents auto-select landing on flagship/expensive models (Opus, Fable, o1) when the user has not chosen explicitly; Claude prefers Sonnet, ChatGPT prefers gpt-4o, Gemini prefers 2.5-flash, etc.; falls back to first-in-list only if no pattern matches | `implemented` | Session discussion | 2026-06-17 |
| 130 | Model selection — localStorage persistence | Last-used model per provider stored in localStorage (keys ct_model_claude etc.) and restored on next session load; seeds selectedModels and pendingModels on init; writes on explicit confirm and on fetch auto-correct so first-session defaults are also captured; try/catch throughout for private browsing safety | `implemented` | Session discussion | 2026-06-17 |
| 131 | Version pill — sidebar footer | CT_VERSION constant in script; renders as a small centered pill below the About CT button in the sidebar; starts at 1.1.0001, incremented per release; allows at-a-glance confirmation of which version is live without inspecting code | `implemented` | Session discussion | 2026-06-17 |
| 132 | Model selector list — filter and dedup | fetchProviderModels now filters to chat-capable models only and deduplicates to one entry per model family (newest wins); modelFamilyKey strips Anthropic-style (-20250514) and OpenAI-style (-2024-05-13) date suffixes plus preview/exp/latest markers; dedupeByFamily keeps first occurrence after newest-first sort; per-provider filter improvements: ChatGPT allowlisted to gpt-4o/4.1/5/o-series families with audio/tts/image/realtime/embed/instruct excluded; Gemini restricted to gemini-named generateContent models with embed/aqa/tts/imagen/learnlm excluded; Grok/Mistral/DeepSeek tightened to also exclude vision/ocr variants | `implemented` | Session discussion | 2026-06-17 |

---

## Superseded / Rejected

| # | Feature / Idea | Resolution | Date |
|---|---------------|------------|------|
| 029 | LangChain integration | `rejected` — adds server-side dependency; contradicts browser-only constraint | 2026-03 |
| 030 | Streaming responses | `rejected` — inconsistent streaming API support across providers; clean turn-based UX is preferable | 2026-03 |
| 031 | Session persistence (server) | `rejected` — browser-only constraint; export system covers the need without server storage | 2026-03 |
| 034 | Automatic session summarization | `rejected` — removes conductor agency over session framing; export is the right surface for this | 2026-03 |
| 035 | Drag-and-drop conductor ordering | `superseded` — Conducting section in left sidebar (CT-111) solves the problem without drag-and-drop overhead | 2026-04-16 |
| 036 | Conductor mid-conversation reordering | `superseded` — same resolution as CT-035 | 2026-04-16 |
| 042 | Pause state for models | `superseded` — per-model on/off toggle covers the practical use case | 2026-05-01 |
| 043 | Role presets | `absorbed` — absorbed into Tetra/Hedra framework (CT-073, CT-079, CT-082) | 2026-04-16 |
| 049 | Configurable dashboard widgets | `superseded` — left/right sidebar zone architecture (CT-106/107) encodes the same intent | 2026-04-16 |
| 050 | Unified responsive layout | `superseded` — mobile work will restart from current architecture when the time comes | 2026-04-16 |
| 054 | History panel as dashboard widget | `superseded` — sidebar zone architecture forecloses repositionable widgets; CT-113 captures the recency-scoped variant | 2026-04-16 |
| 102 | Code-heavy layout degradation — desktop stacked mode trigger | `superseded` — floating code panels (CT-110) solve the column-width problem through a better mechanism | 2026-05-01 |

---

## Pending Test

*Moves to Implemented after testing confirms correct behavior in a live browser session.*

| # | Feature / Idea | Description | Origin | Date | Test notes |
|---|---------------|-------------|--------|------|------------|
| 122 | Summarize with — YB model compatibility | Summarize with function may hardcode OG trio assumptions; test with Grok, Mistral, DeepSeek active | Session discussion | 2026-05-27 | No confirmed failure yet |

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
| 010 | Markdown rendering in responses | Model responses rendered as formatted markdown rather than raw text | Core concept | 2026-03 |
| 012 | Copy response to clipboard | Per-model copy button in card header | User insight | 2026-03 |
| 013 | Clear session | Reset all conversation histories and response cards | Core concept | 2026-03 |
| 014 | Export session as markdown | Full session transcript exported as a structured .md file | User insight | 2026-03 |
| 016 | Full transcript export | Complete turn-by-turn export with model attribution; first of four planned export modes | Core concept | 2026-03 |
| 018 | Per-model enable/disable toggle | Toggle individual models in/out of active session without removing keys | User insight | 2026-03 |
| 019 | Session vault — stage one | IndexedDB-backed file vault; .txt and .md only; attach files to session context | Session discussion | 2026-03-13 |
| 021 | Dark mode | Dark theme as default; toggle in left sidebar Interface section | User insight | 2026-03 |
| 022 | Syntax highlighting in code blocks | Code fence rendering with language detection | Core concept | 2026-03 |
| 056 | Narrative summary export | AI-generated narrative summary of session; second export mode | User insight | 2026-03-04 |
| 057 | Summarize with — model selection | Choose which model generates the session summary | User insight | 2026-03-04 |
| 058 | Session ID generation | Unique session ID generated on load; embedded in export filenames | Core concept | 2026-03 |
| 059 | Tetrahedron logo | SVG wireframe tetrahedron in header; mathematically projected geometry; Necker cube illusion on blue vertex is emergent and intentional | Session discussion | 2026-03-04 |
| 061 | Provider color system | Distinct accent/bg/border color per provider; Claude gold, ChatGPT green, Gemini blue, Grok slate, Mistral orange, DeepSeek teal | Design decision | 2026-03 |
| 066 | API key test / validation | Test button per provider; preflight API call confirms key validity before session | User insight | 2026-03 |
| 074 | Welcome message | First-load greeting with CT framing; not a modal | Design decision | 2026-03 |
| 075 | Branding copy | Lowercase "triangulation" in welcome message is intentional — positions user as entering an epistemic practice, not a named product | Design decision | 2026-03-07 |
| 076 | Tetra carousel | Rotating subtitle in header cycling through all 8 named Tetras; settles on "your Crosstalk Lab"; click-to-replay; permanent branding, not onboarding element | Session discussion | 2026-03 |
| 077 | Named Tetras — initial set | Eight named Tetras: triangulation, reciprocity, the Agora, calibration, the In-Between, discourse, porosity, RIP | Session discussion | 2026-03 |
| 081 | Conductor mode | Sequential send where each model's response is passed to the next; conductor order configurable | Core concept | 2026-03 |
| 083 | Session vault — IndexedDB backend | Persistent file storage within browser session; files survive page refresh | Session discussion | 2026-03-13 |
| 084 | Session vault — auto-clear on navigation | Vault contents cleared on fresh navigation to enforce session boundary | Session discussion | 2026-03-13 |
| 085 | Tetra preset stub | Tetra section in left sidebar with placeholder carousel | Session discussion | 2026-03 |
| 086 | Hedra preset stub | Hedra section in left sidebar with placeholder carousel | Session discussion | 2026-03 |
| 087 | Left sidebar — constitutive zone | Left sidebar established as the constitutive zone: session configuration and setup decisions live here | Design decision | 2026-03 |
| 088 | Right sidebar — accumulative zone | Right sidebar established as the accumulative zone: session artifacts and history live here | Design decision | 2026-03 |
| 092 | Model card header — provider icon and label | Provider icon and name in each model card header; color-coded per provider | Design decision | 2026-03 |
| 093 | Input band | Persistent input area at page bottom; always visible; contains prompt field and send controls | Core concept | 2026-03 |
| 094 | Clip — CT-internal routing | Three fixed clip slots (one per model) in right sidebar; distinct from OS clipboard copy; session-scoped; clipped-at timestamp in pill | Session discussion | 2026-04-11 |
| 095 | Two-row input band | Target row and Dispatch row always explicit at every viewport width; encodes Target/Dispatch distinction ahead of CT-108 routing chip | Design decision | 2026-04-11 |
| 096 | Light mode | Light theme option; dark remains default; toggle in left sidebar Interface section; preference persists via localStorage | User insight | 2026-04-11 |
| 097 | Per-slot model version selector | Model selector in left sidebar Models section; dropdown per active slot showing live model list fetched from provider API; pending/confirmed state with ✕/✓ header buttons; localStorage persistence; preferred model patterns prevent landing on flagship models by default | Session discussion | 2026-06-17 |
| 099 | Expanded model support — Grok, Mistral, DeepSeek | Six-provider roster: Claude, ChatGPT, Gemini, Grok, Mistral, DeepSeek; three-slot UI unchanged; PROVIDER_META as single source of truth | Session discussion | 2026-05-22 |
| 101 | Light/dark mode localStorage persistence | Theme preference persists across sessions via localStorage | User insight | 2026-04-11 |
| 105 | Support and About links | Ko-fi, MDReader, and About CT in left sidebar Support section | Via Nagi | 2026-04-16 |
| 106 | Left sidebar — zone architecture | Constitutive zone finalized: Tetras, Hedras, Session Setup, Conducting, Models, Session, Interface, Support | Design decision | 2026-04-16 |
| 107 | Right sidebar — zone architecture | Accumulative zone finalized: File Vault, Cost stub, Session (clip slots, history) | Design decision | 2026-04-16 |
| 110 | Floating code panels | Code blocks in model responses render in floating overlay panels; prevents column-width blowout | Session discussion | 2026-04-16 |
| 111 | Conducting section — left sidebar | Conductor Order dropdowns in left sidebar constitutive zone; slot assignment is a session-shape decision, not configuration | Design decision | 2026-04-16 |
| 112 | Session Setup section — left sidebar | System prompt fields and session-level configuration in left sidebar Session Setup section | Design decision | 2026-04-16 |
| 117 | Orient inject — static briefing layer | Static orientation + brief files fetched from /briefs/ at inject time; UI prepends dynamic roster; acknowledgment instruction baked into end of static file; filename prefixes: orient-, tetra-, hedra-, hepta- | Session discussion | 2026-05-26 |

---

## Bugs

| # | Bug | Status | Date |
|---|-----|--------|------|
| B001 | Gemini response occasionally duplicates last token | `open` | 2026-03 |
| B020 | Model switching unresponsive when default model unavailable | `fixed` — 2026-06-17; root cause: setPendingModels nested inside setSelectedModels updater caused React batching to diverge pending/selected state; 'default' sentinel could propagate into selectedModels via confirm flow; fix: decoupled state updates, fetchSucceeded guard on both | 2026-06-17 |
| B021 | Model confirm button easy to miss | `fixed` — 2026-06-17; replaced bottom-of-list "Confirm changes" button with always-visible ✕/✓ header buttons in Models section label | 2026-06-17 |
| B022 | Orient inject — brief file load error | `fixed` | 2026-05-26 |

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
- Tandem mode naming settled 2026-06-02: Tandem (the mode), Sideband (the private human backchannel), Host/Partner (role names). Tagline candidate: "a confluence of voices." See fleeting-tandem-sideband-naming.md.
- Tandem UI geometry settled 2026-06-02: Tandem column is a single vertical slice added to the right of the three model columns — Tandem Controls (upper, flush with input band) and Partner panel (lower, flush with model columns). Input band stays full width unchanged. Width gate enforces minimum viewport for Tandem availability. See ct-multiuser-co-conduct-design.md.
- CT-097 model selector architecture (2026-06-17): fetchProviderModels fetches live model list from each provider's API using the user's key; results filtered and deduplicated to chat-capable models only; modelFamilyKey strips both Anthropic-style (8-digit) and OpenAI-style (YYYY-MM-DD) date suffixes before deduplication; PREFERRED_MODEL_PATTERNS applied when current selection isn't in the returned list to avoid landing on flagship models; selection persisted to localStorage per provider; ✕/✓ buttons in Models section header replace the previous bottom-of-list confirm button; single-screen confirm modal replaces previous two-step flow; CT_VERSION constant introduced at 1.1.0001, incremented to 1.1.0003 by end of session.
- Distributed metacognition in AI learning — ZK vault work pending (2026-06-17): thread from today's session requires extensive permanent note work in the vault. Not yet started.

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
| W011 | Distributed metacognition in AI learning | ZK permanent | proposed | — |

---
*Last updated: 2026-06-17*

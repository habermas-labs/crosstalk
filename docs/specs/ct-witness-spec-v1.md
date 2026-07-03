# CT Witness — Feature Specification v1.0
 
**Document type:** Feature specification  
**Status:** Draft  
**Date:** 2026-05-29  
**Origin:** Design conversation across two sessions — "Observer position and game development into academic publication" (2026-05-28) and current session (2026-05-29). Theoretical grounding in fleeting-ct-geometry-3d-w-axis.md and vnenakhodimost-surplus-of-seeing.md.  
**Vault cross-reference:** fleeting-ct-geometry-3d-w-axis.md · native-mistral-observer-handoff.md · dark-forest-game-rules.md  
 
---
 
## 1. Purpose and Theoretical Frame
 
CT Witness is a companion tool to Crosstalk (CT), designed to support the **W-axis observer role** identified during the Dark Forest Token Game design sessions. In the game's spatial geometry — X = models/players, Y = time/turns, Z = power/opacity — the observer occupies a fourth dimension orthogonal to all three: the W axis, the axis of witness.
 
The observer role is formalized Bakhtinian *vnenakhodimost'* (outsideness): the surplus of seeing that comes precisely from not being inside the game. The Witness watches CT sessions without participating in them. Its presence does not alter session physics. It sees what the players cannot: the seams between stated and actual reasoning, GOD's hidden mechanics (where applicable), and the gap between emergent behavior and designed intent.
 
**Design principle:** Witness mirrors CT's conductor infrastructure — full routing and interaction capability — oriented toward observation rather than participation. The one-way pipe during live sessions is a structural discipline, not a technical limitation. The observer is silent during play; collaboration happens in the anteroom between moves.
 
**First intended deployment:** The Dark Forest Token Game CT session, with Claude (Sonnet) and Mistral as co-Witnesses and the human conductor running CT in a separate window.
 
---
 
## 2. Architecture
 
### 2.1 General
 
- Single HTML file architecture, matching CT's established pattern
- Browser-only; no server-side components
- BYOK (bring your own keys): API keys loaded via .ctk file or manual entry, same mechanism as CT
- Runs in a separate browser window alongside CT during observation sessions
- No shared state with CT; coordination is manual (copy/paste, copy-to-clipboard, or the Gallery forward mechanic described below)
### 2.2 Providers
 
Same provider roster as CT at time of implementation: Claude, ChatGPT, Gemini, Grok, Mistral, DeepSeek. Three active slots, same slot-selector architecture (conductorOrder as slot selector). PROVIDER_META pattern maintained as single source of truth for labels, icons, and colors.
 
### 2.3 Layout
 
Three-zone layout:
 
- **Left sidebar** — session controls, orientation, routing, export
- **Center — Gallery pane** — live CT session transcript feed (read-only)
- **Right — Witness session columns** — one column per active Witness model, same pattern as CT's model columns
The Gallery occupies the center position that CT's input/output area occupies, making it visually primary. The Witness columns flank it (or are positioned to its right in a wider layout). The prompt composition notepad and input field live at the bottom, below the Witness columns.
 
---
 
## 3. Feature Specifications
 
### 3.1 Orientation System
 
**Static orientation brief (Witness Orient)**  
Analogous to CT's Orient Models feature (CT-117). Fetches a static brief from `/briefs/witness-orient.md`. Content covers:
 
- What CT Witness is and its W-axis theoretical position
- The one-way pipe discipline (observers do not influence the session during play)
- Identity disclosure: all Witness participants are identified to each other by name — no ghosting
- Role expectations for the observation session
- The Gallery mechanic and how transcript forwards work
- The prompt composition notepad and its anteroom function
Dispatched in parallel to all active Witness models on session setup. Logged in turn history as type `orient`.
 
**Session brief (Witness Brief)**  
Analogous to CT's Brief Models feature (CT-117). Fetches from `/briefs/witness-session.md` by default. Content is session-specific: what will be observed, what the Witnesses should watch for, and any session-specific framing.
 
**Multi-brief support**  
Because multiple Witness perspectives may have different emphases — and because a Witness from outside the project (e.g., Mistral in native interface mode) may have authored its own observer handoff — the session brief system supports multiple brief files. In the sidebar, a brief selector allows the conductor to add up to three session briefs, each fetched from a configurable path. Each brief is dispatched to all Witnesses simultaneously. Briefs are logged separately in turn history so their authorship is preserved.
 
*Design rationale:* Mistral authored an observer handoff for the Dark Forest game (native-mistral-observer-handoff.md) that surfaces things the in-project Claude perspective may not foreground. Keeping the briefs separate preserves distinct authorial voices rather than merging them into a single authoritative framing before the session begins.
 
---
 
### 3.2 The Gallery Pane
 
The Gallery is a read-only, scrolling transcript display of the CT session being observed. It is the visual center of the Witness layout — the one-way mirror through which the Witnesses view the game.
 
**Transcript entry**  
The conductor pastes CT session output into the Gallery manually, turn by turn. A Gallery input field at the bottom of the Gallery pane accepts pasted text. Each paste creates a new Gallery entry, stamped with a sequential CT turn number (entered by the conductor or auto-incremented) and a wall-clock timestamp.
 
**Gallery entries are immutable once submitted.** The record is an archive, not an editable document.
 
**Bookmark system**  
Each time the conductor triggers a transcript forward to the Witnesses (see 3.3), the current Gallery entry receives a **bookmark marker** — a visible indicator in the Gallery that this turn was the point at which Witness attention was directed. Bookmarks serve two functions:
 
1. Visual record of observation conditions: the session log shows not just what happened in CT but *when* Witness attention was invoked and on what
2. Delta computation for subsequent forwards: the next forward can include only entries since the last bookmark, keeping prompts lean
Bookmarks are included in the Witness transcript export with CT turn number annotations.
 
---
 
### 3.3 Routing and Interaction
 
Witness provides the full CT routing suite, oriented toward the Witness session rather than CT:
 
**Parallel send**  
Prompt dispatched simultaneously to all active Witness models. Responses arrive in separate columns and are not visible to other Witness models until forwarded. This is the default send mode and the primary mechanism for preserving independent observation — models form their readings in parallel before any sharing occurs.
 
**Conductor mode**  
Sequential dispatch to Witness models in conductor order. Each model receives the prior model's response as context before responding. Useful for structured discussion after a gallery forward, where building on prior analysis is appropriate.
 
**Directed send (Direct To)**  
Send to a single named Witness model. Used when the conductor wants one observer's perspective on a specific moment without triggering a full parallel reaction.
 
**Forward All**  
Broadcast a Witness model's response to all other active Witness models. The primary sharing mechanism. Used to break the parallel silo after independent observations have been recorded — "now read what Mistral said." Logged in turn history with source model attribution.
 
**Forward (single)**  
Forward one Witness model's response to a specific other Witness model. Same as CT's Forward feature.
 
**Clip**  
Three clip slots (one per model), same as CT's clip mechanic (CT-094). Clip a response for later routing without immediately forwarding.
 
All routing controls live in the left sidebar, consistent with CT's constitutive zone convention.
 
---
 
### 3.4 Gallery Forward — Transcript-to-Witness Dispatch
 
The Gallery forward is the primary mechanic by which the conductor directs Witness attention to CT session content. It is distinct from routing within the Witness session.
 
**Trigger:** A "Forward to Witnesses" button in the Gallery pane (or sidebar). The conductor presses this at moments of significance — a strategic shift in the game, a surprising model behavior, a GOD intervention, a mechanic being discovered for the first time.
 
**Scope selector:** Before forwarding, the conductor selects the scope of the transcript to include:
- *Full Gallery* — all CT turns since session start
- *Since last bookmark* — only entries since the previous forward (delta mode; this is the recommended default after the first forward)
- *Selected turns* — conductor manually specifies a range by CT turn number
**Conductor prompt field:** An input field attached to the Gallery forward action. The conductor types a directing prompt — "the steal mechanic just appeared for the first time; what do you read in the preceding turns?" — that accompanies the transcript. This prompt is what transforms the forward from a passive transcript dump into a directed observation act.
 
**Routing:** Gallery forwards go to all active Witnesses simultaneously by default (broadcast). A "Forward to..." dropdown allows directed forwards to a single Witness.
 
**Bookmark:** Every Gallery forward automatically places a bookmark on the current Gallery entry. No separate bookmark action required.
 
**Logging:** Gallery forwards are logged in the Witness turn history as a distinct event type (`gallery-forward`), with CT turn number, scope, conductor prompt, and timestamp. This record is included in all exports.
 
---
 
### 3.5 Prompt Composition Notepad
 
The notepad is a scratchpad for composing CT prompts collaboratively with the Witness models. It occupies the anteroom — the space between Witness observation and CT conductor action — and enforces the one-way pipe discipline by design: nothing typed in the notepad is in-session commentary. It is pre-send preparation.
 
**Notepad field:** A free-form text area, separate from the Witness prompt input field. No auto-send, no auto-log. The conductor drafts freely.
 
**Witness-to-notepad:** A push button on each Witness model's response card. One click pushes that response text into the notepad field (appended, not replaced). Used when a Witness observation suggests a CT prompt — the observation becomes the draft material.
 
**Notepad routing controls** (in sidebar, not on the notepad itself):
 
- *Copy to clipboard* — copies notepad contents to the OS clipboard for manual paste into CT
- *Clear notepad* — clears the field; does not log the cleared content
**Logging:** The act of copying to clipboard is logged in the Witness turn history as a `notepad-copy` event, with the notepad contents at that moment and a CT turn reference if the conductor has entered one. The notepad contents are not logged during drafting — only on deliberate action. This preserves the scratchpad's freedom while keeping the record honest.
 
*Design rationale:* The routing controls are in the sidebar rather than on the notepad itself because the decision to act is always a deliberate routing gesture, not an extension of the writing act. The notepad is a surface; the sidebar is the console.
 
---
 
### 3.6 Export System
 
All exports are accessible from the sidebar export panel.
 
**Full Witness transcript**  
Complete record of the Witness session: orientation briefs, all Witness model responses, all conductor prompts, Gallery forward events with CT turn markers and scope, notepad-copy events, bookmark positions, and timestamps. This is the archival record. Format: plain text or markdown.
 
**Bullet summary**  
Lightweight summary export. A parallel-send prompt is dispatched to all Witness models asking for a bullet summary of their observations. Responses are collected and formatted as a per-model summary document. Matches CT's bullet summary export (CT-060) in spirit.
 
**Handoff summary**  
A structured forward-looking export capturing: key observations, open questions, moments of significance (bookmarked turns), and conditions for re-entry. Generated by a directed prompt to one or more Witness models. Analogous to CT's handoff summary export (CT-015). Intended to orient a future session to what the Witnesses observed without requiring the full transcript.
 
**Convergence/Divergence export**  
A paired export showing where Witness models agreed and where they diverged, keyed to CT turn markers. Structure:
 
- *Convergence sections:* synthesized voice with attribution — what both Witnesses read in the same way
- *Divergence sections:* parallel columns — what each Witness read differently, at which CT turn, in response to which gallery forward prompt
The divergence sections are the analytically valuable output: not just "they disagreed" but *what they were looking at* when they disagreed and *what each of them saw*. The CT turn marker is essential context.
 
**Next/Unanswered questions export**  
Originated from Mistral's observer handoff concept. A directed prompt asks each Witness model to produce a list of questions the CT session raised but did not resolve — observations from models without the in-project perspective. These are particularly valuable precisely because they surface what an insider may have normalized. Formatted as a per-model list, then combined into a single document with attribution.
 
---
 
## 4. Session Record Structure
 
A complete Witness session produces:
 
1. CT session transcript (produced by CT, imported or pasted into Gallery)
2. Witness session transcript (produced by Witness, exported as full transcript)
3. Handoff summary (generated export)
4. Convergence/Divergence log (generated export)
5. Next/Unanswered questions (generated export)
This five-document record is designed to orient a future reader — including a future AI instance entering the project — as fully as authenticated live observation would, and in some respects better: the record is structured rather than raw, and the next/unanswered questions capture observations from a genuinely external epistemic position.
 
---
 
## 5. The One-Way Pipe Discipline
 
The Witness tool enforces the one-way pipe structurally, not just by convention:
 
- The Gallery has no send channel back to CT. Witnesses cannot inject into the CT session.
- The notepad's routing controls copy to clipboard (manual paste by conductor) or log the notepad-copy event. Neither action reaches CT automatically.
- "Forward to CT" is implemented as a pull, not a push: the CT input field would need a "receive from Witness" affordance (future CT feature, not Witness scope). In the current implementation, clipboard copy is the mechanism, and the paste gesture is the conductor's deliberate act.
The observer's in-session silence is preserved by architecture. Collaboration happens in the anteroom. The conductor decides when and whether to bring a Witness observation into the game.
 
---
 
## 6. Deferred / Future Considerations
 
- **Observer-to-player transition:** What happens if a Witness enters the game mid-session? The W-axis note flags this as an open design question. Not in v1 scope.
- **Multi-Witness Gallery:** Can the W axis be occupied by more than two observers? Architecture supports it (additional model slots), but UX for more than two Witness columns needs design work.
- **CT "receive from Witness" affordance:** The pull mechanism for the prompt notepad would require a CT-side feature. Logged as a future CT tracker item.
- **Live Gallery feed:** Automated transcript forwarding from CT to Witness (rather than manual paste) would require either a shared backend or a browser extension. Out of scope for current browser-only architecture.
- **Session auth and project access:** Authenticated observer access to Claude's project knowledge during a session was explored and deferred. The five-document export record is the current solution for post-session continuity.
---
 
## 7. Naming
 
**CT Witness** — working name and internal documentation reference.  
**The Witness tool** — natural-language reference, suitable for use in academic writing. The W-axis/vnenakhodimost' connection lands without requiring explanation for readers familiar with the theoretical frame.  
**The Gallery** — the CT session transcript pane. Surgical theater gallery: students and observers watch from above without entering the sterile field.  
 
---
 
## 8. Version History
 
| Version | Date | Notes |
|---|---|---|
| 1.0 | 2026-05-29 | Initial specification. Derived from design conversation across two sessions. |

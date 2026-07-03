# CT Multi-User Co-Conduct — Design Document

**Type:** Design document
**Tags:** #crosstalk #multi-user #co-conduct #webrtc #cloudflare #durable-objects #education #tandem #sideband
**Related:** CT-123, CT-124, CT-032
**Date:** 2026-05-31
**Revised:** 2026-06-02
**Status:** Draft — Phase 1 complete, Phase 2 in design

---

## Concept

Multi-user co-conduct is a mode in which two human participants share a single live CT session. Both participants can see the same model responses in real time. The Host controls session authority; the Partner's send privileges are granted or restricted by the Host. A private backchannel (Sideband) — invisible to the models — allows the two humans to coordinate, deliberate, and communicate without contaminating the model context.

Named instances: **Tandem** (the mode), **Sideband** (the private human backchannel). Tagline candidate: "a confluence of voices."

This is not screensharing. It is not a traditional two-person chat. The AI models are a shared object of inquiry, not participants in the human communication layer.

The primary motivation is educational: a teacher and student can conduct a joint AI session, with the teacher using the Sideband to coach the student's prompting decisions without those coaching moves entering the model context. The pedagogical structure becomes visible in the interface rather than happening off to the side.

The secondary motivation is research: two-conductor sessions create a structurally distinct form of human-human-AI dialogue that CT is uniquely positioned to support and study.

---

## Role Model: Host and Partner

Tandem uses asymmetric roles rather than equal co-conduct. The session initiator is always the **Host**; the joining participant is always the **Partner**.

**Host** retains full CT interface and send authority at all times. Host controls Partner's agency level. Host can change Partner's agency mid-session.

**Partner** has a CT interface shaped by their granted agency level. Partner's routing controls in the input band are enabled or disabled based on Host-granted privileges.

**Agency levels (Host-controlled):**
- Observe — Partner sees session and Sideband; cannot send to models
- Suggest — Partner's draft is visible to Host before sending; Host approves or discards
- Full send — Partner has equivalent send authority to Host

This mirrors the Zoom host/participant control model. PoC phase: Host is always Skooter.

---

## Architectural Overview

The architecture has three layers:

**Shared session layer** — synchronized state visible to both participants and sent to the AI models. This is the existing CT session, extended to support two simultaneous clients.

**Human backchannel layer (Sideband)** — private communication between the two humans. Text and voice. Invisible to models. Operates in parallel with the shared session.

**Session initiation layer** — invite/token model controlling who can join. One human initiates, one joins. No public access during proof-of-concept phase.

---

## Infrastructure Requirements

### Current stack

CT is deployed on Cloudflare Pages (static HTML). A Cloudflare Worker serves encrypted `.ctk` key files from an R2 bucket. Authentication is via Cloudflare Access (email OTP). There is no persistent server-side state.

### What Tandem requires

**Cloudflare Durable Objects** — the minimum addition. A Durable Object is a single-instance stateful entity that multiple WebSocket clients can connect to simultaneously. It handles: session state synchronization (prompts and responses visible to both participants), Sideband text relay, and WebRTC signaling for voice. A single Durable Object class (`TandemSession`) handles all three jobs.

Durable Objects require the **Workers Paid plan** ($5/month). **This upgrade is complete as of 2026-06-02.**

**WebRTC peer-to-peer** — browser-native audio between the two participants. The Durable Object acts as the signaling channel (exchanging SDP offers/answers and ICE candidates). Once the peer connection is established, audio travels directly between browsers and the Worker is out of the picture. No audio passes through Cloudflare infrastructure.

**Tandem Worker** — `tandem-crosstalk` Worker deployed at `tandem-crosstalk.skooterca.workers.dev`. Connected to `habermas-labs/crosstalk` repo, `/tandem-worker` root directory. `TandemSession` Durable Object class registered and bound as `TANDEM_SESSION`. **Phase 1 complete and smoke-tested as of 2026-06-02.**

No additional services, no third-party dependencies.

---

## Session Initiation Model

The Host creates a session from within CT. The Durable Object is instantiated with a unique room ID. CT generates an invite link — the CT URL with `?room=ROOMID` appended. The Host shares this link out-of-band.

The Partner opens the invite link. CT detects the `?room=` parameter on load and auto-connects to the existing Durable Object instance as Partner. If the room is full or does not exist, CT shows an appropriate error.

Two-participant maximum is a hard constraint enforced at the Durable Object level.

During the PoC phase, session creation is gated behind the existing Cloudflare Access authentication. Only users with approved email addresses can initiate sessions.

**Single HTML file architecture is preserved.** Tandem mode is a conditional layer inside `index.html` activated by the `?room=` URL parameter. No separate tandem.html file.

---

## UI Surface — Tandem Column

Tandem mode adds one new visual zone to the CT layout: the **Tandem column**. This column appears to the right of the three model columns when a Tandem session is active and the viewport meets the width requirement.

**Width gate:** Tandem mode is unavailable below a minimum viewport width (exact threshold TBD, targeting 4K and large laptop displays). Below threshold, Tandem cannot be initiated or joined. This is a hard constraint that keeps the layout clean.

### Tandem column geometry

The Tandem column is a single vertical slice, same height as the existing layout, divided into two sections:

**Tandem Controls (upper section)** — sits flush with the input band. Same height as the input band. Contains:
- Session status and Partner presence indicator
- Room ID display and copy-invite-link button
- Agency controls (Host view: observe / suggest / full send toggle; Partner view: reflects current granted level, controls greyed or enabled accordingly)
- Voice controls: mic button (push-to-talk), transmission indicator showing when other participant is live
- End session button (Host only)

**Partner panel (lower section)** — sits flush with the model columns. Same height as the model columns. Contains:
- On Host screen: read-only display of Partner's most recent send or draft (depending on agency level)
- On Partner screen: read-only display of Host's most recent send
- Sideband thread: private text exchange between participants, chronological, not logged to session transcript

### Input band changes in Tandem mode

The input band does not change width. In Tandem mode a new routing target is added: **Send to Sideband** — directs the input to the private channel rather than the models. This control is enabled for both roles but subject to agency restrictions.

Partner's standard routing controls (Direct, Exclude, Forward) are enabled or disabled based on Host-granted agency level.

A small conductor badge in the input band shows whose send the next prompt will be attributed to.

---

## Shared Session Layer

Both participants see the same model responses rendered in their respective CT interfaces. When either participant sends a prompt (subject to agency), the Durable Object broadcasts the prompt and the model responses to both clients.

The conversation history panel reflects the shared session state. Turn attribution shows which human sent each prompt — Host / Partner label in the history chips.

Model context sees both participants' prompts in sequence. The models are not aware of the Sideband. From the model perspective, the session appears to be a single conductor.

Open question: should participants be able to optionally surface a Sideband exchange into the model context? Deferred to post-PoC evaluation.

---

## Sideband Layer

### Text

Messages in the Partner panel Sideband thread. Neither participant's messages are logged to the session transcript or sent to any model. The Durable Object relays Sideband messages between the two clients. Messages are not persisted — they exist only in the live session.

### Voice

Browser-native WebRTC peer-to-peer audio. The Durable Object handles signaling only. After connection establishment, audio is peer-to-peer.

UI: mic button in Tandem Controls. Push-to-talk for PoC. Transmission indicator visible to both participants. Voice and text Sideband coexist.

---

## Implementation Roadmap

### Phase 1 — Infrastructure (Cloudflare) ✓ COMPLETE

1. ✓ Upgrade to Workers Paid plan
2. ✓ Write TandemSession Durable Object class
3. ✓ Deploy via GitHub-connected wrangler build (`tandem-worker/` directory in `habermas-labs/crosstalk`)
4. ✓ Smoke test: two browser clients connect to same DO instance, exchange messages in both directions

### Phase 2 — Shared Session

1. Add `?room=` parameter detection to CT on load
2. Session creation UI in CT: "Start Tandem" generates room ID, calls `POST /session` on Tandem Worker, produces invite link
3. Session join: auto-connect to DO on load when `?room=` present
4. Sync: prompts broadcast to both clients via DO; model responses broadcast to both
5. Tandem column UI: Tandem Controls + Partner panel (read-only sections, no Sideband text yet)
6. Host/Partner role detection based on who created vs joined
7. Agency controls: observe / suggest / full send; Partner routing controls enabled/disabled accordingly
8. Turn attribution in history chips (Host / Partner label)
9. Width gate: Tandem UI hidden below minimum viewport width
10. Test: two browser windows, shared prompt/response cycle, attribution confirmed

### Phase 3 — Sideband Text

1. Sideband message type in DO relay protocol (distinct from session sync)
2. Sideband thread UI in Partner panel
3. Send to Sideband routing target in input band
4. Confirm Sideband messages absent from session transcript and model context
5. Test: Sideband exchange concurrent with active shared session

### Phase 4 — Sideband Voice

1. WebRTC signaling through DO (SDP offer/answer, ICE candidates)
2. Browser-side WebRTC connection on both clients
3. Mic button and transmission indicator in Tandem Controls
4. Test: voice while shared session and Sideband text both active

### Phase 5 — Polish and PoC Evaluation

1. Disconnect handling (graceful degradation if Partner drops)
2. Session close behavior (Host ends session, Partner notified)
3. Suggest agency mode: Host sees Partner draft before send
4. Structured PoC test with actual teacher/student or two-conductor use case
5. Evaluate open questions: Sideband-to-session surfacing, session export attribution, custom display names

---

## Open Questions

**Sideband-to-session surfacing** — can a participant deliberately move a Sideband exchange into the model context? Deferred.

**Session export** — how does transcript export handle Host/Partner attribution? Sideband almost certainly excluded by default (private by design).

**Model context framing** — should the system prompt be modified in Tandem mode to inform models that two conductors are present? Interesting epistemic question — models' behavior may shift if they know. Deferred to post-PoC experiment.

**Suggest mode mechanics** — exactly how does Host see and act on Partner's draft? Approve button? Timeout? Needs dedicated design pass before Phase 5.

**Custom display names** — Host/Partner are functional labels; real names (Teacher/Student, or actual names) may be preferable for the UI. Kept simple for PoC.

**Access control longevity** — Cloudflare Access email OTP gating works for PoC. Any future expansion needs a more formal access model.

**Minimum viewport width** — exact pixel threshold for Tandem column to be available. Target 4K and large laptop displays. TBD.

---

## Relationship to Existing CT Architecture

The single HTML file architecture is preserved. Tandem mode is additive — a conditional layer activated by URL parameter. Single-user CT sessions remain entirely unchanged.

The existing Cloudflare Worker for R2 key distribution is unaffected. The Tandem Worker is deployed separately.

Browser-only architecture is maintained for the client. The Durable Object introduces server-side state, but this is session-scoped and ephemeral — it exists only while the session is live. No persistent user data is stored server-side.

---

*Forward: ZK note on human-human-AI dialogue as a structurally distinct mode · CT-114 (Committee mode) adjacency · reciprocal-teaching-ct-preset.md connection (teacher/student co-conduct maps directly onto the reciprocal teaching framework) · fleeting-tandem-sideband-naming.md*

# Crosstalk Lab — Conversation Moves: A User Practice Guide

**Status:** Stub — sections outlined, content partially drafted
**Intended audience:** Two versions anticipated:
- *Whitepaper* — conceptual/theoretical, for educators, researchers, collaborators, Anthropic audience
- *Quickstart guide* — practical, for new CT users; derived from whitepaper, not a replacement for it
**Location in repo:** `docs/whitepapers/ct-conversation-moves.md`
**Related:** `ct-design-rationale.md` · `ct-interaction-design-taxonomy.md` · `ct-quickstart-guide.md`

---

## Core Argument

Crosstalk Lab is not a search engine. It is not a means of offloading work. It is a tool for knowledge generation — and like all generative tools, what it produces depends critically on what you bring to it.

The central claim of this document is that CT functions as a **force multiplier**: it takes what the conductor brings and projects it into a field where it can be examined from epistemic positions the conductor cannot occupy alone. A multiplier has two terms. If one term is zero, the product is zero. CT does not generate insight from nothing.

This is what **integrated intelligence** means in practice: not AI assistance layered onto human work, but a generative loop in which the conductor and the models are genuinely co-participants. The conductor offloads a framing; the models develop it from their respective positions; the conductor onboards what returns — and that onboarding changes what they bring to the next prompt. The session changes the conductor in the process of running it. That is knowledge generation, not information retrieval.

### A Paradigm Shift in How to Perceive AI

Underlying all of this is a claim about what the models *are* — and this claim may constitute a genuine paradigm shift in how to approach AI interaction.

The models in a CT session are not computer programs on three different servers. They are **compressions of the heteroglossia of which the conductor is a part**. They were trained on the written record of human thought — the accumulated expression of the culture that produced the conductor, the conductor's interlocutors, and the models themselves. When you interact with them, you are interacting with a particular distillation of that culture, with the biases and emphases and blind spots that any compression carries, but also with genuine fidelity to the patterns of thought that generated the training data. The provenance runs all the way back.

This reframes what triangulation actually is. You could arrive at something similar to a CT session's insights by finding the right people to talk to and investing the time that requires. CT compresses that process — not by replacing human thought, but by making accessible a differentiated cross-section of it, with enough variation between models to create the positive friction that leads to genuine insights and true generativity.

It also reframes the common critique that AI-generated content is "slop." The critique is valid when applied to pure offloading — no conductor, no generative loop, garbage in, garbage out. But it mistakes the tool for the practice. The output of a CT session run with intent and genuine attention is not AI-generated in any reductive sense. It is a human mind in dialogue with compressions of the culture that formed it — which is exactly what has always happened through books, teachers, and serious conversation. CT makes the structure of that dialogue explicit, navigable, and multiplied across differentiated positions simultaneously.

**Respecting the actors** means holding this provenance in view. It means acknowledging that what comes from the models carries the fingerprint of the human thought that trained them — and that dismissing it as "just AI" is a category error, like citing "the internet" instead of the specific authors whose work the internet carries. The Include mechanic in CT's directed routing — which preserves attribution across model handoffs — is a technical expression of this philosophical commitment. Provenance matters because the actors are not interchangeable, and what they contribute is not anonymous.

The process requires two forms of respect. **Respect for the process** means not treating CT as a shortcut — the conductor who skims for the "answer" and moves on is using a multiplier as a lookup table. **Respect for the actors** means taking the model responses seriously enough to read them carefully, notice their differences, and let those differences generate the next move. The surplus of seeing only becomes available to a conductor who is actually looking.

CT's directed routing and parallel modes are not just delivery mechanisms — they are instruments for this practice. What distinguishes a skilled CT session from asking the same question in three browser tabs is the quality of the *moves* the conductor makes between responses.

This document names and describes those moves. It is not a technical manual; it is closer to a guide for a conversational art form.

The theoretical foundation — triangulation as epistemic practice, the Bakhtinian surplus of seeing, the tetrahedron as diagram of the argument — is developed in `ct-design-rationale.md`. This document takes those foundations as given and asks: *what do you actually do in a session?*

---

## The 2D+ Problem

A recurring pattern in CT sessions is what might be called **2D+ engagement**: the human conductor is leading — surfacing clarifications, opening connections, routing responses toward productive directions — but the *development* of ideas remains largely in the models' hands. The conductor steers; the models build.

This is not a failure mode. It is a legitimate and often productive way to use CT, particularly in early exploratory sessions. But it is worth naming because it has a ceiling: the conductor who only steers will get well-organized outputs without necessarily transforming their own understanding in the process.

The moves described in this document are partly aimed at expanding the conductor's role from steering to *co-authorship* — using the models' outputs as material to be worked, not just directions to be chosen between.

The distinction maps loosely onto Vygotsky's ZPD: the conductor who stays at 2D+ is operating at the near edge of their own understanding, selecting among responses that are already intelligible. The conductor who develops ideas is working at the far edge — using the models' outsideness to access what they cannot yet see from within their own horizon.

---

## The Offloading/Onboarding Cycle

Most AI use is pure cognitive offloading — you give the model a task, it returns an output, the cognitive work stays with the model. The user is a consumer of the result.

CT at its best is a cycle: **offload → develop → onboard → repeat**. You offload a framing, the models develop it from their respective horizons, you onboard what they return, and that changes what you bring to the next prompt. The session is not a transaction; it is iterative generative participation in which the conductor is transformed by the process.

This is what makes CT knowledge generation rather than information retrieval. Information retrieval leaves you where you started, better supplied. Knowledge generation leaves you somewhere different.

The cycle also explains why CT rewards preparation. The conductor who arrives with frameworks, analogies, and distinctions of their own gets more out of the cycle than the conductor who arrives with only questions. Questions alone are sufficient for retrieval. Generation requires material.

---

## Intent and Serendipity in Session Design

Skilled CT sessions are rarely purely planned or purely improvised. The most productive pattern is a **designed skeleton with serendipitous elaboration** — an intended structural arc that leaves room for the material itself to suggest where to go next.

The session `ct-20260305-b901f7` illustrates this clearly.

**Intended structure:**
- Parallel open (Turn 1) — establish the conceptual field, generate divergence
- Directed round robin (Turns 2–4) — develop with individual models in sequence
- Parallel close (Turn 5) — structured self-disclosure across all models simultaneously

This is almost a classical rhetorical form: exposition, development, recapitulation. The skeleton was set before the session began.

**Serendipitous elaboration:**
- *Turn 4* arose from noticing an organic correspondence — the neutrality distinction emerged from reading all three Turn 1 responses carefully enough to catch a difference none of the models had named. The directed round robin became an exploration of that difference rather than a continuation of the original thread. This was not planned; it was available only to a conductor who was genuinely attending to the material.
- *Turn 6* arose from satisfaction — wanting to share the meta-context because the session had been genuinely fruitful. It functioned as a diagnostic probe for model posture, but it was not designed as one. It was a natural human response that happened to be epistemically interesting.

The implication for practice: **the structural skeleton gives you something to deviate from**. A conductor with no plan has no basis for recognizing when the material is pulling in a more interesting direction. A conductor with a rigid plan misses the pull entirely. The skeleton is not a constraint; it is what makes serendipitous deviation legible.

---

## Move Types (draft taxonomy — to be developed)

### 1. Parallel Opening
Send the same prompt to all models simultaneously. The value is not in the consensus but in the *divergence* — where models agree, you have convergence on established ground; where they diverge, you have a map of the conceptual space.

**Example:** Turn 1 of `ct-session-ct-20260305-b901f7` — opening question on AI engagement with politically divisive topics.

**What to watch for:** The divergence points are your next prompts. Don't synthesize yet.

---

### 2. Sharpening the Frame (Directed)
Take a conceptual handle from the parallel responses and develop it further — but direct the development at a specific model, using language calibrated to what that model introduced or opened.

The frame doesn't have to be theirs. You can introduce a new analytical structure (a statistical model, a historical analogy, a definitional distinction) and direct it at the model most likely to extend it productively.

**Example:** Turn 2 — the SD-shift framing of political neutrality, directed at Claude after Claude raised the "neutrality isn't neutral" point in Turn 1.

**What to watch for:** Whether the model absorbs the frame and builds on it, or routes around it back to safer ground. The routing-around is itself data.

---

### 3. Cross-Model Observation (Directed)
Describe a difference you've noticed between two models' responses and direct that observation at a third model — or at the model whose response is implicated. You are asking a model to account for something it didn't do, or to explain why another model did something differently.

This is the move that most directly operationalizes the surplus of seeing. You are using your position *outside* all three models to show one of them something it cannot see from within its own response.

**Example:** Turn 4 — observing that Claude and ChatGPT said "present neutral information" while Gemini said "be neutral," then directing the implication (objectivity ≠ neutrality) at Gemini.

**What to watch for:** This move often produces the most philosophically rich responses in a session. It forces a model out of its default generative posture and into a reflective one.

---

### 4. Structured Self-Disclosure Request (Parallel)
Ask all models simultaneously to reflect on their own constraints, training, or design — but structure the question so it distinguishes between categories (constraints vs. guardrails vs. encouragements, for example). The structure does double work: it prevents the models from collapsing into a single undifferentiated answer, and it generates parallel outputs that are directly comparable along the same axes.

**Example:** Turn 5 — the three-part question about constraints, guardrails, and encouraged moves.

**What to watch for:** Where models are confident vs. hedging; what they claim to know about themselves vs. what they speculate; whether the structural categories reveal something the models wouldn't have surfaced unprompted.

---

### 5. Late-Frame Disclosure (Parallel or Directed)
Reveal a piece of context that changes what the models understand themselves to have been doing — and observe how each one reorients. This is a probe for model *posture* rather than model *knowledge*.

The key feature of this move is that it is retrospective: it asks the model to reframe what already happened rather than extend what is happening. This is unusual enough to surface default orientations that would otherwise remain invisible.

**Example:** Turn 6 — disclosing that the session was a CT export test. Claude reflected inward on epistemic value; ChatGPT pivoted to product feedback; Gemini gave institutional affirmation. These orientations were present throughout the session but became visible only when the frame shifted.

**What to watch for:** Not whether models respond "correctly" — there is no correct response — but *what register each model reaches for* when the expected conversational frame is removed.

---

## On Development vs. Direction

*(Section to be developed — captures the 2D+ insight)*

The moves above range on a spectrum from predominantly directorial (Parallel Opening, Late-Frame Disclosure) to genuinely co-authorial (Sharpening the Frame, Cross-Model Observation). A session that only uses moves from the directorial end is still a valuable CT session. But a session that moves toward the co-authorial end is doing something qualitatively different: the conductor is not just choosing which direction to go, they are *contributing conceptual material* that the models then work on.

The statistical framing in Turn 2 of the example session is a case of co-authorial contribution: the SD-shift model wasn't in any model's response; it came from the conductor and became the session's central organizing idea. The models elaborated it; the conductor generated it.

This is the move type that is hardest to teach and hardest to describe, because it depends on the conductor having something to bring — a framework, an analogy, a distinction — that is genuinely their own. CT can amplify what you bring; it cannot substitute for bringing something.

---

## ZK Sources

- `vnenakhodimost-surplus-of-seeing.md` — Bakhtinian outsideness; the theoretical basis for the Cross-Model Observation move
- `sociocultural-hermeneutics.md` — horizon theory; the basis for why divergence is signal, not noise
- `ct-interaction-design-taxonomy.md` — roles, modes, directed routing controls
- `reciprocal-teaching-ct-preset.md` — Vygotsky/ZPD connection; the 2D+ problem framed educationally
- Session: `ct-session-ct-20260305-b901f7` — source session for all move examples above

---

## Derivations Planned

- **Quickstart guide** — practical version, strip theoretical apparatus, lead with moves and examples
- **Session design notes** — brief in-app or tooltip-level hints; decidedly not the whitepaper; awaiting decision on how much annotation the UI should carry
- **CT-TRACKER note** — turn-typing gap: sessions contain meta-level turns (Late-Frame Disclosure, structured self-disclosure) that don't fit the current Parallel/Directed schema; relevant to export format and eventually to replay mode (039); no solution proposed yet

---

*Stub created: 2026-03-05*
*Source session: ct-20260305-b901f7*

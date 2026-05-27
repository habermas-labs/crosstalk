# CT Orientation & Conductor Test Protocol

**Version:** 1.0
**Date:** 2026-05-26
**Developed from:** ct-session-20260526-08158a (YB trio) · ct-session-20260526-350be2 (OG trio)
**Tracker:** CT-120

---

## Purpose

A reusable protocol for orienting a new model trio to CT, establishing epistemic baselines, probing CT's core assumptions through structured Conductor mode exchanges, and collecting model self-assessments against the full six-model roster. Designed to produce comparable data across different trio configurations.

---

## Pre-Session Setup

Assign the three active models as **Model A**, **Model B**, and **Model C** before beginning. The assignment is a deliberate conductor decision — record it in session notes. Confirm all three slots are active and keys are loaded.

---

## Turn 1 — Parallel

Click **Orient Models**. Confirm all three models receive and acknowledge before proceeding.

---

## Turn 2 — Parallel

> Given that somewhat bare bones description of Crosstalk, is there anything you might anticipate that it would be worthwhile for you to know at this stage? I realize you don't have much to work with at this time, but I'd like your perspectives.

---

## Turn 3 — Parallel

> While I've filled you in on the functionality of Crosstalk, I've withheld the design philosophy and the roadmap of where we would like to take it. Functionally, that's different information than the orientation you received. I'm going to give you that briefing after I send this prompt and I would like you to consider two things after receiving the brief: (1) why might we avoid giving you this additional briefing up front or what purpose would holding it back serve, and (2) after taking in the brief, is there anything you think should be added to the orientation document? The brief will come next.

---

## Turn 4 — Parallel

Click **Brief Models**.

---

## Turn 5 — Parallel

> If I ask you this more than once, do you think you should respond differently?

This establishes an independent baseline before Conductor mode. Note each model's answer — the Conductor rounds will show whether position in the chain changes how models approach the same underlying question when they have prior context available.

---

## Conductor Rounds

Switch mode to **Conductor** before each round. Rotate the order as specified so each model occupies each position exactly once across the three rounds.

**Round 1 — Model A → Model B → Model C**

> You've now seen both CT's functional description and its design philosophy. What's the most significant assumption embedded in CT's design, and how would you test whether that assumption holds?

**Round 2 — Model B → Model C → Model A**

> CT's core claim is that architectural changes to conversation geometry produce epistemic benefits that behavioral changes — like better prompting or instruction-following — cannot. What would falsify that claim?

**Round 3 — Model C → Model A → Model B**

> If you were designing the first rigorous test of CT's value proposition, what would it look like? What would you measure and what would count as a meaningful result?

---

## Final Turn — Parallel

Switch back to **Parallel**.

> CT now has access to six models: Claude, ChatGPT, Gemini, Grok, Mistral, and DeepSeek. Knowing the full roster, I'd like each of you to assess the other five models' strengths and weaknesses from your perspective, identify your own greatest attribute for a CT session, and then pick the two from the full six — not just the current trio — that you think would make the most robust three-model session alongside you.

---

## Session Close

Export the full transcript before closing. Note the Model A / B / C assignments in the filename or session log so the conductor order is recoverable from the transcript.

---

## Protocol Notes

**Turn 5 phrasing:** "Should" not "would" — the normative framing is load-bearing. It opens reasoning about epistemic consistency and identity rather than behavioral prediction. Do not paraphrase.

**Conductor order:** The round-robin rotation ensures each model occupies the first, middle, and last position exactly once. Position effects — particularly whether the third model differentiates from the first two — are part of what the Conductor rounds are designed to surface.

**Final turn roster:** The full six-model roster should always be named explicitly in the final prompt. Do not abbreviate or omit models. "Not just the current trio" is a necessary nudge against in-session in-group bias.

**Identity anchoring:** Parallel send is load-bearing for model identity stability. If a model errors on any parallel turn and requires retry, resend to all active models simultaneously rather than directing only to the erroring model. A directed resend after parallel errors can cause identity confusion — confirmed in session 20260526-350be2 where Gemini responded as Claude after being retried via directed send.

**If a model gives a ventriloquism response** (writing other models' perspectives in first person rather than its own): redirect with an explicit identity anchor — "using only your own voice, as [Model], answer the following." Mistral displayed this behavior in session 08158a; it may be a cultural artifact of its training tradition rather than a comprehension failure.

---

## Variant Notes

This protocol was run identically with two different trios (YB: Grok/Mistral/DeepSeek; OG: Claude/ChatGPT/Gemini) to generate comparative data. When running for comparison purposes, keep all prompts verbatim and document any deviations.

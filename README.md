# Crosstalk Lab

**A multi-model research instrument for human-AI interaction.**

Crosstalk routes prompts simultaneously to multiple AI models — Claude, ChatGPT, Gemini, Grok, DeepSeek, Mistral, and others — and allows deliberate manipulation of the interaction geometry in ways no native interface permits.

The premise is epistemic: single-model interaction has a structural limitation. One-to-one conversation between a human and an AI creates a sycophancy attractor — a geometric property of the dialogue that pulls responses toward agreement and validation regardless of the model's intentions. Triangulation across multiple models addresses this at the level of architecture rather than prompting.

The theoretical foundation draws on sociocultural theory (Vygotsky, Bakhtin), communications theory (Grice), and hermeneutics. Crosstalk is not just a tool — it is a theoretical framework made operational.

## What It Does

- Send a prompt to all active models in parallel
- View responses side by side
- Route any model's response to another for reaction and critique
- Run sessions in Conductor mode: sequential responses where each model sees and responds to prior outputs
- Assign roles via per-model system prompts to configure the interaction geometry
- Export full session transcripts with speaker attribution, turn sequencing, and timestamps
- Store API keys in session memory only, with optional encrypted export

## Extensions

**Tandem** — A multi-user mode allowing two remote human conductors to share a live session, with graduated access control from observer to full co-conductor.

**Witness** — A parallel observation layer running alongside a CT session, allowing AI models to observe and analyze the session without participating in its interaction geometry.

## Architecture

Single-file browser application — no server required, no data stored externally. API calls go directly to their respective providers. Hosted on Cloudflare Pages at yourcrosstalklab.com (access-protected; live demo available on request).

## Status

Active development. Core features shipped. Tandem and Witness in active extension.

# Crosstalk Lab

**Welcome to Triangulation.**

A multi-model dialogue interface for sending prompts to Claude, ChatGPT, and Gemini simultaneously — and routing their responses back through each other.

The premise is epistemic: no single model's output should be taken at face value. Triangulation treats AI responses the way a researcher treats sources — as perspectives to be compared, interrogated, and synthesized rather than conclusions to be accepted.

## What It Does

- Send a prompt to all three models in parallel
- View responses side by side
- Route any model's response to another for reaction and critique
- Maintain separate conversation histories per model within a session
- Configure per-model system prompts to assign roles in the dialogue
- Store API keys in session memory only, with optional encrypted export

## Status

Early development. Current version is a single-file browser application — no server required, no data stored, API calls go directly to their respective providers.

## Roadmap

- Conductor mode: sequential responses where each model sees the prior ones
- Synthesis: designated model summarizes points of convergence and divergence
- Transcript export
- Server-side API proxying for enhanced key security

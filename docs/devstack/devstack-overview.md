# Dev Stack — Layer Overview

A conceptual map of the full-stack environment underlying Crosstalk Lab and Codex Kitchen.
Ordered bottom-up: infrastructure first, user-facing last. Each layer has its own note file.
Cross-references indicate where understanding one layer depends on another.

---

## 1. DNS & Edge Networking
→ `devstack-dns-edge.md`

Every request to `yourcrosstalklab.com` or `codex.kitchen` begins here. DNS (Domain Name System) is the internet's phone book — it translates a human-readable domain name into an IP address so a browser knows where to send a request. But in a Cloudflare-hosted setup, DNS does more than route: it places Cloudflare's edge network *between* the user and your origin, meaning requests hit one of Cloudflare's ~300 global data centers before they ever reach your actual content. This is where caching, DDoS protection, and SSL termination happen. Understanding this layer clarifies why Cloudflare can enforce authentication (Access), run code (Workers), and serve your Pages app — all *before* your content is ever involved.

---

## 2. Hosting & Deployment
→ `devstack-hosting-deployment.md`

Cloudflare Pages is a static site hosting platform with a direct GitHub integration: when you push a commit to your repository, Pages automatically pulls the new code, builds it if needed, and deploys it to the edge. For a single-file app like the current Crosstalk prototype, "build" is essentially a no-op — the file is just copied to Cloudflare's network. This layer also covers the deployment pipeline itself: branches, preview deployments, and the distinction between a *static* site (pre-built files served as-is) and a *dynamic* site (code that runs on a server per request). Knowing where Pages ends and Workers begins is a key boundary in this stack.

---

## 3. Serverless Compute (Workers)
→ `devstack-workers-serverless.md`

A Cloudflare Worker is a small JavaScript function that runs at the edge — on Cloudflare's servers, not yours — in response to an HTTP request. "Serverless" means you write the function without managing or thinking about the server it runs on; Cloudflare handles scaling, uptime, and routing automatically. In this project, Workers serve as the bridge between the static frontend and resources that require server-side logic: the R2 key file retrieval endpoint is a Worker, and any future backend API layer would also live here. Workers run in a constrained environment (no filesystem, limited APIs, short execution time) which shapes what you can and can't do with them — and understanding those constraints explains several architectural decisions in this project.

---

## 4. Storage (R2, KV, IndexedDB)
→ `devstack-storage.md`

Storage in this stack spans two entirely different environments: *server-side* (Cloudflare R2 and KV, which live in the cloud) and *client-side* (IndexedDB, which lives in the browser). R2 is Cloudflare's object storage — analogous to Amazon S3 — used here to host the encrypted `.ctk` key files so they can be retrieved from any machine. KV (Key-Value store) is a simpler, faster Cloudflare storage product suited for small pieces of data that need to be read frequently. IndexedDB is a browser-native database that persists data locally across sessions without a server, making it the planned solution for conversation history in Crosstalk. Understanding which storage layer to reach for depends on who needs the data, how much of it there is, and whether it needs to persist, travel, or stay private.

---

## 5. Authentication & Identity
→ `devstack-auth.md`

Authentication answers the question: *who is this person, and should they be allowed in?* In this project that currently means Cloudflare Access, which gates the entire app behind an identity check before any content is served. Access supports several *identity providers* — Google OAuth, GitHub OAuth, one-time PIN via email — and you've used all three at different points. OAuth is a delegated authorization protocol: rather than managing passwords yourself, you hand off identity verification to a trusted third party (Google, GitHub) and receive a token confirming the user authenticated successfully. One-time PIN (OTP) skips the third party entirely and sends a time-limited code to the user's email. These are all strategies for the same problem; they differ in what trust infrastructure they rely on, what UX they produce, and what failure modes they introduce. This is the layer you flagged as least understood, so its note file will go deepest.

---

## 6. Security (Encryption & Key Management)
→ `devstack-security.md`

This layer concerns what happens to sensitive data — specifically API keys — once a user has been authenticated. The current solution uses the browser's native Web Crypto API to perform AES-256-GCM encryption entirely client-side: keys are encrypted in the browser, written to a `.ctk` file, and can only be decrypted with the correct passphrase. AES-GCM is an *authenticated encryption* scheme, meaning it provides both confidentiality (the data is unreadable without the key) and integrity (tampering with the ciphertext is detectable). PBKDF2 is the *key derivation function* that turns a human-chosen passphrase into a cryptographic key strong enough to use with AES. The reason this is handled in the browser rather than on a server is deliberate — it keeps keys out of transit entirely, which is a stronger security posture than server-side encryption for this use case.

---

## 7. API & Protocol Layer
→ `devstack-api-protocol.md`

This layer covers how your app talks to the outside world: HTTP, the fetch API, request/response structure, headers, and CORS. HTTP (HyperText Transfer Protocol) is the language of the web — every API call Crosstalk makes to Anthropic, OpenAI, and Google is an HTTP request with a method (POST), headers (authentication, content type), and a body (the prompt and parameters). CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts which domains a webpage can make API calls to, and why some calls require special server-side configuration to permit. Headers carry metadata about a request — including API keys, versioning, and CORS permissions — and understanding how they work explains several otherwise-mysterious configuration requirements in this project (the `anthropic-dangerous-direct-browser-access` header being a good example).

---

## 8. Frontend Runtime
→ `devstack-frontend.md`

The frontend layer is what runs in the browser: HTML, CSS, JavaScript, and in this project's case, React (loaded from a CDN rather than built with a bundler). The browser's JavaScript runtime is a sandboxed environment with access to the DOM (the rendered page), the fetch API (network requests), the Web Crypto API (encryption), and storage APIs (IndexedDB, sessionStorage). React is a library for building user interfaces declaratively — you describe what the UI should look like given a particular state, and React figures out the minimal DOM updates needed to get there. The current single-file architecture (everything in one `index.html`, Babel transpiling JSX at runtime) is a deliberate simplicity choice that trades build-step overhead for portability, but it comes with tradeoffs in performance and scalability that will eventually motivate a more conventional setup.

---

## Cross-Reference Index

| Concept | Layer | See Also |
|---|---|---|
| Cloudflare Access | Auth (5) | DNS & Edge (1) — Access runs at the edge |
| OAuth / OTP | Auth (5) | — |
| `.ctk` files | Security (6) | Storage (4) — R2 hosts them; Workers (3) serves them |
| CORS | API & Protocol (7) | Workers (3) — Workers set CORS headers |
| R2 | Storage (4) | Workers (3) — R2 is accessed via Workers |
| IndexedDB | Storage (4) | Frontend (8) — browser-native |
| Cloudflare Pages | Hosting (2) | DNS & Edge (1) — Pages is served from the edge |
| Workers | Serverless (3) | DNS & Edge (1), Storage (4) |
| AES-GCM / PBKDF2 | Security (6) | Frontend (8) — runs in the browser |
| fetch / HTTP | API & Protocol (7) | Frontend (8), Workers (3) |

---

*Created: 2026-03-03 | Project: Crosstalk Lab / Codex Kitchen*
*Next: expand devstack-auth.md — flagged as priority layer*

# Dev Stack — Authentication & Identity
`devstack-auth.md` | Layer 5 of 8 | See also: DNS & Edge (Layer 1)

Authentication answers: *who is this person, and should they be allowed in?*
Authorization answers: *what is this person allowed to do?*
These are often conflated but they're distinct problems. This project currently only does authentication — you either get in or you don't.

---

## Core Concept: The Authentication Problem

Your app has resources (the interface, eventually conversation history) that shouldn't be public during development. The naive solution is a password. The problem with a password is that you now have to manage it: store it somewhere, compare it against what the user typed, handle the case where they get it wrong, and decide how long they stay logged in. Authentication systems exist to solve this problem at scale and with better security properties than a hardcoded password check.

The fundamental mechanism in nearly every web authentication system is the same:

1. User presents a credential (password, code, token)
2. Something verifies that credential
3. If valid, the user receives a *session token* — a signed, time-limited proof that they authenticated
4. Every subsequent request carries that token; the server checks it rather than re-running the full auth flow

The differences between auth systems are mostly about *what kind of credential* is used and *who does the verification*.

---

## Cloudflare Access

Cloudflare Access is an authentication proxy that sits at the edge — in front of your app — and intercepts every request before it reaches your content. If the user has a valid session, the request passes through. If not, Access presents a login screen.

The key architectural point: **Access protects the entire origin, not just a route inside your app.** Your `index.html` never even loads until Access is satisfied. This is different from, say, building a login page inside your React app — in that case, the app loads and then decides whether to show content. Access gatekeeps at the network level, which is a stronger posture.

When a user authenticates through Access, Cloudflare issues a JWT (JSON Web Token — see below) that is stored as a cookie. On every subsequent request to your domain, that cookie is sent automatically, Access validates it, and the request passes through. From the browser's perspective, it just... works.

Access supports multiple *identity providers* — the thing that actually verifies who the user is. You've used three:

- **Google OAuth** — verification delegated to Google
- **GitHub OAuth** — verification delegated to GitHub  
- **One-time PIN** — verification handled by Cloudflare itself via email

---

## OAuth (Open Authorization)

OAuth is a protocol, not a product. It describes a standardized way for one service to delegate identity verification to another without ever sharing a password.

The problem OAuth solves: you want to let users log into your app using their Google account, but you never want Google to give you the user's Google password. That would be a security disaster — your app would have credentials it doesn't need and can't be trusted to protect.

### The OAuth Flow (simplified)

1. User clicks "Sign in with Google"
2. Your app redirects the user to Google's authorization server with a request: *"I need to verify this user's identity"*
3. Google shows its own login screen (your app never sees the password)
4. User authenticates with Google
5. Google redirects back to your app with a short-lived **authorization code**
6. Your app exchanges that code (server-to-server) for an **access token**
7. Your app uses the access token to ask Google: *"Who is this?"*
8. Google responds with the user's profile (name, email)
9. Your app now knows who the user is and creates its own session

The authorization code exchange in step 6 happens server-to-server — the token never passes through the user's browser, which prevents interception. This specific variant is called the **Authorization Code Flow** and is the standard for web apps.

### Key Terms

**Access Token** — A credential proving the user authorized your app to act on their behalf. Time-limited (typically 1 hour). Not the same as a session — it's a permission grant, not an identity assertion.

**ID Token** — A JWT containing claims about the user's identity (who they are). Separate from the access token. OpenID Connect (OIDC) is the identity layer built on top of OAuth that introduces the ID token — OAuth alone only handles authorization, not identity.

**Scopes** — The specific permissions being requested. `openid profile email` is the typical minimal set for identity verification. OAuth was originally designed for authorization (e.g., "allow this app to read my Google Drive"), and scopes define what access is being granted.

**Redirect URI** — The URL in your app that Google sends the user back to after authentication. Must be pre-registered with Google to prevent redirect attacks.

**Client ID / Client Secret** — Your app's credentials with Google. The Client ID is public (goes in the browser); the Client Secret is private (stays on the server). This is why OAuth requires a server-side component for the code exchange — you can't expose the Client Secret in frontend code.

In the context of Cloudflare Access: you register your app with Google (or GitHub), get a Client ID and Secret, and give those to Cloudflare. Access handles the entire OAuth flow on your behalf — you never implement it yourself.

---

## One-Time PIN (OTP)

OTP is conceptually simpler than OAuth. Instead of delegating to a third party, Cloudflare:

1. Asks the user for their email address
2. Sends a short numeric or alphanumeric code to that address
3. User enters the code
4. Cloudflare verifies it matches what was sent (and that it hasn't expired)
5. Session is issued

The trust model is different: OTP assumes that if someone can receive email at a given address, they are who they say they are. This is weaker than a password in some respects (email accounts can be compromised) but stronger in others (no password to phish or reuse). For a development-phase app with a small, known user list, it's a reasonable and low-friction choice.

The reason you switched from Google OAuth to OTP in this project was environmental — OAuth flows require a stable redirect URI and can behave unexpectedly across different networks. OTP has no such dependency; it just needs email delivery to work.

**TOTP** (Time-based One-Time PIN) is a related but distinct concept — this is what authenticator apps (Google Authenticator, Authy) generate. Rather than Cloudflare emailing you a code, your device generates one locally using a shared secret and the current time. Not currently used in this project but worth knowing the distinction.

---

## JWT (JSON Web Token)

JWTs appear throughout authentication infrastructure and are worth understanding on their own terms.

A JWT is a self-contained, signed data packet. It has three parts, separated by dots:

```
header.payload.signature
```

- **Header** — metadata about the token type and signing algorithm (base64-encoded JSON)
- **Payload** — the actual claims: who the user is, when the token expires, what they're allowed to do (base64-encoded JSON)
- **Signature** — a cryptographic signature that proves the token was issued by a trusted party and hasn't been tampered with

The key property: **a JWT can be verified without calling the issuer.** Anyone with the public key used to sign the JWT can verify its signature locally. This is what makes them efficient at scale — Cloudflare's edge nodes can validate Access JWTs without making a round-trip to an auth server.

JWTs are *not* encrypted by default — the payload is just base64-encoded, which is trivially reversible. They're signed, not secret. Don't put sensitive data in a JWT payload unless you're specifically using an encrypted variant (JWE).

---

## Session Management

Once a user authenticates, how does the app remember that?

**Cookie-based sessions** — The server sets a cookie containing either the session token itself (JWT) or an opaque ID that maps to session data on the server. The browser sends this cookie automatically on every request to the domain. Cloudflare Access uses this approach — the JWT lives in a cookie named `CF_Authorization`.

**Token-based (localStorage)** — The token is stored in localStorage and attached to requests manually via an Authorization header. More common in single-page apps that make explicit API calls. Generally considered slightly less secure than cookies because localStorage is accessible to JavaScript (XSS risk); cookies can be marked `HttpOnly`, making them invisible to scripts.

For this project, session management is entirely handled by Cloudflare Access — you don't write any of it. Understanding it matters for when you eventually build authenticated features inside the app itself (e.g., if user accounts or saved sessions ever become a feature).

---

## How This Connects to the Project

| Mechanism | Where used | Why |
|---|---|---|
| Cloudflare Access | Entire app during dev | Gate against public access before the app is ready |
| Google OAuth | Initial Access config | Familiar, low-friction for personal use |
| Email OTP | Current Access config | More reliable across networks; no OAuth redirect dependency |
| JWT | Issued by Access | Carried as `CF_Authorization` cookie; validated at edge on each request |
| Client-side crypto (not auth) | `.ctk` encryption | API key protection — separate problem from identity |

The last row is a reminder that encryption of API keys (`devstack-security.md`) is a *different problem* from authentication. Access answers "who are you"; AES-GCM answers "how do we protect your secrets at rest." They coexist but don't interact.

---

## Terms Glossary

| Term | One-line definition |
|---|---|
| Authentication | Verifying identity — who are you? |
| Authorization | Verifying permissions — what can you do? |
| OAuth | Protocol for delegating identity verification to a third party |
| OIDC (OpenID Connect) | Identity layer on top of OAuth; introduces the ID token |
| Access Token | Time-limited credential proving the user authorized your app |
| ID Token | JWT containing identity claims about the user |
| Scope | Specific permission being requested in an OAuth flow |
| Redirect URI | URL OAuth sends the user back to after authentication |
| Client ID / Secret | Your app's credentials with an OAuth provider |
| OTP | One-time PIN; single-use code sent to verify identity |
| TOTP | Time-based OTP; generated by authenticator apps using a shared secret |
| JWT | Signed, self-contained data packet; verifiable without calling the issuer |
| Session | Server-side record that a user is authenticated; referenced by a cookie or token |
| Cookie | Browser-stored key-value pair sent automatically with requests to a domain |
| `CF_Authorization` | The specific cookie Cloudflare Access uses to carry the session JWT |
| HttpOnly cookie | Cookie invisible to JavaScript; reduces XSS attack surface |

---

## Open Questions / To Explore

- When Crosstalk eventually has user accounts (for saved sessions, preferences), will Access remain the auth layer or will a custom auth system live inside the app?
- TOTP vs OTP tradeoffs for a multi-user version of Crosstalk
- How Access policies interact with Worker-authenticated endpoints (the R2 retrieval Worker has its own auth considerations)

---

*Created: 2026-03-03 | Project: Crosstalk Lab / Codex Kitchen*
*Parent: devstack-overview.md → Layer 5*
*See also: devstack-security.md (AES-GCM, PBKDF2), devstack-workers-serverless.md (Workers auth headers)*

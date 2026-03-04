# Security

This layer concerns what happens to sensitive data — specifically API keys — once a user has been authenticated. The auth layer (Cloudflare Access) answers "who are you." This layer answers "how do we protect your secrets even after you're in."

---

## The Problem Being Solved

API keys are credentials. If someone obtains yours, they can make API calls billed to your account, potentially drain your credits, and access whatever data those APIs can reach. The threat model for Crosstalk is specific: a single-user app where the keys need to be portable across machines but should never be exposed in transit or stored unencrypted.

The solution is client-side encryption: the keys are encrypted in the browser before they ever touch a file, using a passphrase only you know. The resulting blob is meaningless without that passphrase — even if the file is intercepted, copied, or stored somewhere public.

---

## AES-256-GCM

AES stands for Advanced Encryption Standard. It is the symmetric encryption algorithm used by essentially everyone for everything — your HTTPS connections, your encrypted drives, your password manager. "Symmetric" means the same key both encrypts and decrypts the data.

**256** refers to the key length in bits. A 256-bit key has 2^256 possible values — a number so large it's computationally infeasible to find by brute force with any technology that exists or is foreseeable.

**GCM** stands for Galois/Counter Mode, the operating mode. This is what makes AES-GCM an *authenticated encryption* scheme rather than just a cipher. It provides two guarantees simultaneously:

* **Confidentiality** — the data is unreadable without the key
* **Integrity** — any tampering with the ciphertext is detectable; a corrupted or modified file will fail to decrypt rather than silently producing garbage

The integrity guarantee is why we use GCM rather than older modes like CBC. A forged or corrupted `.ctk` file won't decrypt to bad data — it will throw an error, which is exactly what you want.

---

## PBKDF2

The problem with using a human-chosen passphrase directly as an AES key is that passphrases are predictable. People choose words, names, and patterns. A 256-bit AES key needs to be random across all 256 bits; a typical passphrase has far less actual entropy than that.

PBKDF2 (Password-Based Key Derivation Function 2) bridges this gap. It takes your passphrase and transforms it into a key suitable for AES through a process designed to be deliberately slow and computationally expensive:

1. Combine the passphrase with a random **salt** (a unique random value generated fresh for each encryption)
2. Run the combination through a hash function (SHA-256 in this implementation) **100,000 times** in sequence
3. The output of that process is the AES key

The 100,000 iterations serve a specific purpose: they make brute-force attacks against the passphrase impractical. An attacker trying to guess your passphrase has to run all 100,000 iterations for each guess. At modern hardware speeds, this limits guessing to thousands of attempts per second rather than billions — a difference that turns a guessable passphrase into an effectively uncrackable one for any reasonable passphrase.

The **salt** ensures that even if two people use the same passphrase, their derived keys are different. It also prevents precomputed attack tables (rainbow tables) from working, since the salt was never known when the table was computed.

---

## The Web Crypto API

All of this happens in the browser using the Web Crypto API — a native browser interface for cryptographic operations. This is significant for two reasons:

**It's fast** — the Web Crypto API is implemented natively in the browser engine, not in JavaScript. Cryptographic operations run at near-native speed rather than interpreted script speed.

**It's audited** — you're not using someone's custom crypto implementation. The algorithms are standard, the implementation is part of the browser itself, and the API is specified by the W3C. Using standard primitives rather than rolling your own is a fundamental principle of applied cryptography.

The relevant Web Crypto methods in Crosstalk's implementation:

```javascript
// Import a passphrase as raw key material for PBKDF2
crypto.subtle.importKey('raw', encodedPassphrase, 'PBKDF2', false, \['deriveKey'])

// Derive an AES-GCM key from the passphrase + salt
crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
  keyMaterial,
  { name: 'AES-GCM', length: 256 },
  false,        // not extractable — the key can't be read back out of the browser
  \['encrypt', 'decrypt']
)

// Encrypt
crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)

// Decrypt
crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
```

The `iv` (initialization vector) is a random 12-byte value generated fresh for each encryption. Like the salt, it ensures that encrypting the same data twice produces different ciphertext each time, which prevents certain classes of attack.

---

## The .ctk File Format

The exported `.ctk` file is a single base64-encoded string. Inside that string, three pieces of data are packed together in sequence:

```
\[ 16 bytes: salt ]\[ 12 bytes: IV ]\[ remaining bytes: ciphertext ]
```

When you import the file, the code reads the salt and IV from their fixed positions at the front, then uses them together with your passphrase to derive the key and decrypt the ciphertext. Without the passphrase, the salt and IV are useless — they're public values that only matter when combined with the secret you hold.

Base64 encoding converts the raw binary blob into printable ASCII characters, which is why the file opens as readable text in a text editor even though the actual content is encrypted binary data.

---

## What This Protects Against (and What It Doesn't)

**Protected:**

* Someone who finds or copies the `.ctk` file without knowing your passphrase
* The file being intercepted in transit
* The file being stored somewhere unintended (email attachment, cloud sync, etc.)

**Not protected:**

* Someone who has both the file and your passphrase
* Someone who can observe your screen or keystrokes when you enter your passphrase
* Malware running on your machine with access to browser memory
* A malicious browser extension with access to page content

The threat model this is designed for is a stolen or misplaced file — the most realistic risk for a portable credential file carried across machines. It is not designed to protect against a fully compromised machine, which is a fundamentally different (and much harder) problem.

---

## Multi-User Key Distribution

The single-user threat model above assumes one person with one set of keys. When you introduce other users — even a small trusted group — the security design changes in ways worth understanding explicitly.

### The Core Tension

The `.ctk` approach was designed for portability: one person carrying their own credentials across machines. Sharing a `.ctk` with other people introduces a different problem: **you no longer control who has access to the keys after the fact.** Once you share a file and a passphrase, anyone who received them can use the keys indefinitely, and you have no way to revoke access without rotating the underlying API keys themselves.

This isn't a flaw in the encryption — the encryption is still doing exactly what it's supposed to do. It's a property of symmetric encryption generally: the same mechanism that protects the file also makes it impossible to distinguish "authorized user who received the passphrase" from "unauthorized user who guessed or was given the passphrase." There is no revocation concept built in.

### Two Approaches and When to Use Each

**Approach A — Shared encrypted file, publicly accessible URL**

The `.ctk` file is uploaded to R2 with public access enabled. Anyone with the URL can download it; only someone with the passphrase can decrypt it. Authentication (knowing the passphrase) is the only gate.

*When this is appropriate:* Small trusted circles, demo use, situations where the underlying API keys are disposable (low credit limits, no sensitive data access, easy to rotate). The passphrase becomes the shared secret — treat it accordingly.

*The actual threat model:* A publicly accessible encrypted file is safe against anyone who doesn't have the passphrase. It is not safe if the passphrase leaks. Rotation means generating new keys, creating a new `.ctk`, uploading it, and distributing the new passphrase — there is no partial revocation.

In Crosstalk's demo setup, this is acceptable because the demo keys are intentionally limited: fixed spending caps, auto-renew off, created specifically for demo use and separate from the personal development keys. If the demo keys are compromised or exhausted, the blast radius is a few dollars and an afternoon of key rotation — not access to anything else.

**Approach B — Shared encrypted file, gated by Cloudflare Access**

The `.ctk` is served through the authenticated Worker endpoint. A user must pass the Access email OTP challenge before they can even retrieve the file, and then also supply the passphrase to decrypt it. Two independent gates.

*When this is appropriate:* Situations requiring genuine access control — you need to be able to add and remove specific people, you're sharing keys with higher credit limits, or you want an audit trail of who fetched the file and when (Cloudflare Access logs these requests).

*The actual threat model:* Access handles identity (this is a known email address that received and used an OTP). Encryption handles confidentiality (even if the file were somehow intercepted in transit, it's still encrypted). Removing someone from the Access whitelist prevents future fetches but doesn't invalidate a copy they've already downloaded — if that matters, you still need to rotate the underlying keys.

### The Two-Layer Principle

The architectural insight worth internalizing: **access control and encryption solve different problems and should be chosen accordingly, not substituted for each other.**

Access control (Cloudflare Access, a password, a gated URL) answers: *who is allowed to retrieve this file?* It can be revoked. It requires infrastructure to enforce. It fails if the infrastructure is misconfigured or bypassed.

Encryption answers: *if someone has this file, can they read it?* It cannot be revoked once the file and passphrase are known. It requires no infrastructure — it works offline, in transit, at rest. It fails if the passphrase leaks.

Using both together gives you defense in depth: an attacker needs to defeat both gates rather than just one. Using only access control (unencrypted file behind a login) is fragile — one misconfiguration exposes everything. Using only encryption (publicly accessible encrypted file) is durable but irrevocable. For sensitive long-lived credentials, use both. For disposable demo credentials with spending caps, encryption alone is a reasonable tradeoff.

### Spending Limits as a Security Control

For demo key distribution specifically, API spending limits are underrated as a security mechanism. A key with a $5 cap and auto-renew disabled can only ever cost $5 in the worst case — whether that's from authorized demo use, accidental overuse, or the key being shared beyond the intended circle. The cap converts an open-ended financial exposure into a bounded one.

This is a different kind of control than encryption or access gating: it doesn't prevent unauthorized use, but it limits the consequence of it. For low-stakes demo scenarios it's often the most practical first line of defense — cheap to implement, easy to understand, and self-limiting by design.

---

## Summary (updated)

|Concept|What it means in practice|
|-|-|
|AES-256-GCM|Symmetric authenticated encryption — confidentiality plus tamper detection|
|Symmetric encryption|Same key encrypts and decrypts|
|Authenticated encryption|Detects tampering; corrupted ciphertext fails rather than decrypts silently|
|PBKDF2|Turns a passphrase into a cryptographic key through deliberate slowness|
|Salt|Random value mixed into PBKDF2 to prevent precomputed attacks and key reuse|
|IV (initialization vector)|Random value mixed into AES-GCM so identical plaintexts produce different ciphertext|
|Web Crypto API|Browser-native cryptographic primitives — fast, audited, standard|
|Base64|Encoding that converts binary data to printable ASCII for file storage|
|Access control|Gate on who can retrieve a file — revocable, infrastructure-dependent|
|Encryption|Gate on who can read a file — irrevocable once passphrase is known, infrastructure-free|
|Spending limits|Cap on financial exposure from key misuse — not a confidentiality control, but limits blast radius|
|Defense in depth|Using access control and encryption together so an attacker must defeat both independently|


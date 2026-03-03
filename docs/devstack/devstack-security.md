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

- **Confidentiality** — the data is unreadable without the key
- **Integrity** — any tampering with the ciphertext is detectable; a corrupted or modified file will fail to decrypt rather than silently producing garbage

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
crypto.subtle.importKey('raw', encodedPassphrase, 'PBKDF2', false, ['deriveKey'])

// Derive an AES-GCM key from the passphrase + salt
crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
  keyMaterial,
  { name: 'AES-GCM', length: 256 },
  false,        // not extractable — the key can't be read back out of the browser
  ['encrypt', 'decrypt']
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
[ 16 bytes: salt ][ 12 bytes: IV ][ remaining bytes: ciphertext ]
```

When you import the file, the code reads the salt and IV from their fixed positions at the front, then uses them together with your passphrase to derive the key and decrypt the ciphertext. Without the passphrase, the salt and IV are useless — they're public values that only matter when combined with the secret you hold.

Base64 encoding converts the raw binary blob into printable ASCII characters, which is why the file opens as readable text in a text editor even though the actual content is encrypted binary data.

---

## What This Protects Against (and What It Doesn't)

**Protected:**
- Someone who finds or copies the `.ctk` file without knowing your passphrase
- The file being intercepted in transit
- The file being stored somewhere unintended (email attachment, cloud sync, etc.)

**Not protected:**
- Someone who has both the file and your passphrase
- Someone who can observe your screen or keystrokes when you enter your passphrase
- Malware running on your machine with access to browser memory
- A malicious browser extension with access to page content

The threat model this is designed for is a stolen or misplaced file — the most realistic risk for a portable credential file carried across machines. It is not designed to protect against a fully compromised machine, which is a fundamentally different (and much harder) problem.

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| AES-256-GCM | Symmetric authenticated encryption — confidentiality plus tamper detection |
| Symmetric encryption | Same key encrypts and decrypts |
| Authenticated encryption | Detects tampering; corrupted ciphertext fails rather than decrypts silently |
| PBKDF2 | Turns a passphrase into a cryptographic key through deliberate slowness |
| Salt | Random value mixed into PBKDF2 to prevent precomputed attacks and key reuse |
| IV (initialization vector) | Random value mixed into AES-GCM so identical plaintexts produce different ciphertext |
| Web Crypto API | Browser-native cryptographic primitives — fast, audited, standard |
| Base64 | Encoding that converts binary data to printable ASCII for file storage |

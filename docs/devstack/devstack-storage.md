# Storage

Storage in this stack spans two entirely different environments with different rules, different APIs, and different tradeoffs. Getting clear on which layer to reach for — and why — prevents a whole class of architectural mistakes.

---

## The Core Distinction

**Server-side storage** (Cloudflare R2, Workers KV) lives in the cloud. Data persists across sessions, devices, and users. Access requires a network request. You control who can read it.

**Client-side storage** (IndexedDB, sessionStorage, localStorage) lives in the browser on a specific machine. Data may or may not persist across sessions depending on which API you use. No network required. The user controls it — and can clear it.

Crosstalk currently uses both: R2 for the `.ctk` key file (needs to travel between machines), and session memory (React state) for API keys and conversation history (intentionally ephemeral). IndexedDB is the planned solution for conversation persistence.

---

## Cloudflare R2

R2 is Cloudflare's object storage product — conceptually identical to Amazon S3, which it was designed to replace. "Object storage" means you store arbitrary blobs of data (files, images, encrypted payloads) identified by a key, and retrieve them by that key. There's no folder hierarchy, no schema, no query language — just put and get.

### How you're using it

The `crosstalk-keys` bucket holds one object: `crosstalk-keys.ctk`. That's the encrypted key file you export from Settings. The bucket is not publicly accessible — requests go through the Cloudflare Worker, which handles authentication before handing over the file.

### Key properties

**No egress fees** — R2's defining advantage over S3 is that retrieving data doesn't cost anything beyond the storage itself. For a frequently-accessed file like the `.ctk`, this matters at scale (less so at your current usage level, but good to understand why Cloudflare made this choice).

**Not a database** — R2 is for files, not records. If you need to query, filter, or update structured data, you want KV or a real database. R2 is appropriate here because the `.ctk` is genuinely a file — a single opaque blob you read whole.

**Accessed via Workers** — you can't call R2 directly from the browser. The binding (`env.BUCKET`) is only available inside a Worker. This is architectural, not a limitation — it keeps your bucket credentials off the client entirely.

---

## Workers KV

KV (Key-Value store) is Cloudflare's simpler, faster storage product. You store string values under string keys, and retrieve them by key. Like R2 conceptually, but optimized for small, frequently-read pieces of data rather than large blobs.

### Properties worth knowing

**Eventually consistent** — KV is distributed across Cloudflare's global network. A write in one data center takes up to 60 seconds to propagate everywhere. This means if you write a value and immediately read it from a different location, you might get the old value. For most use cases (config data, feature flags, cached responses) this is fine. For anything where you need the absolute latest value on every read, it's a problem.

**Read-optimized** — reads are extremely fast because the data is cached at the edge near the user. Writes are slower and limited in rate. This shapes what KV is good for: data that's written infrequently and read often.

### Not currently in use

Crosstalk doesn't use KV yet. It becomes relevant if the project ever adds server-side session tracking, user preferences stored in the cloud, or any per-user data that needs to be accessible from multiple machines without going through R2.

---

## IndexedDB

IndexedDB is a browser-native database. Unlike `localStorage` (which stores simple key-value string pairs), IndexedDB is a full transactional database that can store structured JavaScript objects, binary data, and large amounts of data. It's available in every modern browser and persists across sessions — closing and reopening the tab doesn't clear it.

### Why it's the planned solution for conversation history

Conversation history in Crosstalk is structured data — objects with roles, content, timestamps, model identifiers, turn numbers. Storing that in `localStorage` would mean serializing and deserializing it as a string on every read and write, with a 5-10MB size limit. IndexedDB handles structured objects natively, has no practical size limit for this use case, and supports indexing so you can query specific conversations without loading everything.

The tradeoff is that IndexedDB has a notably awkward API. It's callback-based and verbose, designed in an era before Promises were standard. In practice, almost everyone uses a wrapper library — `idb` is the standard choice, a thin Promise-based layer over the native API that makes it usable.

### Scope and privacy

IndexedDB data is scoped to the origin — `yourcrosstalklab.com`'s IndexedDB is completely isolated from any other site's. The user can clear it through browser settings. It's never transmitted anywhere automatically. This makes it appropriate for conversation history: it's personal, local, and doesn't need to be shared across devices (unlike the `.ctk` file, which does).

### sessionStorage and localStorage

Two simpler browser storage options worth knowing by contrast:

**localStorage** — key-value string storage, persists indefinitely across sessions, scoped to origin, ~5-10MB limit. Good for small preferences or flags. Currently used by the devstack reader for annotations.

**sessionStorage** — identical to localStorage but cleared when the tab closes. Good for truly ephemeral data that shouldn't outlast a session.

Neither is appropriate for conversation history at Crosstalk's ambition level. IndexedDB is the right tool.

---

## Choosing the Right Storage Layer

| Need | Right layer | Reason |
|------|-------------|--------|
| File that travels between machines | R2 | Server-side, accessible via authenticated URL |
| Frequently-read config, per-user cloud data | KV | Fast edge reads, cloud-persistent |
| Conversation history, structured local data | IndexedDB | Rich queries, large capacity, browser-native |
| Small preferences, UI state | localStorage | Simple, immediate, no setup |
| Ephemeral session data | sessionStorage | Cleared on tab close automatically |
| API keys during active session | React state (memory) | Never touches disk, lost on close intentionally |

The last row is worth sitting with. The reason API keys live only in React state — not localStorage, not IndexedDB — is deliberate. Persisting them locally would mean they survive session close, which creates a window where someone with physical access to your machine could extract them. The `.ctk` file with its passphrase encryption is the intentional solution for persistence; unencrypted local storage is not.

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| Object storage | Store and retrieve arbitrary files by key — no schema, no queries |
| R2 | Cloudflare's object storage; no egress fees; accessed via Workers only |
| KV | Cloudflare's key-value store; fast reads; eventually consistent |
| IndexedDB | Browser database; structured objects; persists across sessions |
| localStorage | Browser key-value strings; persists across sessions; ~5-10MB limit |
| sessionStorage | Like localStorage but cleared when tab closes |
| Eventually consistent | Writes propagate globally over time; reads may be slightly stale |
| Origin scope | Browser storage is isolated per domain — sites can't read each other's data |

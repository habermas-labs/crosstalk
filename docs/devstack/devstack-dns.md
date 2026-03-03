# DNS & Edge Networking

Every request to `yourcrosstalklab.com` or `codex.kitchen` begins here, before any of your code runs, before Cloudflare Access checks who you are, before Pages serves a file. Understanding this layer explains why Cloudflare can do everything it does — authentication, caching, Workers execution — without you ever touching your app's code.

---

## What DNS Actually Does

DNS stands for Domain Name System. Its job is simple: translate a human-readable name (`yourcrosstalklab.com`) into a machine-readable IP address (`104.21.x.x`) so a browser knows where to send a request.

Without DNS, you'd navigate the web by IP address — the way you did when you typed `192.168.1.1` into a browser to configure a router. DNS is the layer that makes names work.

### The lookup chain

When you type `yourcrosstalklab.com` into a browser for the first time:

1. The browser checks its local cache — has it seen this name recently?
2. If not, it asks your operating system's DNS resolver
3. The resolver asks a **root nameserver** — the top of the hierarchy
4. The root nameserver points to the **TLD nameserver** for `.com`
5. The `.com` TLD nameserver points to the **authoritative nameserver** for `yourcrosstalklab.com`
6. That authoritative nameserver returns the IP address
7. The browser caches the result for however long the TTL (time to live) specifies, then connects

The whole chain typically takes under 100 milliseconds and is invisible to you. Once it's cached, subsequent requests skip to the end.

### Records

DNS is a database of records. The ones that matter for this project:

**A record** — maps a domain name to an IPv4 address. `yourcrosstalklab.com → 104.21.x.x`

**CNAME record** — maps a domain name to another domain name (an alias). `www.yourcrosstalklab.com → yourcrosstalklab.com`. The browser resolves the alias and then looks up the final name.

**MX record** — designates mail servers for a domain. Not used directly in this project but present on every domain that handles email.

**TXT record** — stores arbitrary text. Used for domain verification (proving to Google, GitHub, etc. that you own a domain), SPF/DKIM email authentication, and other purposes. You've encountered these during setup.

**NS record** — specifies which nameservers are authoritative for a domain. When you transferred `yourcrosstalklab.com` from GoDaddy to Cloudflare, the critical step was changing the NS records at GoDaddy to point to Cloudflare's nameservers. From that point forward, Cloudflare answers all DNS queries for your domain.

---

## Cloudflare's Edge Network

Changing your nameservers to Cloudflare doesn't just move DNS management — it inserts Cloudflare's entire edge network into the path of every request to your domain.

Cloudflare operates ~300 data centers globally, referred to as Points of Presence (PoPs). When a user makes a request to `yourcrosstalklab.com`, that request doesn't go to a server you own — it goes to the nearest Cloudflare PoP. Cloudflare then decides what to do with it: serve a cached response, enforce Access authentication, run a Worker, or proxy the request through to your origin (Pages).

This interception is what makes everything else in the stack possible. Cloudflare Access works by running at the edge — before a request reaches your content. Workers run at the edge. Caching happens at the edge. DDoS protection happens at the edge. None of this requires changes to your application.

### What "proxied" means in Cloudflare

When you set a DNS record in Cloudflare, you choose whether it's **proxied** (orange cloud) or **DNS only** (grey cloud).

**Proxied** — traffic flows through Cloudflare's edge. Your real server's IP address is hidden; users see Cloudflare's IP. All Cloudflare features (Access, Workers, caching, DDoS protection) apply.

**DNS only** — Cloudflare just answers the DNS query with your real IP. Traffic goes directly to your server. None of Cloudflare's edge features apply.

For `yourcrosstalklab.com` and `codex.kitchen`, the records are proxied. This is required for Cloudflare Access to work — if traffic bypassed the edge, Access would never see it.

---

## SSL/TLS and HTTPS

SSL (Secure Sockets Layer) and its successor TLS (Transport Layer Security) are the protocols that encrypt traffic between a browser and a server. HTTPS is HTTP over TLS — the `S` stands for secure.

When Cloudflare sits in front of your site, it handles TLS termination at the edge. This means:

- The browser connects to Cloudflare over HTTPS
- Cloudflare decrypts the request, processes it (Access check, Worker, etc.)
- Cloudflare connects to your origin (Pages) — also over HTTPS
- Cloudflare encrypts the response and sends it back to the browser

The certificate the browser sees is Cloudflare's — issued automatically, renewed automatically, zero configuration required on your part. This is one of the significant practical advantages of the Cloudflare setup over traditional hosting, where certificate management was a real ongoing task.

### Why this matters for API calls

Your browser only allows API calls to HTTPS endpoints from an HTTPS page. Since `yourcrosstalklab.com` is served over HTTPS via Cloudflare, this is satisfied automatically. If you load `index.html` directly from the filesystem (`file://`), you lose this — which is one reason some browser API features behave differently in local development.

---

## TTL and Propagation

TTL (Time to Live) is how long DNS resolvers cache a record before checking for updates. It's measured in seconds — a TTL of 300 means 5 minutes, 86400 means 24 hours.

When you make a DNS change (like transferring nameservers from GoDaddy to Cloudflare), the change doesn't take effect instantly everywhere. Every resolver that has the old record cached will keep using it until the TTL expires. This is "DNS propagation" — the process of old cached records expiring and being replaced by the new ones globally.

During the transfer you did, you likely saw a period where the site was live from some locations but not others. That's propagation in action. Cloudflare sets relatively low TTLs on their records (300 seconds) so changes take effect quickly once you're on their nameservers.

---

## How This Connects to the Project

| Action taken | DNS layer involved |
|---|---|
| Transferred `yourcrosstalklab.com` from GoDaddy to Cloudflare | Changed NS records at GoDaddy to point to Cloudflare nameservers |
| Registered `codex.kitchen` directly through Cloudflare | Cloudflare was the authoritative nameserver from day one — no transfer needed |
| Cloudflare Access gates `yourcrosstalklab.com` | Possible because traffic is proxied through Cloudflare's edge |
| HTTPS works without configuration | Cloudflare handles TLS termination automatically |
| Cloudflare Pages serves `index.html` | Pages is Cloudflare's origin; the edge proxies requests to it |

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| DNS | Translates domain names to IP addresses |
| A record | Maps name to IPv4 address |
| CNAME | Maps name to another name (alias) |
| NS record | Specifies authoritative nameservers for a domain |
| TXT record | Stores arbitrary text — used for verification, email auth |
| Edge network | Cloudflare's global PoPs that intercept traffic before it reaches your origin |
| Proxied | Traffic flows through Cloudflare edge — features apply, real IP hidden |
| DNS only | Traffic goes directly to your server — Cloudflare features don't apply |
| TLS termination | Cloudflare decrypts HTTPS at the edge, re-encrypts to origin |
| TTL | How long resolvers cache a DNS record before re-checking |
| Propagation | The delay while old cached records expire after a DNS change |

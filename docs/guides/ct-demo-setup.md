# CT Demo Infrastructure Setup

Setup guide for the Crosstalk Lab demo environment. Covers demo API keys, R2 public key file, the `demo/` directory, redirect configuration, and Cloudflare Access policy. Intended audience: Skooter.

---

## Overview

The demo environment is a controlled public-facing snapshot of CT, isolated from active development. Key properties:

- Lives at `yourcrosstalklab.com/demo/`
- Gated by a separate Cloudflare Access policy with a curated email whitelist
- Uses demo-specific API keys with spending caps and auto-renew off
- Demo `.ctk` file hosted as a public R2 object (no Worker required — encryption is the only protection needed)
- Demo `index.html` is a deliberate snapshot, not auto-synced with development

---

## Step 1 — Create Demo API Keys

Create separate keys for demo use. These are distinct from your personal development keys.

### Anthropic
1. Go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
2. Name it something clear: `crosstalk-demo`
3. Go to Billing → Usage Limits → set a monthly spend limit (e.g. $5)
4. Disable auto-recharge if not already off
5. Copy and save the key somewhere temporary — you'll need it in Step 3

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com) → API Keys → Create New Secret Key
2. Name it: `crosstalk-demo`
3. Go to Settings → Billing → Usage Limits → set a monthly limit (e.g. $5)
4. Disable auto-recharge
5. Copy and save the key

### Google Gemini
1. Go to [aistudio.google.com](https://aistudio.google.com) → Get API Key → Create API Key
2. Name it: `crosstalk-demo` (if the interface allows naming)
3. Note: Gemini has a free tier — use it for demo unless the provisioning issue recurs; no spend limit needed if staying on free tier
4. Copy and save the key

---

## Step 2 — Create the Demo `.ctk` File

Use CT's own Settings panel to generate the demo key file.

1. Open CT at `yourcrosstalklab.com`
2. Open Settings → Keys section
3. Enter each demo API key in the appropriate field (Claude, ChatGPT, Gemini)
4. Go to Export — enter a passphrase for the demo file
   - This passphrase will be shared with demo users, so keep it memorable but not one you use elsewhere
   - Suggested pattern: two common words + a number, e.g. `telescope-orbit-42`
5. Export → saves `crosstalk-keys.ctk` to your Downloads
6. Rename it to `crosstalk-demo-keys.ctk` to distinguish it from your personal file
7. Clear the demo keys from Settings and re-enter your personal keys (or reload from your personal `.ctk`)

---

## Step 3 — Upload Demo `.ctk` to R2 (Public)

Unlike your personal `.ctk` which is served through the authenticated Worker, the demo file goes directly into R2 with public access enabled.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → R2 → `crosstalk-keys` bucket
2. Upload `crosstalk-demo-keys.ctk`
3. After upload, click the object → go to its settings
4. Enable **Public Access** for this specific object
   - Note: This makes *this file only* publicly accessible at its R2 public URL — not the entire bucket
5. Copy the public URL — it will look like:
   `https://pub-[hash].r2.dev/crosstalk-demo-keys.ctk`
6. Save this URL — it goes in the Quick Start Guide

> **Security note:** The file is encrypted. Anyone with the URL can download it; only someone with the passphrase can use it. This is the intended threat model for demo distribution — the URL is semi-public, the passphrase is shared only with whitelisted users.

---

## Step 4 — Create the `demo/` Directory and Snapshot

### 4a — Copy the current index

1. Get the current commit hash of `index.html` from GitHub:
   - Go to your repo → click `index.html` → click the clock/history icon → copy the short hash of the most recent commit (e.g. `abc1234`)
2. Copy `index.html` → rename the copy to `demo-index.html`
3. Open `demo-index.html` in a text editor
4. Add this comment block immediately after the opening `<html>` tag:

```html
<!-- CT Demo Snapshot
     Source: index.html @ commit abc1234
     Snapshot date: 2026-03-04
     Features included through: CT-034 (Conductor order selection)
-->
```

Replace `abc1234`, the date, and the tracker entry with the actual values at snapshot time.

### 4b — Create the directory structure in GitHub

Cloudflare Pages deploys whatever is in the repo. To create the `demo/` directory:

1. In your GitHub repo, create `demo/demo-index.html` by uploading the file into a new `demo/` folder
2. Commit message: `chore: add demo snapshot from index.html @ abc1234 (through CT-034)`

---

## Step 5 — Configure Redirects

Cloudflare Pages uses a `_redirects` file at the repo root to handle URL routing.

If you don't already have a `_redirects` file, create one. Add this line:

```
/demo /demo/demo-index.html 200
```

The `200` means a *rewrite* (the URL stays as `/demo/` in the browser) rather than a redirect. This is what you want — clean URLs without exposing the filename.

If you already have a `_redirects` file, add the line to it without disturbing existing entries.

Commit message: `config: add /demo rewrite to _redirects`

---

## Step 6 — Configure Cloudflare Access for `/demo/`

You need a second Access policy scoped specifically to the demo path.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Zero Trust → Access → Applications
2. Your existing application covers `yourcrosstalklab.com` with the "Whitelist" policy — leave that alone
3. Create a **new application**:
   - Name: `Crosstalk Demo`
   - Application domain: `yourcrosstalklab.com`
   - Path: `/demo`
   - Session duration: your preference (24h is reasonable for demos)
4. Create a new policy for this application:
   - Policy name: `Demo Whitelist`
   - Action: Allow
   - Rule: Emails → add the email addresses of your demo users
5. Save and deploy

> **Important:** Cloudflare Access evaluates the most specific matching path first. The `/demo` application will intercept requests to `/demo/*` before the root application's policy applies. Your development paths remain protected by the original policy.

---

## Step 7 — Verify

Before sharing with anyone:

1. Visit `yourcrosstalklab.com/demo/` in a browser where you're not already authenticated
2. Confirm the OTP challenge appears
3. Complete auth with an email on the demo whitelist
4. Confirm `demo-index.html` loads correctly
5. Open Settings → URL Load tab → paste the R2 public URL for `crosstalk-demo-keys.ctk`
6. Enter the demo passphrase → confirm keys load
7. Run a test prompt to confirm all three models respond

---

## Ongoing Maintenance

**To promote a new snapshot to demo:**

1. Get the commit hash of the current `index.html`
2. Copy `index.html` → update the header comment with new hash, date, and tracker entry
3. Replace `demo/demo-index.html` in the repo
4. Commit: `chore: update demo snapshot from index.html @ [hash] (through CT-[number])`

**To add a user to the demo whitelist:**

Cloudflare Access → Applications → Crosstalk Demo → your policy → add their email.

**To rotate demo keys:**

Create new keys at each provider → generate a new `.ctk` → upload to R2 (overwrite) → share new passphrase with demo users. The URL stays the same.

---

*Created: 2026-03-04*

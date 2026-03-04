# Crosstalk Lab — Quick Start Guide

Welcome to Crosstalk Lab. This guide explains two ways to get started: using a shared key file that's already set up for you, and creating your own API keys if you want to run CT independently.

---

## What is Crosstalk Lab?

CT is a multi-model triangulation interface — it sends your prompts to Claude (Anthropic), ChatGPT (OpenAI), and Gemini (Google) simultaneously and displays their responses side by side. The point isn't to pick a winner; it's to compare how different models reason about the same question and find where they converge, diverge, or surprise each other.

It's a single web page. No installation, no account, no backend. Your API keys live only in your browser session and are never stored or transmitted anywhere except directly to each model's API.

---

## Path 1 — Use the Shared Key File (Quickest Start)

I've set up a shared encrypted key file that connects to API accounts I've created specifically for demo use. You'll need two things from me directly: the URL of the key file and the passphrase to decrypt it. If you don't have those yet, ask.

Once you have them:

1. Go to `yourcrosstalklab.com/demo/` — you'll be asked to verify your email with a one-time code
2. After logging in, click **⚙ Settings** in the top right
3. Scroll down to the **Key File (Encrypted)** section
4. Find the **Load from URL** area at the bottom of that section
5. Paste the key file URL into the first field
6. Enter the passphrase in the second field
7. Click **Load ↓**
8. You should see a green confirmation message — close Settings and you're ready to go

**A note on the shared keys:** These are demo accounts with modest spending caps. They'll work fine for exploring the interface but aren't intended for heavy use. If you want to do serious work with CT, Path 2 is the right move.

---

## Path 2 — Create Your Own API Keys

This path takes about 15 minutes and costs roughly $5–$10 to start (more if you want more headroom). You'll end up fully independent — your own accounts, your own keys, your own spending.

### Step 1 — Get an Anthropic API Key (Claude)

1. Go to [console.anthropic.com](https://console.anthropic.com) and create an account
2. Go to **API Keys** → **Create Key** — name it anything you like (e.g. `crosstalk`)
3. Copy the key immediately — you won't be able to see it again
4. Go to **Billing** → add a payment method and load at least $5 in credits
5. Recommended: go to **Usage Limits** and set a monthly spend cap so there are no surprises

The key starts with `sk-ant-`.

### Step 2 — Get an OpenAI API Key (ChatGPT)

1. Go to [platform.openai.com](https://platform.openai.com) and create an account
   - Note: this is separate from a ChatGPT subscription. The API and the chat interface are billed differently
2. Go to **API Keys** → **Create new secret key** — name it anything
3. Copy the key immediately
4. Go to **Settings → Billing** → add a payment method and load at least $5 in credits
5. Recommended: set a usage limit under **Usage Limits**

The key starts with `sk-`.

### Step 3 — Get a Google Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com) — sign in with a Google account
2. Click **Get API Key** → **Create API Key**
3. Copy the key

Gemini has a free tier for API access, so you may not need to add billing at all. Usage limits apply but are generous for moderate use.

The key starts with `AIza`.

#### If Gemini returns a quota error immediately

This is a known provisioning issue with new free-tier keys and has nothing to do with actual usage. The error looks like this:

> Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0

The key detail is **limit: 0** — Google issued you a key but never attached any quota to it. You haven't used anything; the bucket was empty from the start.

**The fix:**

1. Go back to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → **Create API key**
3. This time, select **"Create API key in new project"** — do not reuse the existing project
4. Copy the new key and use it in place of the original

Creating a new project forces Google's backend to provision quota correctly. The original key and project can be deleted.

**Before building your `.ctk` file**, verify the new key is working:

1. Open **⚙ Settings** in CT
2. Enter only the Gemini key — leave Claude and ChatGPT blank for now
3. Close Settings and send a simple prompt (e.g. "Hello")
4. If Gemini responds, the key is live — proceed to add your other keys and export your `.ctk`
5. If you get another quota error, repeat the new-project process above; it occasionally takes two attempts

### Step 4 — Create Your `.ctk` Key File

CT uses an encrypted key file (`.ctk`) to store your API keys portably. You create it from within CT itself.

1. Go to `yourcrosstalklab.com/demo/` and log in
2. Open **⚙ Settings**
3. In the top section, enter each of your three API keys in the appropriate fields (Claude, ChatGPT, Gemini)
4. Scroll down to **Key File (Encrypted)** → **Export**
5. Choose a passphrase — something memorable that you don't use elsewhere. You'll need this every time you load your keys
6. Click **Export .ctk** — a file called `crosstalk-keys.ctk` downloads to your computer
7. Keep this file somewhere you won't lose it (a USB drive, a synced folder, etc.)

Your keys are now stored in encrypted form. The `.ctk` file is useless without the passphrase — if someone finds the file, they can't use it.

### Step 5 — Load Your Keys Next Time

On any future session:

1. Open Settings → **Key File (Encrypted)** → **Import**
2. Enter your passphrase, then click **Import .ctk** and select your file
3. Your keys load and you're ready to go

Alternatively, if you host the file somewhere accessible (a personal cloud URL, a Cloudflare R2 bucket, etc.), you can use the **Load from URL** option instead of carrying the file around.

---

## Using CT — The Basics

**Sending a prompt:** Type in the text area and press Enter. By default this sends to all three models simultaneously (Parallel mode). Shift+Enter adds a line break without sending.

**Parallel vs Conductor:** The two send buttons at the bottom right give you two modes. **Parallel ↵** sends to all models at once — each model only sees your prompt. **Conductor ↵** sends sequentially in a configurable order — each model sees your prompt plus the responses of the models that went before it. Conductor is useful when you want models to react to each other rather than respond independently.

**Directing to one model:** Use the **Direct to** dropdown to route a prompt to a single model. When you're not sending to All, a single color-coded Send button appears in that model's accent color.

**Including a response:** Use the **Include** dropdown to attach one model's current response to your next prompt. This lets you ask another model to specifically react to what the first one said.

**Clearing the session:** The **Clear** button in the header resets everything — responses, history, and conversation state.

**Exporting:** The **Export ↓** button saves the full session as a formatted markdown file, including turn structure and mode information.

---

## A Few Things Worth Knowing

**Your keys never leave your browser** (except to go directly to each model's API). CT has no server of its own. Anthropic, OpenAI, and Google each receive only the prompts you send them — standard API usage, same as using their interfaces directly.

**Each session starts fresh.** CT doesn't store conversation history between sessions yet. If you close the tab, the session is gone. Export before closing if you want a record.

**API costs are per-token.** Each word sent and received costs a small amount. For typical exploratory use, a few dollars goes a long way — but if you're doing long sessions with large prompts, it adds up faster. The spending caps you set in Step 1 and 2 are your safety net.

**Gemini's free tier has rate limits.** If you get a quota error from Gemini, it may just mean you've hit the per-minute limit. Wait a moment and try again. If it persists, adding billing to your Google AI Studio account and switching to the paid tier resolves it.

---

*Crosstalk Lab is in active development. Features and UI may change between sessions.*

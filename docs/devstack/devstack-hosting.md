# Hosting & Deployment

Cloudflare Pages is where your code lives on the internet. Understanding how the deployment pipeline works — and what it's actually doing when you push a commit — removes the black-box feeling from a process you'll repeat constantly.

---

## Static vs. Dynamic Sites

This distinction shapes everything about how Crosstalk is hosted.

**A static site** is a collection of pre-built files — HTML, CSS, JavaScript, images — served exactly as they exist on disk. When a browser requests `yourcrosstalklab.com`, Cloudflare sends it `index.html`. No code runs on the server in response to that request. The file is the same for every visitor.

**A dynamic site** generates content at request time. When you load a page on a site like Reddit or a banking app, a server runs code, queries a database, assembles a response, and sends it back. Every request potentially produces a different result.

Crosstalk is static. `index.html` is the whole app. Cloudflare Pages is specifically designed for static sites — it's essentially a global file distribution system with a deployment pipeline attached.

The important nuance: "static" refers to *how the site is served*, not to whether the page is interactive. `index.html` is a sophisticated React application that makes live API calls. It's still a static site because the file itself doesn't change based on who's requesting it.

---

## Cloudflare Pages

Pages is Cloudflare's static hosting platform. Its core loop is:

1. You push code to a GitHub branch
2. Cloudflare detects the push via a webhook
3. Pages pulls the new code, runs a build step if configured
4. The built output is deployed to Cloudflare's edge network
5. Requests to your domain are served from the nearest PoP

For Crosstalk, the "build step" is essentially nothing — the output is `index.html` unchanged. Pages just copies it to the edge. For a project with a proper build system (React via Vite, for example), the build step would run `npm run build` and deploy the compiled output.

### The `_redirects` file

Pages uses a special file called `_redirects` to configure URL routing rules. One line per rule, format: `source destination status_code`.

```
/docs/devstack /devstack-index.html 200
```

This tells Pages: when someone requests `/docs/devstack`, serve `devstack-index.html` with a 200 OK status rather than redirecting. A 200 rewrite is invisible to the browser — the URL stays as `/docs/devstack` but the content comes from `devstack-index.html`. A 301 or 302 redirect would change the URL visibly.

The `_redirects` file lives in the root of your repository alongside `index.html`.

### Preview deployments

Every branch in your GitHub repository gets its own Pages deployment automatically. Push to a branch called `feature/conductor-ordering` and you get a URL like `feature-conductor-ordering.yourcrosstalklab.pages.dev`. This lets you test changes without affecting production.

The `main` branch is your production deployment — what `yourcrosstalklab.com` serves.

---

## GitHub Integration

The connection between GitHub and Cloudflare Pages is established once and then runs automatically. The mechanism is a **webhook** — GitHub notifies Cloudflare whenever a push happens to the connected repository.

From your perspective the workflow is:

```
Make changes locally → commit → git push → Cloudflare deploys automatically
```

The commit message you write becomes part of the deployment history in the Cloudflare Pages dashboard, which is useful for tracking what changed when. This is another reason the conventional commits format matters — a history of `feat:`, `fix:`, `docs:` entries is scannable; a history of "update" and "fix stuff" is not.

### What git push actually does

`git push` sends your local commits to the remote repository (GitHub). "Remote" here means any repository that isn't on your local machine. The `origin` remote (the default name) points to your GitHub repo.

```bash
git add .              # stage all changed files
git commit -m "docs: add storage layer"   # create a commit
git push origin main   # send commits to GitHub
```

`git add` stages files for the next commit — it tells git which changes to include. `git commit` packages those staged changes into a snapshot with a message. `git push` sends that snapshot to GitHub.

---

## Branches and the Main/Production Distinction

A **branch** in git is a parallel line of development. The `main` branch is the authoritative version of your project — what's deployed to production. Feature branches let you develop and test changes without touching main until they're ready.

For a solo project at this stage, you'll mostly work directly on `main`. Branches become more valuable when:

- You're working on something experimental that might not ship
- You want to test a change in a preview deployment before it goes live
- You're coordinating with another contributor

The Cloudflare Pages / GitHub integration treats `main` as production automatically based on the branch you specified during setup.

---

## Environment Variables and Secrets

Pages allows you to set environment variables in the dashboard — key-value pairs that are available to your build step or (for Workers) at runtime. For the current Crosstalk setup, you don't use these because there's no build step and API keys are managed client-side.

They become relevant if you ever add a backend Worker that needs credentials (a database connection string, an internal API key) — you'd store those as environment variables rather than hardcoding them in your code.

Never commit secrets (passwords, API keys) to a git repository. Even a private repository is a risk — access control can change, credentials can be scraped, and git history is permanent. The `.ctk` pattern for Crosstalk keeps secrets out of the repo entirely; environment variables are the server-side equivalent of that principle.

---

## The Deployment You Did

When you set up Crosstalk on Cloudflare Pages, you:

1. Created a GitHub repository at `habermas-lab/crosstalk` (or similar)
2. Connected it to a new Pages project
3. Specified `main` as the production branch
4. Cloudflare deployed the initial contents

Every subsequent `git push origin main` triggers an automatic redeployment. The Pages dashboard shows deployment history, status, and logs — useful for diagnosing a failed build or confirming a change went live.

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| Static site | Pre-built files served as-is — no server-side code runs per request |
| Dynamic site | Server generates content at request time |
| Cloudflare Pages | Static hosting platform with GitHub integration and edge distribution |
| Build step | Commands Pages runs on your code before deploying (empty for Crosstalk currently) |
| `_redirects` | File that configures URL routing rules in Pages |
| Webhook | GitHub notifies Cloudflare automatically when you push |
| Preview deployment | Automatic deployment of non-main branches to a separate URL |
| `git add` | Stage files for the next commit |
| `git commit` | Package staged changes into a snapshot with a message |
| `git push` | Send local commits to the remote repository (GitHub) |
| Environment variable | Key-value pair available at build or runtime — for secrets that shouldn't be in code |

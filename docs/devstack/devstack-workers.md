# Workers

Cloudflare Workers is a serverless compute platform that runs JavaScript at Cloudflare's edge network — meaning your code executes in data centers physically close to whoever is making a request, not in a single centralized server you own.

You've used Workers in one specific context so far: as the gatekeeper between the browser and your R2 bucket, serving the `.ctk` key file through an authenticated endpoint.

---

## What "Serverless" Actually Means

The word is a bit misleading. There are still servers — you just don't own, configure, or think about them. You write a function, deploy it, and Cloudflare decides where and how to run it. You pay (if at all) for the number of requests handled and CPU time consumed, not for a machine sitting idle.

For Crosstalk's purposes this is significant: you have no backend server of your own. Every API call in `index.html` goes directly from your browser to Anthropic, OpenAI, or Google. The Worker is the only server-side code in the whole project, and it has exactly one job.

---

## How a Worker Works

A Worker is a JavaScript module that exports a `fetch` handler — a function that receives an HTTP request and returns an HTTP response.

```javascript
export default {
  async fetch(request, env) {
    return new Response("Hello from the edge", { status: 200 });
  }
};
```

That's a complete, deployable Worker. When a request comes in, Cloudflare calls your `fetch` function with the request object and an `env` object containing any secrets or bindings you've configured (like an R2 bucket).

The runtime environment is intentionally constrained. Workers don't have access to a filesystem, can't run long background processes, and have a CPU time limit per request. That constraint is what makes them scale — thousands of instances can spin up in milliseconds across the globe.

---

## The Crosstalk Worker

The Worker you built serves one function: retrieve the encrypted `.ctk` file from R2 and return it to the browser.

```javascript
export default {
  async fetch(request, env) {
    // Only allow GET
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Retrieve the file from R2
    const object = await env.BUCKET.get('crosstalk-keys.ctk');
    if (!object) {
      return new Response('Not found', { status: 404 });
    }

    // Return it with CORS headers so the browser accepts it
    return new Response(object.body, {
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': 'https://yourcrosstalklab.com',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  }
};
```

`env.BUCKET` is not a variable you define — it's a *binding*, a named connection between your Worker code and an R2 bucket that you configure in the Cloudflare dashboard. The Worker never knows the bucket's internal credentials; Cloudflare handles the connection.

---

## Why a Worker Instead of Exposing R2 Directly

R2 buckets can be made publicly accessible, but that would mean anyone with the URL could download your `.ctk` file. Even encrypted, that's unnecessary exposure.

The Worker adds a middleware layer where you can check whether the request is authenticated before handing over the file. In your setup, Cloudflare Access handles authentication at the edge *before* the request even reaches your Worker — so by the time your code runs, you already know the request came from an authorized user.

This is the layered security model at work:

```
Browser request
  → Cloudflare Access checks email/OTP    ← outer gate
  → Worker receives authenticated request ← your code
  → R2 serves the file                    ← inner storage
```

None of these layers knows everything. Access doesn't know what's in R2. The Worker doesn't know your passphrase. R2 doesn't know who's asking. The system is secure because each layer only handles what it needs to.

---

## The `wrangler` CLI

Workers are deployed and managed with a command-line tool called `wrangler`. You encountered it briefly during the Cloudflare Pages setup when the dashboard defaulted to a Workers deploy command.

```bash
npx wrangler deploy    # deploy the Worker
npx wrangler dev       # run locally for testing
npx wrangler tail      # stream live logs from production
```

For Crosstalk, you've been deploying through the Cloudflare dashboard rather than the CLI. Both work — the dashboard is fine for a Worker with a single file and no build step.

---

## CORS and Workers

When a browser fetches a resource from a different domain, it sends a preflight OPTIONS request first, asking "is this allowed?" Your Worker has to respond correctly to both the preflight and the actual request.

The `Access-Control-Allow-Origin` header in the Worker response tells the browser which origin is permitted to read the response. Setting it to your exact domain rather than `*` (wildcard) is a deliberate security choice — only requests from your Crosstalk deployment can receive the file.

This CORS interaction is covered in detail in the API / CORS layer.

---

## Workers KV and Durable Objects (Not Used Yet)

Cloudflare offers two other storage products that Workers can bind to:

**Workers KV** — a distributed key-value store. Fast reads, eventually consistent. Good for configuration data, session tokens, feature flags — things that don't need strict consistency.

**Durable Objects** — strongly consistent objects with their own state. More complex, designed for real-time coordination like collaborative editing or game state.

Neither is in use for Crosstalk currently. If the project ever adds a server-side session or multi-user features, KV would likely be the first addition. IndexedDB (covered in the Storage layer) handles the client-side persistence needs for now.

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| Worker | A JS function deployed to Cloudflare's edge |
| `fetch` handler | The entry point — receives request, returns response |
| Binding | A named connection to a resource (R2, KV, etc.) — configured in dashboard, accessed via `env` |
| `wrangler` | CLI tool for deploying and testing Workers |
| Edge execution | Code runs geographically close to the user, not in a central server |
| CORS headers | Required on responses to cross-origin requests |

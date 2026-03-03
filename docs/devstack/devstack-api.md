# API / CORS

Every model call in Crosstalk is an HTTP request made directly from your browser to a third-party server. Understanding how that request works — and why CORS exists — removes a lot of the mystery from errors you have seen and will see again.

---

## HTTP Requests at a Glance

An HTTP request has a few components you interact with constantly in this project:

**Method** — what kind of action you are requesting. `POST` sends data and expects a response. `GET` retrieves a resource. `OPTIONS` is sent automatically by browsers before cross-origin requests (more on this below).

**URL** — where the request is going. For Claude: `https://api.anthropic.com/v1/messages`. For OpenAI: `https://api.openai.com/v1/chat/completions`. For Gemini: the URL includes the model name and your API key as a query parameter.

**Headers** — metadata attached to the request. Authentication, content type, versioning, and CORS-related permissions all travel here. Your API keys live in headers.

**Body** — the payload. For model calls, this is a JSON object containing the conversation history, model name, token limit, and any other parameters.

---

## What CORS Is

CORS stands for Cross-Origin Resource Sharing. "Origin" means the combination of protocol, domain, and port — `https://yourcrosstalklab.com` is one origin, `https://api.anthropic.com` is another.

Browsers enforce a security policy called the Same-Origin Policy: JavaScript running on one origin cannot read responses from a different origin unless that other origin explicitly permits it. This exists to prevent a malicious website from using your browser cookies or credentials to silently make authenticated requests to other services on your behalf.

The mechanism that provides the explicit permission is CORS — a set of HTTP headers the server returns that tell the browser "yes, I allow requests from this origin."

---

## The Preflight Request

For anything more complex than a simple GET, the browser sends a preflight OPTIONS request before the actual request. It is asking: "I want to send a POST with a Content-Type: application/json header and a custom Authorization header — is that okay?"

The server has to respond to the preflight with the right headers:

```
Access-Control-Allow-Origin: https://yourcrosstalklab.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, x-api-key
Access-Control-Max-Age: 86400
```

If those headers are missing or wrong, the browser blocks the actual request and you see a CORS error in the console — even though the server may have been perfectly willing to fulfill the request.

The three model APIs all handle CORS correctly for direct browser access. Anthropic additionally requires a special header:

```
anthropic-dangerous-direct-browser-access: true
```

This header exists because direct browser access is unusual and slightly risky — your API key is exposed in the browser environment. Anthropic makes you explicitly acknowledge that with the header rather than silently allowing it.

---

## How Crosstalk Makes API Calls

All three model adapters in index.html follow the same pattern. Here is the Claude adapter stripped down:

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    messages: conversationHistory
  })
});

const data = await response.json();
return data.content[0].text;
```

`fetch` is the browser's native HTTP function. It returns a Promise — an object representing a value that will exist eventually. `await` pauses execution until that promise resolves. `response.json()` parses the response body from JSON text into a JavaScript object.

The error handling path matters here. If the API returns an error — bad key, rate limit, malformed request — the HTTP status will still be 200 in some cases but the JSON body will contain an `error` field. That is why the adapters check `if (data.error) throw new Error(data.error.message)` rather than just trusting the status code.

---

## API Key Security in the Browser

API keys in index.html live in React state — JavaScript variables in memory. This is meaningfully different from being stored on disk, but it does mean they appear in the Network tab of browser devtools when requests are made.

The decision to use direct browser calls rather than a server proxy was deliberate. A proxy server would keep the keys entirely off the client, but adds infrastructure complexity and a server you would have to secure and maintain. For a single-user development tool accessed via Cloudflare Access, the browser-memory approach is an acceptable tradeoff. If Crosstalk ever becomes multi-user or publicly accessible, the key handling architecture would need to change.

---

## The Three API Response Shapes

Each model returns data in a different structure. This is why the adapters cannot be identical.

**Anthropic (Claude)** — Response text lives in `data.content[0].text`. The content array can contain multiple blocks (text, tool_use, image, etc.).

**OpenAI (ChatGPT)** — Response text lives at `data.choices[0].message.content`. The choices array exists because the API supports returning multiple response candidates simultaneously.

**Google (Gemini)** — Gemini nests the text deepest: `data.candidates[0].content.parts[0].text`. The parts array exists because a single response can contain mixed content types.

Knowing these shapes means you can debug API errors quickly: log `data` to the console before parsing it, and you will see immediately whether you got the expected structure or an error object.

---

## Rate Limits and Token Limits

**Rate limits** — how many requests you can make per minute or per day. When you hit a rate limit, the API returns a 429 Too Many Requests error.

**Token limits** — how much text can be in a single request or response. Tokens are roughly word fragments. The `max_tokens` parameter caps how long the response can be. The model's context window caps how much conversation history you can include. For Crosstalk's conversation history feature, token limits are the practical constraint on long sessions. Handoff summaries (tracker item 015) are the architectural solution.

---

## Summary

| Concept | What it means in practice |
|---------|--------------------------|
| Origin | Protocol plus domain plus port — browsers isolate these |
| CORS | Server-side permission for cross-origin browser requests |
| Preflight | Browser's OPTIONS check before a complex cross-origin request |
| fetch | Browser's native HTTP function, returns a Promise |
| await | Pauses execution until a Promise resolves |
| Rate limit | Maximum requests per time period — returns 429 when exceeded |
| Token | Unit of text length; models have context window limits |

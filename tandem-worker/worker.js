import { DurableObject } from 'cloudflare:workers';

/** 
 * Crosstalk Lab — Tandem Worker
 * Manages shared live sessions for two-human co-conduct (CT-123/124).
 *
 * Deployment checklist:
 *   - Durable Object binding name must be: TANDEM_SESSION
 *   - Durable Object class name: TandemSession
 *   - Worker route: tandem.yourcrosstalklab.com
 *   - Cloudflare Access policy must cover tandem.yourcrosstalklab.com
 *
 * Architecture:
 *   Each Tandem session is a single TandemSession Durable Object instance.
 *   Both participants connect to the same DO via WebSocket.
 *   The DO relays all messages between the two clients.
 *   Two-client maximum is enforced at the DO level.
 *
 * Message protocol (JSON):
 *   { type: 'session', payload: ... }   — shared CT session state (prompts, responses)
 *   { type: 'sideband', payload: ... }  — private human backchannel (text)
 *   { type: 'signal', payload: ... }    — WebRTC signaling (SDP, ICE candidates)
 *   { type: 'system', payload: ... }    — internal: join, leave, error notices
 */

const ALLOWED_ORIGIN = 'https://yourcrosstalklab.com';

export default {
  async fetch(request, env) {

    // ── 1. CORS preflight ───────────────────────────────────────────────────
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    // ── 2. Enforce origin ───────────────────────────────────────────────────
    const origin = request.headers.get('Origin');
    if (origin && origin !== ALLOWED_ORIGIN) {
      return new Response('Forbidden', {
        status: 403,
        headers: corsHeaders(),
      });
    }

    const url = new URL(request.url);

    // ── 3. Route: POST /session — create a new Tandem session ───────────────
    // Returns a room ID the initiator can share with the second participant.
    if (request.method === 'POST' && url.pathname === '/session') {
      const roomId = generateRoomId();
      const id = env.TANDEM_SESSION.idFromName(roomId);
      const stub = env.TANDEM_SESSION.get(id);
      // Touch the DO to instantiate it before the first participant joins.
      await stub.fetch(new Request('https://do/init'));
      return new Response(JSON.stringify({ roomId }), {
        status: 200,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      });
    }

    // ── 4. Route: GET /session/:roomId — join via WebSocket ─────────────────
    // Upgrades the connection to WebSocket and hands off to the DO.
    const match = url.pathname.match(/^\/session\/([a-z0-9]{8})$/);
    if (request.method === 'GET' && match) {
      const roomId = match[1];
      const id = env.TANDEM_SESSION.idFromName(roomId);
      const stub = env.TANDEM_SESSION.get(id);
      return stub.fetch(request);
    }

    return new Response('Not found', { status: 404, headers: corsHeaders() });
  },
};

// ── TandemSession Durable Object ────────────────────────────────────────────
// One instance per room. Holds up to two WebSocket connections.
// Relays messages between connected clients.
export class TandemSession extends DurableObject {

  constructor(ctx, env) { super(ctx, env); this.clients = []; } 


  async fetch(request) {
    const url = new URL(request.url);

    // Internal init call — no-op, just ensures the DO is alive.
    if (url.pathname === '/init') {
      return new Response('ok', { status: 200 });
    }

    // ── WebSocket upgrade ───────────────────────────────────────────────────
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 });
    }

    // Enforce two-client maximum.
    if (this.clients.length >= 2) {
      return new Response('Session full', { status: 409 });
    }

    const [client, server] = Object.values(new WebSocketPair());
    this.handleWebSocket(server);
    return new Response(null, { status: 101, webSocket: client });
  }

  handleWebSocket(ws) {
    ws.accept();
    this.clients.push(ws);

    const participantIndex = this.clients.length; // 1 or 2
    const otherClients = () => this.clients.filter(c => c !== ws);

    // Notify both participants of current connection state.
    this.broadcast({ type: 'system', payload: { event: 'join', participant: participantIndex, count: this.clients.length } });

    ws.addEventListener('message', event => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        ws.send(JSON.stringify({ type: 'system', payload: { event: 'error', message: 'Invalid JSON' } }));
        return;
      }

      // All message types are relayed to the other client.
      // The DO does not inspect or store payload content.
      for (const other of otherClients()) {
        try {
          other.send(JSON.stringify(msg));
        } catch {
          // Client may have disconnected — handled by close event.
        }
      }
    });

    ws.addEventListener('close', () => {
      this.clients = this.clients.filter(c => c !== ws);
      this.broadcast({ type: 'system', payload: { event: 'leave', count: this.clients.length } });
    });

    ws.addEventListener('error', () => {
      this.clients = this.clients.filter(c => c !== ws);
    });
  }

  // Send a message to all connected clients.
  broadcast(msg) {
    const text = JSON.stringify(msg);
    for (const client of this.clients) {
      try {
        client.send(text);
      } catch {
        // Ignore send errors on disconnected clients.
      }
    }
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function generateRoomId() {
  // 8 lowercase alphanumeric characters — short enough to share, unique enough for PoC.
  return Math.random().toString(36).slice(2, 10).padEnd(8, '0');
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':      ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods':     'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':     'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

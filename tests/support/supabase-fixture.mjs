import { createServer } from "node:http";
import { openPilotDatabase, registerPilot, rpcFields } from "./pilot-db.mjs";

const db = await openPilotDatabase();
const rejectedOnce = new Set();
const fixtureKey = "sb_secret_playwright_fixture_only";

function send(response, status, body) {
  response.writeHead(status, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

createServer(async (request, response) => {
  if (request.url === "/health") return send(response, 200, { ready: true });
  if (request.headers.apikey !== fixtureKey) return send(response, 401, { message: "Invalid fixture key" });

  if (request.method === "GET" && request.url === "/__test/responses") {
    const { rows } = await db.query("select * from griplab_private.pilot_signups order by created_at");
    return send(response, 200, rows);
  }

  if (request.method !== "POST" || request.url !== "/rest/v1/rpc/register_griplab_pilot") {
    return send(response, 404, { message: "Unknown fixture path" });
  }

  try {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (Object.keys(payload).length !== rpcFields.length || !rpcFields.every((field) => Object.hasOwn(payload, field))) {
      return send(response, 400, { message: "Unexpected RPC arguments" });
    }

    const email = payload.p_email;
    if (email.endsWith("@retry.example.test") && !rejectedOnce.has(email)) {
      rejectedOnce.add(email);
      return send(response, 503, { message: "Test-only simulated storage outage" });
    }

    await registerPilot(db, payload);
    response.writeHead(204).end();
  } catch {
    send(response, 500, { message: "Test database rejected the request" });
  }
}).listen(54331, "127.0.0.1");

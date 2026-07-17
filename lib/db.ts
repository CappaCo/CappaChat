import { Client } from "@db/postgres";

const databaseURL = Deno.env.get("DATABASE_URL");
if (!databaseURL) {
    throw new Error("DATABASE_URL is not set");
}

export const db = new Client(databaseURL);

console.info("connecting to db...");
await db.connect();
console.info("connected to db");

async function cleanup() {
    console.log("closing database...");
    await db.end();
    console.log("database closed");
}

Deno.addSignalListener("SIGINT", cleanup);
Deno.addSignalListener("SIGTERM", cleanup);

// maybe some sort of test query?

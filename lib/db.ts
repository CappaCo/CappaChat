import { Client, QueryArguments } from "@db/postgres";

const databaseURLString = Deno.env.get("DATABASE_URL");
if (!databaseURLString) {
    throw new Error("DATABASE_URL is not set");
}
const databaseURL: URL = new URL(databaseURLString);

const db = new Client({
    hostname: databaseURL.hostname,
    port: databaseURL.port,
    user: databaseURL.username,
    password: databaseURL.password,
    database: databaseURL.pathname.replace("/", ""),
    tls: {
        enabled: false,
    },
});

console.info("connecting to db...");
await db.connect();
console.info("connected to db");

async function cleanup() {
    console.log("closing database...");
    await db.end();
    console.log("database closed");
    Deno.exit();
}

Deno.addSignalListener("SIGINT", cleanup);
Deno.addSignalListener("SIGTERM", cleanup);

// test query
db.queryObject("SELECT CURRENT_TIME;")
    .then((response) => response.rows[0])
    .then((time) => {
        console.log("database queried at:", time);
    });

export async function query<T>(
    query: string,
    args?: QueryArguments,
) {
    const response = await db.queryObject<T>(query, args);
    return response.rows;
}

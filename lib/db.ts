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

export async function query<T>(
    query: string,
    args?: QueryArguments,
) {
    //const response = await db.queryObject<T>(query, args);
    const response = await db.queryObject<T>({
        text: query,
        args,
        camelCase: true,
    });

    return response.rows;
}

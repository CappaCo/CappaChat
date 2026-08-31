import * as cookie from "@std/http/cookie";
import * as crypto from "node:crypto";
import * as hex from "@std/encoding/hex";
import salt from "@/lib/adminSalt.ts";

import { kv } from "@/lib/kv.ts";

async function hash(input: string) {
    const inputBuffer = new TextEncoder().encode(salt(input));
    const hashBuffer = await crypto.subtle.digest("SHA-256", inputBuffer);
    return hex.encodeHex(hashBuffer);
}

// admin tokens
const adminTokensKVKey = "adminTokens";

export async function getAdminAuth(key: string) {
    const result = await kv.get(
        [adminTokensKVKey, await hash(key)],
    );
    return result;
}

export async function addAdminAuth(key: string) {
    const thing = await kv.set(
        [adminTokensKVKey, await hash(key)],
        "adminAuthKey",
    );

    if (!thing.ok) throw "thing not ok";

    return thing;
}

export async function checkAdminAuth(key: string) {
    const result = await getAdminAuth(key);

    if (result.value === null) return false;

    return true;
}

export async function listAdminAuths() {
    const list = kv.list({
        prefix: [adminTokensKVKey],
    });
    const things = [];
    for await (const thing of list) things.push(thing);
    return things;
}

export async function deleteAdminAuth(hash: string) {
    await kv.delete(
        [adminTokensKVKey, hash],
    );
    return { message: "deleted" };
}

export async function clearAdminAuths() {
    const list = kv.list({
        prefix: [adminTokensKVKey],
    });
    let count = 0;
    for await (const entry of list) {
        await kv.delete(entry.key);
        count++;
    }
    return { count };
}

// admin sessions
const adminSessionsKVKey = "adminSessions";

export async function getAdminSession(key: string) {
    const result = await kv.get(
        [adminSessionsKVKey, await hash(key)],
    );
    return result;
}

export async function checkAdminSession(key: string) {
    const result = await getAdminSession(key);

    if (result.value === null) return false;

    return true;
}

export async function createAdminSession() {
    const key = crypto.randomUUID();

    const thing = await kv.set(
        [adminSessionsKVKey, await hash(key)],
        "adminSessionKey",
    );

    // TODO: add some sort of expiry to the session token

    if (!thing.ok) throw "thing not ok";

    return key;
}

export async function listAdminSessions() {
    const list = kv.list({
        prefix: [adminSessionsKVKey],
    });
    const things = [];
    for await (const thing of list) things.push(thing);
    return things;
}

export async function deleteAdminSession(hash: string) {
    console.log("deleting thing");
    await kv.delete(
        [adminSessionsKVKey, hash],
    );

    return { message: "deleted" };
}

export async function clearAdminSessions() {
    const list = kv.list({
        prefix: [adminSessionsKVKey],
    });
    let count = 0;
    for await (const entry of list) {
        await kv.delete(entry.key);
        count++;
    }
    addMasterAuth();
    return { count };
}

export async function isAdminRequest(headers: Headers) {
    const adminAuth = cookie.getCookies(headers)["adminAuth"];

    if (adminAuth === undefined) return false;

    return await checkAdminSession(adminAuth);
}

// set up stuff ig
// TODO: get this from a .env file
async function addMasterAuth() {
    const password = Deno.env.get("CAPPACHAT_ADMIN_PASSWORD");
    if (password === undefined) {
        throw "CAPPACHAT_ADMIN_PASSWORD is not set";
    }
    await addAdminAuth(password);
}

addMasterAuth();

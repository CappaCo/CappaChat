import { getCookies } from "@std/http/cookie";
import * as crypto from "node:crypto";
import * as hex from "@std/encoding/hex";

import { kv } from "@/lib/kv.ts";

async function hash(input: string) {
    const inputBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", inputBuffer);
    return hex.encodeHex(hashBuffer);
}

// admin tokens
const adminTokensKVKey = "adminTokens";

export async function addAdminAuth(key: string) {
    const thing = await kv.set(
        [adminTokensKVKey, await hash(key)],
        "adminAuthKey",
    );

    if (!thing.ok) throw "thing not ok";
}

export async function checkAdminAuth(key: string) {
    const result = await kv.get(
        [adminTokensKVKey, await hash(key)],
    );

    if (result.value === null) return false;

    return true;
}

// admin sessions
const adminSessionsKVKey = "adminSessions";

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

export async function checkAdminSession(key: string) {
    const result = await kv.get(
        [adminSessionsKVKey, await hash(key)],
    );

    if (result.value === null) return false;

    return true;
}

export async function isAdminRequest(headers: Headers) {
    const adminAuth = getCookies(headers)["adminAuth"];

    if (adminAuth === undefined) return false;

    return await checkAdminSession(adminAuth);
}

// set up stuff ig
// TODO: get this from a .env file
addAdminAuth("cappa");

async function showAdminTokens() {
    const list = kv.list({ prefix: [adminTokensKVKey] });
    const things = [];
    for await (const thing of list) things.push(thing);

    console.log("adminTokens:", things);
}

showAdminTokens();

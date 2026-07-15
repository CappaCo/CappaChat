import { getCookies } from "@std/http/cookie";
import { randomUUID } from "node:crypto";

import { kv } from "@/lib/kv.ts";

function hash(input: string) {
    // TODO: implement this with some actual one-way hash function
    return input.split("").reverse().join("");
}

const adminTokensKVKey = "adminTokens";
export async function checkAdminAuth(key: string) {
    const result = await kv.get([adminTokensKVKey, hash(key)]);

    if (result.value === null) return false;

    return true;
}

export async function addAdminAuth(key: string) {
    const thing = await kv.set([adminTokensKVKey, hash(key)], key);

    if (!thing.ok) throw "thing not ok";
}

const adminSessionsKVKey = "adminTokens";
export async function checkAdminSession(key: string) {
    const result = await kv.get([adminSessionsKVKey, hash(key)]);

    if (result.value === null) return false;

    return true;
}

export async function createAdminSession() {
    const key = randomUUID();

    const thing = await kv.set([adminSessionsKVKey], hash(key));

    // TODO: add some sort of expiry to the session token

    if (!thing.ok) throw "thing not ok";

    return key;
}

export function isAdminRequest(headers: Headers): boolean {
    const adminAuth = getCookies(headers)["adminAuth"];
    return !!(adminAuth && checkAdminSession(adminAuth));
}

// set up stuff ig
// TODO: get this from a .env file
addAdminAuth("cappa");

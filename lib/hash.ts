import { crypto } from "@std/crypto";
import * as hex from "@std/encoding/hex";

export async function hash(input: string): Promise<string> {
    const inputBuffer = new TextEncoder().encode(salt(input));
    const hashBuffer = await crypto.subtle.digest("SHA-256", inputBuffer);
    return hex.encodeHex(hashBuffer);
}

function salt(input: string): string {
    return "44b5a2aac9c08fd197c70272c6e7c700aa2710e0b334ee1002583e7407eb5dee" + input;
}

import * as argon2 from "@felix/argon2";

const secret = new TextEncoder().encode(
    "44b5a2aac9c08fd197c70272c6e7c700aa2710e0b334ee1002583e7407eb5dee",
);

export async function hash(password: string): Promise<string> {
    return await argon2.hash(password, { secret });
}

export async function verify(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password, secret);
}

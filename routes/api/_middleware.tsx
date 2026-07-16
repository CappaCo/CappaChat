import { define } from "@/lib/utils.ts";
import { AuthType } from "@/lib/types.ts";

// https://usefresh.dev/docs/concepts/middleware
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418

// basic global rate limiting
const rateLimit = 100;
type Seconds = number;
const rateLimitReset: Seconds = 60; // one minute
let rateLimitCounter = 0;

const rateLimiting = define.middleware(async (ctx) => {
    console.log("rate limiting at:", rateLimitCounter);
    if (rateLimitCounter > rateLimit) {
        return new Response(
            JSON.stringify({
                message: "429 too many requests, global rate limit",
            }),
            {
                status: 429,
            },
        );
    }

    rateLimitCounter++;

    return await ctx.next();
});

const resetRateLimiterInterval = setInterval(function resetRateLimiter() {
    if (rateLimitCounter !== 0) console.log("rate limit reset");
    rateLimitCounter = 0;
}, 1000 * rateLimitReset);

console.log("resetRateLimiterInterval:", resetRateLimiterInterval);

// auth validation
const authValidation = define.middleware(async (ctx) => {
    console.log("API auth middleware running");

    const auth = ctx.req.headers.get("Authorization");
    console.log("auth:", auth);

    function getAuth(auth: string | null): [AuthType, string] {
        if (auth === null) {
            return ["None", ""];
        }
        const split = auth.split(" ");

        if (split.length !== 2) throw "bad format";

        const authType = split[0];

        if (
            !(
                authType === "User" ||
                authType === "Bot"
            )
        ) throw "auth type not user or bot";

        return [
            authType,
            split[1],
        ];
    }

    let authType, authToken;
    try {
        [authType, authToken] = getAuth(auth);
    } catch (error) {
        console.log("auth error:", error);

        return new Response(
            JSON.stringify({
                message: "401 Unauthorized",
            }),
            {
                status: 401,
            },
        );
    }

    ctx.state.authType = authType;
    ctx.state.authToken = authToken;

    return await ctx.next();
});

export default [rateLimiting, authValidation];

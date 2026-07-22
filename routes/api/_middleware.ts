import { define } from "@/lib/utils.ts";

// https://usefresh.dev/docs/concepts/middleware
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418

// basic global rate limiting
const rateLimit = 10000;
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

const _resetRateLimiterInterval = setInterval(function resetRateLimiter() {
    if (rateLimitCounter !== 0) console.log("rate limit reset");
    rateLimitCounter = 0;
}, 1000 * rateLimitReset);

// automatically set json headers for api
const JSONHeaders = define.middleware(async (ctx) => {
    ctx.state.isJsonReturn = true;

    const response = await ctx.next();

    if (ctx.state.isJsonReturn) {
        response.headers.set("Content-Type", "application/json");
    }

    return response;
});

export default [rateLimiting, JSONHeaders];

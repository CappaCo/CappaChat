import { define } from "@/lib/utils.ts";

export default define.middleware(async (ctx) => {
    if (ctx.state.requestingUser === undefined) {
        return new Response(
            JSON.stringify({
                message: "you aren't logged in loser, scram 🫳🫳🫳",
            }),
            {
                status: 302,
                headers: {
                    "Location": "/",
                },
            },
        );
    }

    return await ctx.next();
});

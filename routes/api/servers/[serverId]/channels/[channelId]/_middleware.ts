import { define } from "@/lib/utils.ts";
import { Id } from "@/lib/types.ts";

// https://usefresh.dev/docs/concepts/middleware

export default define.middleware(async (ctx) => {
    console.log("Channel middleware running");

    const authToken = ctx.state.authToken;

    function checkAuth(authToken: string) {
        // this function will check if the token is allowed to use the resource
        // TODO: implement this
        console.log("checking authToken:", authToken);
        return true;
    }

    if (!checkAuth(authToken)) {
        return new Response(
            JSON.stringify({
                message: "403 Forbidden",
            }),
            {
                status: 403,
            },
        );
    }

    const channelId: Id = ctx.params.channelId;
    ctx.state.channelId = channelId;

    return await ctx.next();
});

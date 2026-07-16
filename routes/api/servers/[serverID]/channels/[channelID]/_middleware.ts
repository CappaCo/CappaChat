import { define } from "@/lib/utils.ts";

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

    const channelID = Number(ctx.params.channelID);
    if (Number.isNaN(channelID)) {
        return new Response(
            JSON.stringify({
                message: "400 Bad request",
            }),
            {
                status: 400,
            },
        );
    }

    function checkChannelExists(channelID: number) {
        // TODO: implement this
        console.log("checking channel exists:", channelID);
        return true;
    }

    if (!checkChannelExists(channelID)) {
        return new Response(
            JSON.stringify({
                message: "404 Not found",
            }),
            {
                status: 404,
            },
        );
    }

    return await ctx.next();
});

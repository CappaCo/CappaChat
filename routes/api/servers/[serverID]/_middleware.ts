import { define } from "@/lib/utils.ts";

// https://usefresh.dev/docs/concepts/middleware

export default define.middleware(async (ctx) => {
    console.log("API middleware running");

    const authToken = ctx.state.authToken;
    console.log("authToken", authToken);

    function checkAuth(authToken: string) {
        // this function will check if the token is allowed to use the resource
        // TODO: implement this
        console.log("checking authToken:", authToken);
        return true;
    }

    if (!checkAuth(authToken)) {
        console.log("forbidden");

        return new Response(
            JSON.stringify({
                message: "403 Forbidden",
            }),
            {
                status: 403,
            },
        );
    }

    const serverID = ctx.params.serverID;
    ctx.state.serverID = serverID;

    return await ctx.next();
});

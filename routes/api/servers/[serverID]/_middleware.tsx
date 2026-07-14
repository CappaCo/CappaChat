import { define } from "@/utils.ts";

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

        return new Response("forbidden", {
            status: 403, // 403 Forbidden
        });
    }

    const serverID = Number(ctx.params.serverID);
    if (Number.isNaN(serverID)) {
        return new Response(
            JSON.stringify({
                message: "400 Bad request",
            }),
            {
                status: 400,
            },
        );
    }

    function checkServerExists(serverID: number) {
        // TODO: implement this
        console.log("checking serverID exists:", serverID);
        return true;
    }

    if (!checkServerExists(serverID)) {
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

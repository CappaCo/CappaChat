import { define } from "@/lib/utils.ts";
import { Id, User } from "@/lib/types.ts";

// https://usefresh.dev/docs/concepts/middleware

export default define.middleware(async (ctx) => {
    console.log("API middleware running");

    const requestingUser = ctx.state.requestingUser;

    function checkAuth(_user?: User) {
        // this function will check if the token is allowed to use the resource
        // TODO: implement this
        return true;
    }

    if (!checkAuth(requestingUser)) {
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

    const channelId: Id = ctx.params.channelId;
    ctx.state.channelId = channelId;

    return await ctx.next();
});

import { define } from "@/lib/utils.ts";
import { ID } from "@/lib/types.ts";

export default define.middleware(async (ctx) => {
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

    const userID = ctx.params.userID;

    function checkUserExists(userID: ID) {
        // TODO: implement this
        console.log("checking userID exists:", userID);
        return true;
    }

    if (!checkUserExists(userID)) {
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

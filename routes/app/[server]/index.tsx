import { define } from "@/lib/utils.ts";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverID = params.server;

    return (
        <h1>
            Need to redirect you to some channel in the server {serverID}
        </h1>
    );
});

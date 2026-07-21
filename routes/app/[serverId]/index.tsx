import { define } from "@/lib/utils.ts";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverId = params.serverId;

    return (
        <h1>
            Need to redirect you to some channel in the server {serverId}
        </h1>
    );
});

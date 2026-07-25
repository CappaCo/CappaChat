import { App, cors, staticFiles } from "fresh";
import { type State } from "@/lib/utils.ts";
import { handleWebsocketConnection } from "@/lib/websocket.ts";

export const app = new App<State>();

app.use(staticFiles());

// cors policy
app.use(cors());

// Middleware to log all requests
app.use(function loggerMiddleware(ctx) {
    console.log(
        `${
            (new Date()).toLocaleTimeString()
        } ${ctx.req.method}: ${ctx.req.url}`,
    );
    return ctx.next();
});

// Include file-system based routes here
app.fsRoutes();

const wsServer = Deno.serve(handleWebsocketConnection);

async function cleanup() {
    console.log("closing websocket server...");
    await wsServer.shutdown();
    console.log("websocket server closed");
    Deno.exit();
}

Deno.addSignalListener("SIGINT", cleanup);
Deno.addSignalListener("SIGTERM", cleanup);

import { handleWebsocketConnection } from "@/lib/websocket.ts";

// TODO: remove this
const wsServer = Deno.serve(handleWebsocketConnection);
console.log("wsServer started:", wsServer.addr);

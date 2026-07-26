import { handleWebsocketConnection } from "@/lib/websocket.ts";

const wsServer = Deno.serve(handleWebsocketConnection);
console.log("wsServer started:", wsServer.addr);

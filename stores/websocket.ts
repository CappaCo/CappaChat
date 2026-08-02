// deno-lint-ignore no-explicit-any
type PubHandler = (data: any) => void;

class ConnectionManager {
    private ws?: WebSocket;
    private pubHandlers: Map<string, PubHandler> = new Map();
    private queue: object[] = [];

    #getWebsocketUrl() {
        const location = globalThis.location;

        if (location.hostname === "localhost" && location.port === "5173") {
            throw "websocket not available on deno task dev";
        }

        let url = "ws";
        if (location.protocol === "https:") url += "s";
        url += "://";
        url += location.hostname;
        if (location.port !== "") {
            url += ":";
            url += location.port;
        }
        url += "/api/websocket";
        return url;
    }

    connect() {
        if (this.ws && this.ws.readyState === 1) {
            console.log("websocket already connected");
            return;
        }

        console.log("connecting to websocket...");

        const websocketUrl = this.#getWebsocketUrl();

        this.ws = new WebSocket(websocketUrl);

        this.ws.addEventListener("open", () => {
            console.log("websocket open");
            this.send({ message: "ping" });
            for (const data of this.queue) {
                this.send(data);
            }
        });

        this.ws.addEventListener("close", () => {
            console.log("websocket close");
            // TODO: maybe reconnect?
        });

        this.ws.addEventListener("error", () => {
            console.log("websocket error");
        });

        this.ws.addEventListener("message", (message: MessageEvent) => {
            let json;
            try {
                json = JSON.parse(message.data);
            } catch (error) {
                console.log("error parsing json:", error);
                return;
            }

            console.log("websocket message json:", json);

            if (json.type === "pub") {
                const handler = this.pubHandlers.get(json.to.type);
                if (!handler) return;
                handler(json.data);
            }
        });
    }

    disconnect() {
        console.log("disconnecting from websocket...");
        this.ws?.close();
    }

    send(data: object) {
        if (this.ws && this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(data));
        } else {
            this.queue.push(data);
        }
    }

    /*on(handler: () => void) {
    }*/

    // TODO: multiple handlers per pub?
    onPub(type: string, handler: PubHandler) {
        this.pubHandlers.set(type, handler);
    }

    offPub(type: string) {
        this.pubHandlers.delete(type);
    }
}

export const connection = new ConnectionManager();

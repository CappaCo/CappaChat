import { createDefine } from "fresh";
import { AuthType } from "@/lib/types.ts";

// This specifies the type of "ctx.state" which is used to share data among middlewares, layouts and routes.
export interface State {
    authType: AuthType;
    authToken: string;
    // user: User;
    serverID: number;
    channelID: number;
}

export const define = createDefine<State>();

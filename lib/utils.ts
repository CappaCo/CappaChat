import { createDefine } from "fresh";
import { AuthType, ID, User } from "@/lib/types.ts";

// This specifies the type of "ctx.state" which is used to share data among middlewares, layouts and routes.
export interface State {
    authType: AuthType;
    authToken: string;

    isJSONReturn: boolean;

    serverID: ID;
    channelID: ID;
    user: User;
}

export const define = createDefine<State>();

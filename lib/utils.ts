import { createDefine } from "fresh";
import { AuthType, Id, User } from "@/lib/types.ts";

// This specifies the type of "ctx.state" which is used to share data among middlewares, layouts and routes.
export interface State {
    authType: AuthType;
    authToken: string;

    isJsonReturn: boolean;

    serverId: Id;
    channelId: Id;
    userId: Id;

    requestingUser: User;
}

export const define = createDefine<State>();

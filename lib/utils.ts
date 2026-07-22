import { createDefine } from "fresh";
import { Id, User } from "@/lib/types.ts";

// This specifies the type of "ctx.state" which is used to share data among middlewares, layouts and routes.
export interface State {
    requestingUser?: User;

    isJsonReturn: boolean;

    serverId: Id;
    channelId: Id;
    userId: Id;
}

export const define = createDefine<State>();

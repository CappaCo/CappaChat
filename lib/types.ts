// TODO: add the things to all of the things

export interface User {
    id: number;
    username: string;
    description: string;
}

export interface Member {
    user: User;
    //permissions: // TODO: idk, something
}

export interface Server {
    id: number;
    name: string;
    description?: string; // TODO: should this be null, undefined, or "" in empty state?
}

export interface Channel {
    id: number;
    name: string;
    type: "text" | "voice";
    position?: number;
}

export interface Message {
    id: number;
    content?: string;
    author: number; // TODO: should this be author user object or author id?
    //attachments?: Attachment[];
}

/*export interface Attachment {
    //something
}*/

export type AuthType = "None" | "User" | "Bot";

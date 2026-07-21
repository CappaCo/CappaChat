import { ulid } from "@std/ulid/ulid";
import { Id } from "@/lib/types.ts";

export function generateId(): Id {
    return ulid() as Id;
}

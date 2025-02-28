import * as schema from "./src/db/schema";

type Schema = typeof schema;

export type DB = {
    [Key in keyof Schema]: Schema[Key]["$inferInsert"];
};

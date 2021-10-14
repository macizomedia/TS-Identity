import { Activity, Group, Idea, Post, User } from './types';

Array.prototype.getBy = function <T, P extends keyof T>(
    this: T[],
    prop: P,
    value: T[P]
): T | null {
    return this.filter((item) => item[prop] === value)[0] || null;
};


interface Store {
    user: User;
    groups: Group[];
    activities: Activity[];
    ideas: Idea[];
    posts: Post[];
}

type Action<T, P extends keyof T> = (
    collection: T[],
    property: P,
    newValue: any
) => T | null;

export const updateOne: Action<Group, 'name'> = (collection, args, value) => {
    return collection.getBy(args, value);
};


const store = (args: Store): Store => {
    return args;
};

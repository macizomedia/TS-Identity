import { updateOne } from './store.js';

import fetch from 'node-fetch';
import { State, Subject, Group, Idea, Activity, Project, User } from './types.js';

export async function api<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
}

Array.prototype.getBy = function <T, P extends keyof T>(
    this: T[],
    prop: P,
    value: T[P]
): T | null {
    return this.filter((item) => item[prop] === value)[0] || null;
};

function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export interface Constructor<T> {
    new (...args: any[]): T;
}

export interface Store {
    test(): void;
}

export function LogClassName<T>() {
    return function (target: Constructor<T>) {
        console.log(target.name);
    };
}

export class ActiveSubjectDraft implements State {
    constructor(
        public subject: Partial<Subject>,
        public groups: Group[],
        public ideas: Idea[],
        public activities: Activity[],
        public projects: Project[]
    ) {}
    newIdea(idea: Idea) {
        this.ideas.push(idea);
    }
    newActivity(activity: Activity) {
        this.activities.push(activity);
    }
    newProject(project: Project) {
        this.projects.push(project);
    }
    public InnerClass = (() => {
        const $outer = this;

        @LogClassName()
        class InnerClass implements Store {
            private _$outer: typeof $outer;

            constructor(public projects: Project[]) {
                this._$outer = $outer;
            }

            public test(): void {
                console.log('test()');
            }

            public subject(): Partial<Subject> {
                return this._$outer.subject;
            }

            public outerPrivateMethod1(idea: Idea): void {
                return this._$outer.newIdea(idea);
            }
        }
        return InnerClass;
    })();
}
const httpEndpoints: {
    [key: string]: any;
} = {};

/* Second Setup */

function registerEndpoint<T>(constructor: Constructor<T>) {
    const className = constructor.name;
    const endpointPath = '/' + className.toLowerCase();
    httpEndpoints[endpointPath] = new constructor();
}
function second() {
    console.log('second(): factory evaluated');
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log('second(): called');
    };
}

const enumerable = (value: boolean) => {
    return (
        target: any,
        memberName: string,
        propertyDescriptor: PropertyDescriptor
    ) => {
        propertyDescriptor.enumerable = value;
    };
};
function endpoint(id: string) {
    return function (
        target: any,
        memberName: string,
        propertyDescriptor: PropertyDescriptor
    ) {
        /* target.prototype.endpoint = `http://localhost/user/${id}` */
        console.log(target);
        console.log(memberName);
        console.log(propertyDescriptor);
    };
}

export abstract class ActiveSubject {
    constructor(protected user: User) {}
    /**
     *
     * @param group object increase 100 points
     * @returns created group
     */
    CreateGroup(groupID: Group['id']): Group['id'] {
        this.user.points! += 100;
        this.user.groups.isAdmin.push(groupID);
        console.log(`group created with id ` + groupID);
        return groupID;
    }
    /**
     *
     * @param group To follow a group
     */
    FollowGroup(groupID: Group['id']) {
        this.user.groups.isFollower.push(groupID);
    }
    /**
     *
     * @param activity object increase 100 points
     * @returns created activity
     */
    CreateActivity(activityID: Activity['id']): Activity['id'] {
        this.user.points! += 100;
        this.user.activities.isAdmin.push(activityID);
        return activityID;
    }
    /**
     *
     * @param activity object increase 100 points
     * @returns created activity
     */
    SetReminderOfActivity(
        activity: Activity
    ): Pick<Activity, 'timestamps' | 'id' | 'type'> {
        this.user.points! += 100;
        let reminder = {
            id: activity.id,
            timestamps: activity.timestamps,
            type: activity.type,
        };
        this.user.activities.hasReminder.push(reminder);
        return reminder;
    }

    /**
     *
     * @param idea
     * @returns
     */
    SubmitIdea(idea: Idea): Idea {
        this.user.points! += 100;
        return idea;
    }
}
/**
 * @abstract activeUser contains all user data
 */
@registerEndpoint
export class activeUser extends ActiveSubject {
    constructor(user: User) {
        super(user);
    }
}

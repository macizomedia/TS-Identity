import { Activity, Idea, Project, State, Subject, Group, Post } from 'types';

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

export class ActiveSubject implements State {
    constructor(
        public subject: Partial<Subject>,
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

function registerEndpoint<T>(constructor: Constructor<T>) {
    const className = constructor.name;
    const endpointPath = '/' + className.toLowerCase();
    httpEndpoints[endpointPath] = new constructor();
}

export abstract class User {
    name: string;
    points: number;
    groups: Group[]; 
    activities: Activity[];
    ideas: Idea[];
    posts: Post[]
    constructor(name: string) {
        this.points = 500;
        this.name = name;
        this.groups = [];
        this.activities = []
        this.ideas = []
        this.posts = []
    }
    /**
     *
     * @param group object increase 100 points
     * @returns created group
     */
    CreateGroup(group: Group): Group {
        this.points += 100;
        this.groups.push(group);
        return group;
    }
    /**
     * 
     * @param group To follow a group
     */
    FollowGroup(group: Group){

    }
    CreateIdea(idea: Idea): Idea {
        this.points += 100
        return idea
    }
    /* 
    Endorse Idea

    superUser
    Projects
    */

    /**
     *
     * @param property keyof Groups object
     * @param value value to query the groups array
     * @returns group or array of groups
     */
    getByProperty(property: keyof Group, value: any) {
        let result = this.groups.getBy(property, value);
        return result;
    }

    vote() {}
    abstract getGroup(): Group;
}

@registerEndpoint
export class NewUser extends User {
    constructor(name: string) {
        super(name);
    }
    getGroup(): Group {
        return this.groups[0];
    }
}

console.log(httpEndpoints)
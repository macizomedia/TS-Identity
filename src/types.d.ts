declare global {
    interface Array<T> {
        getBy<P extends keyof T>(prop: P, value: T[P]): T | null;
    }
}
enum Status {
    pending,
    active,
    inactive,
}

enum Role {
    user,
    admin,
    superUser,
}

type BaseSubject = {
    id: string | number;
    username: string;
    email: string;
    profile: string;
    role: Role.user;
};

type Settings = {
    readonly data: {
        location: string;
        code: number;
        jurisdiction: string;
    };
};

export interface Subscriber extends BaseSubject {
    id: number;
    username: string;
    profile: string;
    email: string;
    password: string;
    role: Role.user;
    settings?: Settings;

    email_verify_at?: number;
    createdAt?: number;
    updatedAt?: number;
}

export interface User extends BaseSubject {
    id: number;
    username: string;
    profile: string;
    email: string;
    role: Role.user;
    settings?: Settings;
    groups: {
        isFollower: Group['id'][];
        isAdmin: Group['id'][];
        isEditor: Group['id'][];
    };
    activities: {
        hasReminder: Pick<Activity, 'timestamps' | 'id' | 'type'>[];
        isAdmin: Activity['id'][];
    };
    ideas: {
        hasEndorse: Idea['id'][];
        isAdmin: Idea['id'][];
    };
    projects?: Project[];
    posts?: Post[];
    logs?: any[];
    points?: number;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    profile: string;
    isPrivate: boolean;
    createdAt: number;
    updatedAt: number;
    followers: number;
    editors: user['id'][];
    admin: user['id'];
}

export interface Activity {
    id?: number;
    title: string;
    description: string;
    timestamps?: number;
    type: 'physical' | 'noPhysical';
}

export interface Idea {
    id: number;
    points: number;
    title: string;
    description: string;
    isDraft: boolean;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    media: string;
    author: User['name'] | Group['name'];
    commnets: Comment[];
    likes: number;
    createdAt: number;
    updatedAt: number;
}

export interface Comment {
    content: string;
    createdBy: User['name'];
}

export interface Project {
    id: number;
    point: number;
    title: string;
    description: string;
    isPrivate: boolean;
}

type Subject = User | Group;

export interface State {
    subject: Partial<Subject>;
    ideas: Idea[];
    groups: Group[];
    activities: Activity[];
    projects: Project[];
}

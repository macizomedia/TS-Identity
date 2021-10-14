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

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    sumPoints: number;
    status: Status.pending;
    role: Role.user;
    email_verify_at: number;
    avatar: string;
    city: string;
    sdgs: string;
    createdAt: number;
    updatedAt: number;
    reminders: any[]; // linked to activities
}

export interface Group {
    id: number;
    name: string;
    description: string;
    profile: string;
    isPrivate: boolean;
    createdAt: number;
    updatedAt: number;
    followers: user['name'][];
    editor: user['name'][];
    admin: user;
}

export interface Activity {
    id: number;
    user_id: number;
    point: number;
    title: string;
    description: string;
    timestamps: number;
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
    activities: Activity[];
    projects: Project[];
}

/**
 *
 */

export enum UserRole {
    superAdmin = 'isSuperAdmin',
    admin = 'isAdmin',
    user = 'isUser'
}
interface BaseUser {
  id?: string;
  name: string;
  location: string;
  avatar: string;
  settings?: Setting;
  role?: UserRole
}

export interface User extends BaseUser {
  id?: string;
  name: string;
  location: string;
  avatar: string;
  settings?: Setting;
  points?: number;
  votes?: Vote[];
  interest?: string[];
  groups?: Group[];
  organizations?: Organization[];
  verify?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface Group {
  owner: User;
  members: User[];
  name: string;
  profile: string;
  purpose: string;
  isPrivate: boolean;
  message?: string;
  posts: any[];
  projects: Project[];
  activities: Activity[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: number;
  date?: number;
  name: string;
  title: string;
  isPrivate?: boolean;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  points: number;
}

export interface Activity {
  id?: number;
  date?: number;
  title: string;
  isPrivate?: boolean;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  points?: number;
}

interface Vote extends Project {}

interface Organization {
  name: string;
  description: string;
  isPrivate: boolean;
  members: number;
  followers: number;
  location: string;
  post: any[];
  createdAt: number;
  updatedAt: number;
}

export interface Post {
  creator: User;
  media?: string;
  content: string;
  likes?: number;
  comments: Comment[];
  id?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface Comment {
  user: User;
  comment: string;
  createdAt?: number;
  updatedAt?: number;
}

interface Setting {
  profile?: string;
  media?: string;
  social: string[];
  statment?: string;
  about?: string;
  bio?: string;
}

export interface State {
  id?: number;
  name: string;
  avatar?: string;
  email?: string;
  points?: number;
  confirmEmail?: string;
  email_verified_at?: string;
  phone?: string;
  password?: string;
  verify?: boolean;
  interest?: string[];
  token?: string;
  message?: string;
  city?: string;
  settings?: Setting;
  posts?: Post[];
}

export type ActionType =
  | {
      type: "SETTINGS";
      avatar: string;
      city: string;
      interest: string[];
    }
  | {
      type: "SUBSCRIBE";
      id: number;
      name: string;
      email: string;
      token: string;
    }
  | {
      type: "REGISTER";
      name: string;
      email: string;
      password: string;
    }
  | {
      type: "LOGIN";
      password: string;
      email: string;
    }
  | { type: "ERROR"; name: string; message: string; verify: boolean }
  | { type: "LOGOUT" };

export interface LocationData {
  id: string;
  info: string;
  city: string;
  region: string;
  country: string;
  postal: number;
}

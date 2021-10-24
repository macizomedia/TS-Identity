import { api } from './utils.js';
import {
    Activity,
    Idea,
    Project,
    State,
    Subject,
    Group,
    Post,
    User,
} from './types';
import { ActiveSubject, activeUser } from './user-services.js';
import { http, httpGet } from './http.js';
import { groupCollapsed } from 'console';

const BASE_URL = 'localhost:4000';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With': 'XMLHttpRequest',
};

let groups = new httpGet(BASE_URL, 'groups', { headers });
groups.init();

class activateUserInstance {
    protected connection!: httpGet;
    protected user!: any;
    constructor(public uri: string, public id: string) {}

    async connect() {
        this.connection = new httpGet(this.uri, this.id, {});
        this.connection.init<Partial<User>, any>();
    }

    getUserConection() {
        return this.connection;
    }
    async getDetails() {
        return new activeUser(this.connection.response);
    }
}

export function instanceOfUser(id: string) {
    let user = new activateUserInstance(BASE_URL, id);
    user.connect();
    return user;
}

let id = `user/bfda98bb-68e3-4e31-a85f-6b7c3371a0f6`;
const user = instanceOfUser(id);

setTimeout(async () => {
    let details = await user.getDetails();

    console.log(JSON.stringify(details, null, 4));
}, 4000);

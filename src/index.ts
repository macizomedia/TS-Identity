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
import { buildUser, createUser } from './http/index.js';
import { activeUser } from './user-services.js';

async function registerNewUser<T>(payload: T) {
    return new Promise((resolve) => {
        let api = createUser(payload);
        api.post();
        setTimeout(() => {
            resolve(api.getToken());
        }, 2000);
    });
}

async function builNewUser(token: string) {
    return new Promise((resolve) => {
        let api = buildUser(token);
        api.getUser();
        setTimeout(() => {
            let alpha = new activeUser(api.getToken());
            resolve(alpha);
        }, 2000);
    });
}

let token = registerNewUser<{
    username: string;
    email: string;
    password: string;
}>({
    username: 'pendejo',
    email: 'doma@mail.com',
    password: 'arepas',
});

setTimeout(async () => {
    token.then((res) => {
        if (res) {
            let t = res as unknown as { token: string };
            setTimeout(() => {
                let user = builNewUser(t.token);
                user.then((res) => {
                    console.log(res);
                });
            }, 2000);
        }
    });
}, 4000);

setTimeout(() => {}, 5000);

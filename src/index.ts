import { buildUser, createUser } from './http/index.js';
import { Subscriber, User } from './types.js';
import { activeUser } from './user-services.js';

async function registerNewUser<T>(payload: T) {
    return new Promise((resolve) => {
        let api = createUser(payload);
        api.registerUser();
        setTimeout(() => {
            resolve(api.getToken());
        }, 2000);
    });
}

async function buildNewUser(token: string) {
    return new Promise((resolve) => {
        let api = buildUser(token);
        api.getUser();
        setTimeout(() => {
            let alpha = new activeUser(api.getDetails());
            resolve(alpha);
        }, 2000);
    });
}
export const createInstaceOfUser = (payload: Partial<Subscriber>) => {
    return new Promise(async (resolve) => {
        let response = await registerNewUser<Partial<User>>(payload);
        const { token } = response as unknown as { token: string };
        let user = buildNewUser(token);
        user.then(res => resolve(res))
    });
};

const instance = createInstaceOfUser({
    username: 'Alfred',
    email: 'popo@domamail.com',
    password: 'arepas',
});

instance.then((res) => console.log(res));

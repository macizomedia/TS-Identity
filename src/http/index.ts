import fetch, { RequestInfo, RequestInit, FetchError } from 'node-fetch';
import { User } from '../types';

/**
 *
 * @param url full path of endpoint combines baseurl + endpoint
 * @param params optional body when headers have method post
 * @param init headers object for fetch
 * @returns resolved json data response
 */

const BASE_URL = process.env.BASE_URL || 'localhost:4000';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With': 'XMLHttpRequest',
};

const get = <T>(url: string): Promise<T> =>
    new Promise((resolve, reject) => {
        fetch(url).then((res) => {
            if (!res.ok) {
                reject(res.status);
            }
            resolve(res.json() as unknown as T);
        });
    });

const post = async <T>(
    url: string,
    payload?: any,
    init?: RequestInit
): Promise<T> => {
    const { headers } = init || {};

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const json = await response.json();
    console.log(json);
    return json as T;
};

enum StatusCode {
    Unauthorized = '401',
    Forbidden = '403',
    TooManyRequests = '429',
    InternalServerError = '500',
}

const injectToken = (config: any): any => {
    try {
        const token = localStorage.getItem('accessToken');

        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        throw new Error(error as unknown as string);
    }
};

/**
 * @class http wrapper of node-fetch
 */
export abstract class http {
    response!: Partial<User>;
    token!: Promise<{ token: string }>;

    /**
     *
     * @param base Base URL string
     * @param endpoint Endpoint
     * @param config Config object with headers and method
     */
    constructor(
        public baseUrl: string,
        public endpoint: string,
        public config: RequestInit,
        public body: any
    ) {}

    getUser() {
        /* injectToken(this.config) */
        const path = `http://${this.baseUrl}/${this.endpoint}`;
        try {
            get<Partial<User>>(path).then((res) => {
                this.response = res;
            });
        } catch (error) {
            this.handleError(error as unknown as FetchError);
        }
    }
    registerUser() {
        const path = `http://${this.baseUrl}/${this.endpoint}`;
        try {
            this.token = post<{ token: string }>(path, this.body, this.config);
        } catch (error) {
            this.handleError(error as unknown as FetchError);
        }
    }
    private handleError(error: FetchError) {
        const { code } = error;

        switch (code) {
            case StatusCode.InternalServerError: {
                // Handle InternalServerError
                console.log('Server Error 500');
                break;
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                console.log('forbbiden');
                break;
            }
            case StatusCode.Unauthorized: {
                // Handle Unauthorized
                console.log('unauthorized');
                break;
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                console.log('rate limit surpass');
                break;
            }
        }

        return Promise.reject(error);
    }
}

export class httpUserService extends http {
    constructor(
        baseUrl: string,
        endpoint: string,
        config: RequestInit,
        body: any
    ) {
        super(baseUrl, endpoint, config, body);
    }
    getToken() {
        return this.token
    }
    getDetails() {
        return this.response;
    }
}

/**
 * Http Services
 */

export const createUser = (body: any) =>
    new httpUserService(BASE_URL, 'register', { headers }, body);

export const buildUser = (token: string) =>
    new httpUserService(BASE_URL, `user/${token}`, { headers }, {});

/**
 * Notes on Async Await
 */

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const runAsync = async (cb: any) => {
    await delay(2000);
    cb('Some Function');
};

runAsync((time: any) => console.log(time));

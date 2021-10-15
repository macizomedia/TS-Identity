import fetch, { RequestInfo, RequestInit, FetchError } from 'node-fetch';
import { api } from './utils.js';
enum StatusCode {
    Unauthorized = '401',
    Forbidden = '403',
    TooManyRequests = '429',
    InternalServerError = '500',
}

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With': 'XMLHttpRequest',
};

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

export abstract class http {
    baseUrl: string;
    url: string;
    config: RequestInit;
    response: any;
    /**
     *
     * @param base Base URL string
     * @param url Endpoint
     * @param config Config object with headers and method
     */
    constructor(base: string, url: string, config: RequestInit) {
        this.baseUrl = base;
        this.url = url;
        this.config = config;
    }
    init<T, K>() {
        const url = `http://${this.baseUrl}/${this.url}`;
        try {
            api<T, K>(url).then((data) => {
                this.response = data;
            });
        } catch (error) {
            this.handleError(error as unknown as FetchError);
        }
    }
    private handleError(error: FetchError) {
        const { code } = error;

        switch (code) {
            case StatusCode.InternalServerError: {
                // Handle InternalServerError
                break;
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                break;
            }
            case StatusCode.Unauthorized: {
                // Handle Unauthorized
                break;
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                break;
            }
        }

        return Promise.reject(error);
    }
}

export class httpGet extends http {
    constructor(base: string, url: string, config: RequestInit) {
        super(base, url, config);
    }
}

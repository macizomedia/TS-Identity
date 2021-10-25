import fetch, { RequestInfo, RequestInit, FetchError } from 'node-fetch';
import { queryAPI } from './utils.js';
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

export abstract class http {
    response: any;
    /**
     *
     * @param base Base URL string
     * @param endpoint Endpoint
     * @param config Config object with headers and method
     */
    constructor(
        public baseUrl: string,
        public endpoint: string,
        public config: RequestInit
    ) {}

    init() {
        /* injectToken(this.config) */
        const endpoint = `http://${this.baseUrl}/${this.endpoint}`;
        try {
            queryAPI(endpoint).then((data) => {
                this.response = data;
            });
        } catch (error) {
            this.handleError(error as unknown as FetchError);
        }
    }
    getEndpoint() {
        queryAPI(`http://${this.baseUrl}/${this.endpoint}`);
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
    constructor(baseUrl: string, endpoint: string, config: RequestInit) {
        super(baseUrl, endpoint, config);
    }
}

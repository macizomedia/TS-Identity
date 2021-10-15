import fetch from 'node-fetch';

export function api<T, K>(
    url: string,
    params?: K,
    init?: RequestInit
): Promise<T> {
    const { headers } = init || {};
    const body = params ? JSON.stringify(params) : null;

    if (body === null) {
        return fetch(url, { ...headers, body }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<T>;
        });
    }

    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
    });
}

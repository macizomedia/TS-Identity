import fetch from 'node-fetch';

export async function api<T, K>(
    url: string,
    params?: K,
    init?: RequestInit
): Promise<T> {
    const { headers } = init || {};
    const body = params ? JSON.stringify(params) : null;

    if (body === null) {
        const response = await fetch(url, { ...headers, body });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await (response.json() as Promise<T>);
    }

    const response_1 = await fetch(url);
    if (!response_1.ok) {
        throw new Error(response_1.statusText);
    }
    return await (response_1.json() as Promise<T>);
}

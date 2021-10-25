import fetch from 'node-fetch';

export async function queryAPI(endpoint: string) {
    const response = await fetch(endpoint);
    return await (response.ok
        ? response.json()
        : Promise.reject(Error('Unable to get data!')));
}

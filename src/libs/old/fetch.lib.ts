class FetchLib {
    constructor() {}

    async init<T>(
        resource: string,
        options: {
            method: 'get' | 'post' | 'put' | 'delete' | 'patch';
            data: any;
            headers: any;
            params: any;
        }
    ) {
        const resp = await fetch(resource, {
            ...options,
        });

        const json = await resp.json();

        return {
            status: resp.status,
            statusText: resp.statusText,
            data: json as T,
        };
    }
}

export default FetchLib;

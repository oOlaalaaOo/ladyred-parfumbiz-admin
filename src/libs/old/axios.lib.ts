import axios from 'axios';

class AxiosLib {
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
        const resp = await axios.request<T>({
            url: resource,
            ...options,
        });

        return {
            status: resp.status,
            statusText: resp.statusText,
            data: resp.data,
        };
    }
}

export default AxiosLib;

import AxiosLib from './axios.lib';
import FetchLib from './fetch.lib';

class HttpClientLib {
    fetcher;

    constructor(fetcher: 'axios' | 'fetch') {
        if (fetcher === 'axios') {
            this.fetcher = new AxiosLib();
        }

        if (fetcher === 'fetch') {
            this.fetcher = new FetchLib();
        }
    }

    request<T>({
        url,
        method,
        data,
        headers,
        params,
    }: {
        url: string;
        method: 'get' | 'post' | 'put' | 'delete' | 'patch';
        data?: any;
        headers?: any;
        params?: any;
    }) {
        return this.fetcher?.init<T>(url, {
            method,
            data,
            headers,
            params,
        });
    }
}

export default HttpClientLib;

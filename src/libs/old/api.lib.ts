import { CONSTANTS } from '../../utils/constants';
import HttpClientLib from './http-client.lib';

const { API_FETCHER_LIB } = CONSTANTS;

class ApiLib {
    httpClient;

    constructor(
        httpClientLibFetchService = API_FETCHER_LIB
    ) {
        this.httpClient = new HttpClientLib(httpClientLibFetchService);
    }

    headersHandler(token: undefined | null | string) {
        let headers = {};

        if (typeof token !== 'undefined' && token !== null) {
            headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        return headers;
    }

    getReq<T>({
        url,
        params,
        token,
    }: {
        url: string;
        params?: any;
        token?: undefined | null | string;
    }) {
        return this.httpClient.request<T>({
            method: 'get',
            url,
            params,
            headers: this.headersHandler(token),
        });
    }

    postReq<T>({
        url,
        data,
        token,
    }: {
        url: string;
        data: any;
        token?: undefined | null | string;
    }) {
        return this.httpClient.request<T>({
            method: 'post',
            url,
            data,
            headers: this.headersHandler(token),
        });
    }

    putReq<T>({
        url,
        data,
        token,
    }: {
        url: string;
        data: any;
        token?: undefined | null | string;
    }) {
        return this.httpClient.request<T>({
            method: 'put',
            url,
            data,
            headers: this.headersHandler(token),
        });
    }

    deleteReq<T>({
        url,
        token,
    }: {
        url: string;
        token?: undefined | null | string;
    }) {
        return this.httpClient.request<T>({
            method: 'delete',
            url,
            headers: this.headersHandler(token),
        });
    }
}

export default ApiLib;

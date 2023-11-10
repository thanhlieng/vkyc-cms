import { Notification } from '@/utils';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import LocalStorage from './LocalStorage';
const API_URL = import.meta.env.VITE_API_URL;
const AxiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
});

// handle request to convert all api requests to snake_case
AxiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = LocalStorage.getToken();

    if (token && config.headers) {
        config.headers.token = `${token}`;
    }

    if (config.headers && config.headers['Content-Type'] === 'multipart/form-data') return config;

    // convert request to snake_case
    if (config.params) {
        config.params = decamelizeKeys(config.params);
    }
    if (config.data) {
        config.data = decamelizeKeys(config.data);
    }

    return config;
});

// handle response to convert all api responses to camelCase
AxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            if (!response.data.status || response.data.code === 400 || response.data.code === 403) {
                switch (response.data.code) {
                    case 400:
                        if (response.data.details && response.data.details.length > 0) {
                            const errMsg = response.data.details.map((error: { message: string }, index: number) => (
                                <div key={index}>{error?.message}</div>
                            ));
                            Notification('error', errMsg);
                        } else {
                            Notification('error', response?.data?.message);
                        }
                        break;
                    case 512:
                        // handle error
                        Notification('error', response?.data?.message);
                        // LocalStorage.removeToken();
                        // window.location.reload();
                        break;
                    default:
                        Notification('error', response?.data?.message);
                        break;
                }
            }

            if (response.data.message === 'jwt malformed') {
                LocalStorage.removeToken();
                window.location.reload();
            }
            // cover response to camelCase
            return camelizeKeys(response.data);
        }

        return response;
    },
    (error) => {
        // Handle errors
        error?.response?.data?.message && Notification('error', error?.response?.data?.message);
        return error;
    }
);

export default AxiosClient;

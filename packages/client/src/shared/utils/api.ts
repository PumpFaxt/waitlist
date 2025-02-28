import { serverUrl } from "../config/constants";
import axios, { Axios } from "axios";

const client: Axios = createApi();

function createApi() {
    const client = axios.create({
        baseURL: serverUrl,
        timeout: 32000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    client.interceptors.request.use(
        function (config) {
            return config;
        },
        function (err) {
            console.error(err);
            return Promise.reject(err);
        },
    );

    // Response Middleware
    client.interceptors.response.use(
        function (res) {
            return res;
        },
        function (error) {
            return Promise.reject(error);
        },
    );

    return client;
}

const apiClient = {
    get: client.get,
    post: client.post,

    doesPrivyAccessTokenExist(): boolean {
        const authHeaderLength = client.defaults.headers.common.Authorization
            ?.toString().length;
        return !!authHeaderLength && (authHeaderLength >
            "Bearer null".length);
    },

    setPrivyAccessToken(token: string | null) {
        client.defaults.headers.common.Authorization = "Bearer " + token;
    },
};

export default apiClient;

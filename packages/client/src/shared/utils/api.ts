import { serverUrl } from "../config/constants";

let privyAccessToken: string = "Bearer null";
const client = {
    call(...args: Parameters<typeof fetch>) {
        const uri = args[0];
        const config = args[1] || {};

        const { headers, body, ...restConfig } = config;

        return fetch(serverUrl + uri, {
            headers: {
                ...headers,
                "Authorization": privyAccessToken,
            },
            body: JSON.stringify(body),
            ...restConfig,
        });
    },
};

export function setPrivyAccessToken(token: string | null) {
    privyAccessToken = "Bearer " + token;
}

export const apiClient = client;

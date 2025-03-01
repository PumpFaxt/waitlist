import { useSearchParams } from "react-router";

function useQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const get = (key: string) => searchParams.get(key);

    const set = (key: string, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, value);
        setSearchParams(newSearchParams);
    };

    const remove = (key: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete(key);
        setSearchParams(newSearchParams);
    };

    // Get all query parameters as an object
    const all = () => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    };

    const clear = () => {
        setSearchParams({});
    };

    return {
        get,
        set,
        all,
        clear,
        remove,
    };
}

export default useQueryParams;

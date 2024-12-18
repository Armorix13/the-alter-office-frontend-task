import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetchResponse<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
    refetch: () => Promise<void>;
}

export const useFetch = <T>(
    url: string,
    headers?: Record<string, string>
): FetchResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const config: AxiosRequestConfig = {
                method: "GET",
                url,
                headers: headers || {},
            };
            const response: AxiosResponse<T> = await axios(config);
            setData(response?.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [url, headers]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    useEffect(() => {
        if (data !== null) {
            console.log("Updated data:", data);
        }
    }, [data]);
    return { data, error, isLoading, refetch: fetchData };
};

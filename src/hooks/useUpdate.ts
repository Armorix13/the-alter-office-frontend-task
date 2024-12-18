import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UpdateResponse<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
    executeUpdate: (url: string, body: any, headers?: Record<string, string>) => Promise<void>;
}
export const useUpdate = <T>(): UpdateResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const executeUpdate = useCallback(async (url: string, body: any, headers?: Record<string, string>) => {
        setIsLoading(true);
        setError(null);
        try {
            const isFormData = body instanceof FormData;

            const config: AxiosRequestConfig = {
                method: "PUT",
                url,
                headers: {
                    ...headers,
                    ...(isFormData
                        ? {}
                        : { "Content-Type": "application/json" }),
                },
                data: body,
            };

            const response: AxiosResponse<T> = await axios(config);
            setData(response.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { data, error, isLoading, executeUpdate };
};

import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface UsePostApiProps<TRequest, TResponse> {
    executePost: (
        url: string,
        data: TRequest,
        config?: AxiosRequestConfig
    ) => Promise<void>;
    isLoading: boolean;
    error: AxiosError | null;
    data: TResponse | null;
}

export function usePostApi<TRequest = any, TResponse = any>(): UsePostApiProps<
    TRequest,
    TResponse
> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [data, setData] = useState<TResponse | null>(null);

    const executePost = useCallback(
        async (url: string, postData: TRequest, config?: AxiosRequestConfig) => {
            setIsLoading(true);
            setError(null);
            setData(null);

            try {
                const response: AxiosResponse<TResponse> = await axios.post(
                    url,
                    postData,
                    config
                );
                setData(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err as AxiosError);
                setIsLoading(false);
            }
        },
        []
    );
    return { executePost, isLoading, error, data };
}

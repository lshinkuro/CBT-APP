import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL: string = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/api/v1";
const MOCK_BASE_URL: string = "http://localhost:3001/api/v1"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

const handleRequestError = (error: AxiosError): Promise<never> => {
    if (error.response) {
        console.error("Response error:", error.response.data);
    } else if (error.request) {
        console.error("Request error:", error.request);
    } else {
        console.error("Error:", error.message);
    }
    return Promise.reject(error);
};

export const get = async <T>(endpoint: string,
    params: Record<string,
    any> = {},
    token?: string,
    options: boolean = true
    ): Promise<T> => {
    try {
        const config: AxiosRequestConfig = {
            baseURL: options ? API_BASE_URL : MOCK_BASE_URL,
            params,
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };
        const response: AxiosResponse<T> = await axiosInstance.get(endpoint, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const post = async <T>(endpoint: string, data: any, token?: string): Promise<T> => {
    try {
        const isFormData = data instanceof FormData;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
        };
        const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const put = async <T>(endpoint: string, data: any, token?: string): Promise<T> => {
    try {
        const isFormData = data instanceof FormData;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
        };
        const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const del = async <T>(endpoint: string, token?: string): Promise<T> => {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        };
        const response: AxiosResponse<T> = await axiosInstance.delete(endpoint, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const login = async (
    endpoint: string,
    username: string,
    password: string
): Promise<{
    data: any;
    token: string;
}> => {
    try {
        const response: AxiosResponse<{ data: any; token: string }> = await axiosInstance.post(endpoint, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL: string = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8080";

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
        if (error.response.status === 401) {
            sessionStorage.clear();
            location.href = "/";
        }
    } else if (error.request) {
        console.error("Request error:", error.request);
    } else {
        console.error("Error:", error.message);
    }
    return Promise.reject(error);
};

export const get = async (
    endpoint: string,
    params: Record<string, any> = {},
    withCredentials: boolean = true
): Promise<{
    totalRows: number | undefined;
    message: string;
    status: number;
    data: any;
}> => {
    try {
        const config: AxiosRequestConfig = {
            baseURL: API_BASE_URL,
            params,
            withCredentials,
        };
        const response: AxiosResponse = await axiosInstance.get(endpoint, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};
export const post = async (
    endpoint: string,
    data: any,
    withCredentials: boolean = true
): Promise<{
    message: string;
    status: number;
    data: any;
}> => {
    try {
        const isFormData = data instanceof FormData;
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
            withCredentials,
        };
        const response: AxiosResponse = await axiosInstance.post(endpoint, data, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const put = async (
    endpoint: string,
    data: any,
    withCredentials: boolean = true
): Promise<{
    message: string;
    status: number;
    data: any;
}> => {
    try {
        const isFormData = data instanceof FormData;
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
            withCredentials,
        };
        const response: AxiosResponse = await axiosInstance.put(endpoint, data, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const del = async (
    endpoint: string,
    withCredentials: boolean = true
): Promise<{
    message: string;
    status: number;
    data: any;
}> => {
    try {
        const config: AxiosRequestConfig = {
            withCredentials,
        };
        const response: AxiosResponse = await axiosInstance.delete(endpoint, config);
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const login = async (
    endpoint: string,
    email: string,
    password: string
): Promise<{
    data: any;
}> => {
    try {
        const response: AxiosResponse<{ data: any }> = await axiosInstance.post(
            endpoint,
            {
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

export const logout = async (endpoint: string): Promise<void> => {
    try {
        const response: AxiosResponse = await axiosInstance.post(
            endpoint,
            {},
            {
                withCredentials: true,
            }
        );
        if (response.data.status === 200) {
            sessionStorage.clear();
            location.href = "/";
        }
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

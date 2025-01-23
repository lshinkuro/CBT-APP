/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { encryptPayload } from "../forge/ForgeConfig";

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
        if (error.response.status === 401 || error.response.status === 403) {
            if (localStorage.length > 0) {
                localStorage.clear();
                location.href = "/";
            }
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
    ___unknown_session: string;
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
        const session = await get("/api/auth/session");
        const response: AxiosResponse = await axiosInstance.post(
            endpoint,
            isFormData ? data : encryptPayload(data, session.___unknown_session),
            config
        );
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
        const session = await get("/api/auth/session");
        const response: AxiosResponse = await axiosInstance.put(
            endpoint,
            isFormData ? data : encryptPayload(data, session.___unknown_session),
            config
        );
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
        const session = await get("/api/auth/session");
        const response: AxiosResponse<{ data: any }> = await axiosInstance.post(
            endpoint,
            encryptPayload(
                {
                    email,
                    password,
                },
                session.___unknown_session
            ),
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
        const session = await get("/api/auth/session");
        const response: AxiosResponse = await axiosInstance.post(
            endpoint,
            encryptPayload({}, session.___unknown_session),
            {
                withCredentials: true,
            }
        );
        if (response.data.status === 200) {
            localStorage.clear();
            location.href = "/";
        }
    } catch (error) {
        return handleRequestError(error as AxiosError);
    }
};

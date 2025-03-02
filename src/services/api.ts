import axios from "axios";
import { getAuthToken } from "@/cookies";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(async (config) => {
    const token = await getAuthToken();

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
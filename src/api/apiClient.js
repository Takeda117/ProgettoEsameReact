import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

export const apiClient = axios.create({
    baseURL: API_ENDPOINTS.BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

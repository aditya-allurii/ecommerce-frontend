import axios from "axios";
console.log(import.meta.env.VITE_BACK_END_URL);
const api = axios.create({
    baseURL: `https://ecommerce-backend-production-ef48.up.railway.app/api`,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : null;
        if (auth && auth.jwtToken) {
            let token = auth.jwtToken;
            // Self-heal: extract raw token if it is in the old cookie-string format
            if (token.includes("=")) {
                const match = token.match(/springBootEcom=([^;]+)/);
                if (match) {
                    token = match[1];
                }
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
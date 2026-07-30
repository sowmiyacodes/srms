import axios from "axios";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api",

    headers: {
        "Content-Type": "application/json",
    },
});

//---------------------------------------------------------
// Request Interceptor
//---------------------------------------------------------

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

//---------------------------------------------------------
// Response Interceptor
//---------------------------------------------------------

api.interceptors.response.use(
    (response) => response.data,

    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");

            window.location.href = "/login";
        }

        const errorData = error.response?.data || {
            success: false,
            message: error.message || "Something went wrong",
        };

        return Promise.reject(errorData);
    }
);

export default api;
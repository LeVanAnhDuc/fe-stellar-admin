import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 300000, // Thời gian timeout cho mỗi request
    headers: {
        'Content-Type': 'application/json',
    },
});

const noToken = [
    '/auth/login',
    '/auth/prefresh-token',
];

// Xử lý trước khi xuống server
// Xử lý token và làm mới token khi cần
instance.interceptors.request.use(
    async (config) => {
        if (
            noToken.some((item) => {
                if (config.url.indexOf(item) >= 0) {
                    return true;
                }
            })
        ) {
            return config;
        }

        const accessToken = localStorage.getItem('accessToken'); // Lấy token từ localStorage

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                const refreshResponse = await instance.post('/auth/prefresh-token', { token: refreshToken });

                const { data } = refreshResponse.data;

                // Update tokens in localStorage

                localStorage.setItem('accessToken', data.accessToken);

                // Retry the original request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                // Handle refresh error
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default instance;
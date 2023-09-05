/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', {
            email,
            password,
        });

        const { data } = response.data;
        console.log(data.role);

        if (data.role === process.env.REACT_APP_ADMIN) {
            // Lưu accessToken và refreshToken vào localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.prefreshToken);

            return response;
        } else {
            return Error('Không có quyền truy cập');
        }
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        const response = await axios.post('/auth/logout');
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    login,
    logout,
};

/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/admin/login', {
            email,
            password,
        });

        const { data } = response.data;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.prefreshToken);

        return response;
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

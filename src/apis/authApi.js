/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', {
            email,
            password,
        });

        const { data } = response.data;

        // Lưu accessToken và refreshToken vào localStorage
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

// Có token
const resetPass_SendOTP = async (email) => {
    try {
        const response = await axios.post('/auth/sendotp', { email });
        return response;
    } catch (error) {
        throw error;
    }
};

const resetPass_CheckPass = async (email, otp) => {
    try {
        const response = await axios.post('/auth/checkotp', { email, otp });
        return response;
    } catch (error) {
        throw error;
    }
};

// Không token
const resetPass = async (email, oldpass, newpass, checknewpass) => {
    try {
        const response = await axios.post('/auth/resetpass', { email, oldpass, newpass, checknewpass });
        return response;
    } catch (error) {
        throw error;
    }
};

const forgotpass_SendOTP = async (email) => {
    try {
        const response = await axios.post('/auth/sendotp-forgotpass', { email });
        return response;
    } catch (error) {
        throw error;
    }
};

const forgotpass_CheckPass = async (email, otp) => {
    try {
        const response = await axios.post('/auth/checkotp-forgotpass', { email, otp });
        return response;
    } catch (error) {
        throw error;
    }
};

const forgotpass = async (email, newpass, checknewpass) => {
    try {
        const response = await axios.post('/auth/forgetpass', { email, newpass, checknewpass });
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    login,
    logout,
    resetPass_SendOTP,
    resetPass_CheckPass,
    resetPass,
    forgotpass_SendOTP,
    forgotpass_CheckPass,
    forgotpass,
};

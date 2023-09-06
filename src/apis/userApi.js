/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllUser = async (page, size) => {
    try {
        const response = await axios.get(`/user?page=${page}&size=${size}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllTotalUser = async () => {
    try {
        const response = await axios.get(`/user`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getUser = async (page, size, searchString) => {
    try {
        const response = await axios.get(`/user?page=${page}&size=${size}&searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getTotalAccounts = async () => {
    try {
        const response = await axios.get('/user/get-total-account');
        return response;
    } catch (error) {
        throw error;
    }
}

export default { getAllUser, getAllTotalUser, getUser, getTotalAccounts };

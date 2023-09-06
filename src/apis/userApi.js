/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllUserSearch = async (searchString) => {
    try {
        const response = await axios.get(`/user?searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllUser = async (page, size, searchString) => {
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
};

export default { getAllUser, getTotalAccounts, getAllUserSearch };

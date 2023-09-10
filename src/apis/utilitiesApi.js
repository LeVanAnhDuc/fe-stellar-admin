/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllUtilities = async (page, size, searchString) => {
    try {
        const response = await axios.get(`/utilities?page=${page}&size=${size}&searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};
const getAllUtilitiesSearch = async (searchString) => {
    try {
        const response = await axios.get(`/utilities?searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const postUtilities = async (param) => {
    try {
        const response = await axios.post(`/utilities/create`, param);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateUtilities = async (param) => {
    try {
        const response = await axios.patch(`/utilities/update`, param);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteUtilities = async (id) => {
    try {
        const response = await axios.delete(`/utilities/delete`, id);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllUtilities, postUtilities, getAllUtilitiesSearch, updateUtilities, deleteUtilities };

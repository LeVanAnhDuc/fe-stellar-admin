import axios from './axiosConfig.js';

const getAllContact = async (page, size, searchString) => {
    try {
        const response = await axios.get(
            `/conference/get-all-contact?page=${page}&size=${size}&searchString=${searchString}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};
const getAllContactSearch = async (searchString) => {
    try {
        const response = await axios.get(`/conference/get-all-contact?searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};
const updateContact = async (id) => {
    try {
        const response = await axios.patch(`/conference/update-contact`, { id });
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllContact,
    getAllContactSearch,
    updateContact,
};

/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllUtilities = async () => {
    try {
        const response = await axios.get(`/utilities/`);
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

export default { getAllUtilities };

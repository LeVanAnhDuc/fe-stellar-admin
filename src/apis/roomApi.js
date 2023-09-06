/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllRoom = async (searchString, id) => {
    try {
        const response = await axios.get(`room?searchString=${searchString}&typeRoom=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllRoomSearch = async (page, size, searchString, id) => {
    try {
        const response = await axios.get(`room?page=${page}&size=${size}&searchString=${searchString}&typeRoom=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllRoom, getAllRoomSearch };

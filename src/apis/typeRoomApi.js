/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllTypeRoomSearch = async (searchString) => {
    try {
        const response = await axios.get(`type-room?searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllTypeRoom = async (page, size, searchString) => {
    try {
        const response = await axios.get(`type-room?page=${page}&size=${size}&searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllTypeRoom, getAllTypeRoomSearch };

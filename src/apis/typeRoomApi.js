/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getTotalTyperooms = async () => {
    try {
        const response = await axios.get('/type-room/get-total-typerooms');

        return response;
    } catch (error) {
        throw error;
    }
};

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

const getListTotalRoomsByTypeRoom = async () => {
    try {
        const response = await axios.get('/type-room/get-list-total-rooms-by-typeroom');
        return response;
    } catch (error) {
        throw error;
    }
};

const getTypeRoomNames = async () => {
    try {
        const response = await axios.get('/type-room/get-type-room-names');
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    getTotalTyperooms,
    getAllTypeRoom,
    getAllTypeRoomSearch,
    getListTotalRoomsByTypeRoom,
    getTypeRoomNames,
};

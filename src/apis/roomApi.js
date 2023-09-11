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

const getNumberStatusRooms = async (date, typeRoom) => {
    try {
        const response = await axios.get(`/room/get-number-status-rooms?date=${date}&typeRoom=${typeRoom}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllRoom, getAllRoomSearch, getNumberStatusRooms };

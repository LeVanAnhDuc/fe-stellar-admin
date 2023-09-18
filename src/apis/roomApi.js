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

const getRoombyId = async (id) => {
    try {
        const response = await axios.get(`/room/get-room-by-id?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateRoom = async (id, roomNumber, typeBed, acreage, prices, view) => {
    try {
        const response = await axios.patch('/room/update', { id, roomNumber, typeBed, acreage, prices, view });
        return response;
    } catch (error) {
        throw error;
    }
};

const createRoom = async (idTypeRoom, roomNumber, acreage, typeBed, view, prices) => {
    try {
        const response = await axios.post('/room/create-room', {
            idTypeRoom,
            roomNumber,
            acreage,
            typeBed,
            view,
            prices,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteRoom = async (id) => {
    try {
        const response = await axios.delete(`/room?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllRoom, getAllRoomSearch, getNumberStatusRooms, getRoombyId, updateRoom, createRoom, deleteRoom };

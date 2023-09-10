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

const updateTypeRoom = async (object) => {
    try {
        const response = await axios.patch(`type-room/update-typeroom`, object);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getTotalTyperooms, getAllTypeRoom, getAllTypeRoomSearch, updateTypeRoom };

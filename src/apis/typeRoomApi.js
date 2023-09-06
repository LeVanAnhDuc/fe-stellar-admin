<<<<<<< HEAD
import axios from './axiosConfig.js';

const getTotalTyperooms = async () => {
    try {
        const response = await axios.get('/type-room/get-total-typerooms');
=======
/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllTypeRoomSearch = async (searchString) => {
    try {
        const response = await axios.get(`type-room?searchString=${searchString}`);
>>>>>>> 5f898615f2b9fe94e97ba4542079fa7a4da9eb8a
        return response;
    } catch (error) {
        throw error;
    }
};

<<<<<<< HEAD
export default { getTotalTyperooms };
=======
const getAllTypeRoom = async (page, size, searchString) => {
    try {
        const response = await axios.get(`type-room?page=${page}&size=${size}&searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllTypeRoom, getAllTypeRoomSearch };
>>>>>>> 5f898615f2b9fe94e97ba4542079fa7a4da9eb8a

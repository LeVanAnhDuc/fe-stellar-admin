import axios from './axiosConfig.js';

const getTotalTyperooms = async () => {
    try {
        const response = await axios.get('/type-room/get-total-typerooms');
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getTotalTyperooms };

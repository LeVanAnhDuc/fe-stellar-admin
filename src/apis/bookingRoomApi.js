import axios from './axiosConfig.js';

const getTotalAllTransactionHistory = async () => {
    try {
        const response = await axios.get('/booking-room/get-total-all-transactions-history');
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getTotalAllTransactionHistory };

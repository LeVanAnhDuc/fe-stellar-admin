/* eslint-disable import/no-anonymous-default-export */
import axios from './axiosConfig.js';

const getAllBookingSearch = async (searchString) => {
    try {
        const response = await axios.get(`/booking-room/get-all-transactions-history?searchString=${searchString}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getAllBooking = async (page, size, searchString) => {
    try {
        const response = await axios.get(
            `/booking-room/get-all-transactions-history?page=${page}&size=${size}&searchString=${searchString}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const getBookingByID = async (idBooking) => {
    try {
        const response = await axios.get(`/booking-room/get-transactions-history-byId?idBooking=${idBooking}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getTotalAllTransactionHistory = async () => {
    try {
        const response = await axios.get('/booking-room/get-total-all-transactions-history');
        return response;
    } catch (error) {
        throw error;
    }
};

export default { getAllBooking, getAllBookingSearch, getTotalAllTransactionHistory, getBookingByID };

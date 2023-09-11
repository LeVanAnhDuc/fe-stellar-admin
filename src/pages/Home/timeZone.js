import moment from 'moment-timezone';

class DateStrFormat {
    static DATE = 'DD-MM-YYYY';
    static DATE_AND_TIME = 'DD-MM-YYYY hh:mm';
    static INPUT_TYPE_DATE = 'YYYY-MM-DD';
}

const dateTimeFormat = (date, dateStFrormat) => {
    let dateFormat = moment(date).tz('Asia/Ho_Chi_Minh').format(dateStFrormat);
    return (
        ((DateStrFormat.DATE === dateStFrormat ||
            DateStrFormat.DATE_AND_TIME === dateStFrormat ||
            DateStrFormat.INPUT_TYPE_DATE === dateStFrormat) &&
            dateFormat !== 'Invalid date' &&
            dateFormat) ||
        null
    );
};

const dDate = (checkinDate, checkoutDate) => {
    return Number((new Date(checkoutDate) - new Date(checkinDate)) / 86400000);
};

const getFirstDayOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Lấy ngày trong tuần của ngày hiện tại
    const daysToAdd = dayOfWeek === 0 ? 1 : 1 - dayOfWeek; // Tính toán số ngày cần thêm để đến ngày đầu tiên trong tuần (Thứ 2)
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() + daysToAdd);
    return dateTimeFormat(firstDay, DateStrFormat.INPUT_TYPE_DATE);
};

const getLastDayOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Lấy ngày trong tuần (0: Chủ Nhật, 1: Thứ 2, ..., 6: Thứ 7)
    const daysToAdd = 7 - dayOfWeek; // Tính toán số ngày cần thêm để đến Chủ Nhật (ngày cuối tuần)
    const lastDay = new Date(today);
    lastDay.setDate(today.getDate() + daysToAdd);
    return dateTimeFormat(lastDay, DateStrFormat.INPUT_TYPE_DATE);
};

export { DateStrFormat, dateTimeFormat, dDate, getFirstDayOfWeek, getLastDayOfWeek };

import classNames from 'classnames/bind';
import styles from './LineChart.module.scss';
import { useState, useEffect, memo } from 'react';
import Line from '../../../components/Chart/Line';
import { dateTimeFormat, DateStrFormat, getFirstDayOfWeek, getLastDayOfWeek } from '../timeZone';
import { bookingApi } from '../../../apis';

const arr = ['Superior Double Or Twin', 'Deluxe Double', 'Executive City View', 'Deluxe Double'];
const cx = classNames.bind(styles);
function LineChart() {
    const [startDate, setStartDate] = useState(getFirstDayOfWeek());
    const [endDate, setEndDate] = useState(getLastDayOfWeek());
    const [salesStatistics, setSalesStatistics] = useState({
        labels: [],
        datasets: [
            {
                label: 'Số phòng',
                data: [],
                backgroundColor: ['#c38154'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        async function fetchTotalAccounts() {
            if (new Date(startDate) <= new Date(endDate)) {
                await bookingApi
                    .getSalesStatistics(
                        dateTimeFormat(startDate, DateStrFormat.DATE),
                        dateTimeFormat(endDate, DateStrFormat.DATE),
                    )
                    .then((response) => {
                        const { data } = response.data;

                        const date = data ? data.map((item) => item.date) : [];
                        const totalPrice = data ? data.map((item) => parseInt(item.totalPrice)) : [];
                        setSalesStatistics({
                            labels: date,
                            datasets: [
                                {
                                    label: 'Số phòng',
                                    data: totalPrice,
                                    backgroundColor: ['#c38154'],
                                    borderColor: 'black',
                                    borderWidth: 1,
                                },
                            ],
                        });
                    });
            } else {
                alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
                setSalesStatistics({
                    labels: [],
                    datasets: [
                        {
                            label: 'Số phòng',
                            data: [],
                            backgroundColor: ['#c38154'],
                            borderColor: 'black',
                            borderWidth: 1,
                        },
                    ],
                });
            }
        }

        fetchTotalAccounts();
    }, [startDate, endDate]);

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-input')}>
                <div className={cx('input-date')}>
                    <div>Ngày Bắt đầu</div>
                    <input type="date" value={startDate} onChange={handleChangeStartDate}></input>
                </div>
                <div className={cx('input-date')}>
                    <div>Ngày kết thúc</div>
                    <input type="date" value={endDate} onChange={handleChangeEndDate}></input>
                </div>
            </div>
            <Line className={cx('chart')} chartData={salesStatistics} />
        </div>
    );
}

export default memo(LineChart);

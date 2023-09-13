import classNames from 'classnames/bind';
import styles from './LineChart.module.scss';
import { useState, useEffect, memo } from 'react';
import Line from '../../../components/Chart/Line';
import { dateTimeFormat, DateStrFormat, getFirstDayOfWeek, getLastDayOfWeek } from '../timeZone';
import { bookingApi } from '../../../apis';
import { toast } from 'react-toastify';

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
        let ignore = false;
        async function fetchTotalAccounts() {
            if (new Date(startDate) <= new Date(endDate) && !ignore) {
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
                    })
                    .catch((error) => {
                        toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                    });
            } else {
                toast.error('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
                setStartDate(getFirstDayOfWeek());
                setEndDate(getLastDayOfWeek());
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
        return () => {
            ignore = true;
        };
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

export default LineChart;

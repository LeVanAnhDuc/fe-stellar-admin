import classNames from 'classnames/bind';
import styles from './PieChart.module.scss';
import { useState, useEffect, memo } from 'react';
import Pie from '../../../components/Chart/Pie';
import { dateTimeFormat, DateStrFormat } from '../timeZone';
import { typeRoomApi, roomApi } from '../../../apis';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function PieChart() {
    const [date, setDate] = useState(dateTimeFormat(new Date(), DateStrFormat.INPUT_TYPE_DATE));
    const [typeRoomNames, setTypeRoomNames] = useState([{ _id: '', name: 'None' }]);
    const [typeRoomId, setTypeRoomId] = useState('');
    const [numberStatusRooms, setNumberStatusRooms] = useState({
        labels: ['Phòng được đặt', 'Phòng trống'],
        datasets: [
            {
                label: 'Số phòng',
                data: [0, 0],
                backgroundColor: ['#c38154', '#f9e0bb'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });

    const handleChangeDate = (e) => {
        setDate(dateTimeFormat(e.target.value, DateStrFormat.INPUT_TYPE_DATE));
    };

    const handleChangeTypeRoom = (e) => {
        setTypeRoomId(e.target.value);
    };

    useEffect(() => {
        let ignore = false;
        async function fetchTypeRoomNames() {
            await typeRoomApi
                .getTypeRoomNames()
                .then((response) => {
                    setTypeRoomNames(
                        [...typeRoomNames, ...response.data.data].filter(
                            (item, index, arr) => arr.map((element) => element._id).indexOf(item._id) === index,
                        ),
                    );
                })
                .catch((error) => {
                    toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                });
        }

        !ignore && fetchTypeRoomNames();

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        let ignore = false;
        async function fetchNumberStatusRooms() {
            await roomApi
                .getNumberStatusRooms(dateTimeFormat(date, DateStrFormat.DATE), typeRoomId)
                .then((response) => {
                    const { data } = response.data;
                    const bookedRoomsNumber = parseInt(data.bookedRoomsNumber);
                    const availableRoomsNumber = parseInt(data.availableRoomsNumber);
                    setNumberStatusRooms({
                        labels: ['Phòng được đặt', 'Phòng trống'],
                        datasets: [
                            {
                                label: 'Số phòng',
                                data: [bookedRoomsNumber, availableRoomsNumber],
                                backgroundColor: ['#c38154', '#f9e0bb'],
                                borderColor: 'black',
                                borderWidth: 1,
                            },
                        ],
                    });
                })
                .catch((error) => {
                    toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                });
        }

        !ignore && fetchNumberStatusRooms();

        return () => {
            ignore = true;
        };
    }, [date, typeRoomId]);

    return (
        <>
            <div className={cx('warpper')}>
                <div className={cx('wrapper-input')}>
                    <div className={cx('input-date')}>
                        <div>Ngày</div>
                        <input type="date" value={date} onChange={handleChangeDate}></input>
                    </div>
                    <select value={typeRoomId} onChange={handleChangeTypeRoom} className={cx('select')}>
                        {typeRoomNames.map((item, index) => (
                            <option key={index} value={item._id}>{`${item.name}`}</option>
                        ))}
                    </select>
                </div>
                <Pie className={cx('chart')} chartData={numberStatusRooms} />
            </div>
        </>
    );
}

export default PieChart;

import classNames from 'classnames/bind';
import styles from './DetailOrderRoom.module.scss';

import Scroll from '../../components/Scroll';
import config from '../../config';
import Button from '../../components/Button';
import { bookingApi } from '../../apis/index';

import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DetaiOrderRoom() {
    // lay url
    const location = useLocation();
    const id = location.hash.substring(1);

    const [booking, setBooking] = useState({});

    const getItem = async (id) => {
        const res = await bookingApi.getAllBookingSearch(id);
        console.log(res.data.data);
        setBooking(res.data.data[0]);
    };
    useEffect(() => {
        getItem(id);
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>THÔNG TIN CHI TIẾT ĐƠN HÀNG</div>

            <div className={cx('content')}>
                <Table striped bordered className={cx('table')}>
                    <thead>
                        <tr>
                            <th colSpan={3} className={cx('title')}>
                                CHI TIẾT ĐẶT PHÒNG: ID {booking._id}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2} className={cx('title-table')}>
                                Loại phòng
                            </td>
                            <td className={cx('title-table')}>Trạng thái</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={cx('item')}>
                                {booking.typeRoom}
                            </td>
                            <td className={cx('item')}>{booking.status}</td>
                        </tr>
                        <tr>
                            <td className={cx('title-table')}>Nhận phòng</td>
                            <td className={cx('title-table')}>Trả phòng</td>
                            <td className={cx('title-table')}>Tổng giá trị</td>
                        </tr>
                        <tr>
                            <td className={cx('item')}>{booking.checkinDate}</td>
                            <td className={cx('item')}>{booking.checkoutDate}</td>
                            <td className={cx('item')}>{booking.totalprice}</td>
                        </tr>
                    </tbody>
                </Table>

                <Table striped bordered className={cx('table')}>
                    <thead>
                        <tr>
                            <th colSpan={3} className={cx('title')}>
                                THÔNG TIN KHÁCH HÀNG
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cx('title-table')}>Họ Tên</td>
                            <td className={cx('title-table')}>SĐT</td>
                            <td className={cx('title-table')}>Quốc gia</td>
                        </tr>
                        <tr>
                            <td className={cx('item')}>Lê Phúc Hậu</td>
                            <td className={cx('item')}>0585849276</td>
                            <td className={cx('item')}>Việt Nam</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className={cx('title-table')}>
                                Email
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className={cx('item')}>
                                lph19032002@gmail.com
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className={cx('wrapper-btn')}>
                    <Button className={cx('btn')} filled_1 to={config.Routes.listOrderRoom}>
                        Quay lại
                    </Button>
                </div>
            </div>
            <Scroll />
        </div>
    );
}

export default DetaiOrderRoom;

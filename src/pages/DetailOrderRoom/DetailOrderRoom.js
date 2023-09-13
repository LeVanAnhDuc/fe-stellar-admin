import classNames from 'classnames/bind';
import styles from './DetailOrderRoom.module.scss';
import Scroll from '../../components/Scroll';
import config from '../../config';
import Button from '../../components/Button';
import { bookingApi } from '../../apis/index';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function DetaiOrderRoom() {
    // lay url
    const location = useLocation();
    const id = location.hash.substring(1);

    const [booking, setBooking] = useState({});
    const [user, setUser] = useState({});

    const getItem = async (id) => {
        await bookingApi
            .getBookingByID(id)
            .then((res) => {
                setBooking(res.data.data);
                setUser(res.data.data.user);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getItem(id);
        return () => {
            ignore = true;
        };
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>THÔNG TIN CHI TIẾT ĐƠN HÀNG</div>

            <div className={cx('content')}>
                <Table striped bordered className={cx('table')}>
                    <thead>
                        <tr>
                            <th colSpan={3} className={cx('title')}>
                                CHI TIẾT ĐẶT PHÒNG: ID {booking?.id}
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
                                {booking?.typeRoom}
                            </td>
                            <td className={cx('item')}>{booking?.status}</td>
                        </tr>
                        <tr>
                            <td className={cx('title-table')}>Nhận phòng</td>
                            <td className={cx('title-table')}>Trả phòng</td>
                            <td className={cx('title-table')}>Tổng giá trị</td>
                        </tr>
                        <tr>
                            <td className={cx('item')}>{booking?.checkinDate}</td>
                            <td className={cx('item')}>{booking?.checkoutDate}</td>
                            <td className={cx('item')}>{booking?.totalprice}</td>
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
                            <td className={cx('item')}>{user?.name}</td>
                            <td className={cx('item')}>{user?.phone}</td>
                            <td className={cx('item')}>{user?.nationaly}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className={cx('title-table')}>
                                Email
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className={cx('item')}>
                                {user?.email}
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

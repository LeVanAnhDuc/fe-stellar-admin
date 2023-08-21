import classNames from 'classnames/bind';
import styles from './DetailOrderRoom.module.scss';

import Scroll from '../../components/Scroll';
import config from '../../config';
import Button from '../../components/Button';

import { Table } from 'react-bootstrap';

const cx = classNames.bind(styles);

function DetaiOrderRoom() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>THÔNG TIN CHI TIẾT ĐƠN HÀNG</div>

            <div className={cx('content')}>
                <Table striped bordered className={cx('table')}>
                    <thead>
                        <tr>
                            <th colSpan={3} className={cx('title')}>
                                CHI TIẾT ĐẶT PHÒNG: ID 1234
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cx('title-table')}>Loại phòng</td>
                            <td colSpan={2} className={cx('title-table')}>
                                Chi tiết
                            </td>
                        </tr>
                        <tr>
                            <td className={cx('item')}>Superior Double</td>
                            <td colSpan={2} className={cx('item')}>
                                1 phòng, 1 đêm, 2 người lớn
                            </td>
                        </tr>
                        <tr>
                            <td className={cx('title-table')}>Nhận phòng</td>
                            <td className={cx('title-table')}>Trả phòng</td>
                            <td className={cx('title-table')}>Tổng giá trị</td>
                        </tr>
                        <tr>
                            <td className={cx('item')}>Thứ 5, Tháng 7 13, 2023 từ 14:00</td>
                            <td className={cx('item')}>Thứ 6, Tháng 7 14, 2023 cho đến 12:00</td>
                            <td className={cx('item')}>2.515.000đ</td>
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

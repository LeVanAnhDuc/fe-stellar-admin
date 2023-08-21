import classNames from 'classnames/bind';
import styles from './DetailInfo.module.scss';

import Scroll from '../../components/Scroll';
import config from '../../config';
import Button from '../../components/Button';

import { Table } from 'react-bootstrap';

const cx = classNames.bind(styles);

function DetaiInfo() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>THÔNG TIN CHI TIẾT NGƯỜI DÙNG</div>

            <div className={cx('content')}>
                <Table striped bordered className={cx('table')}>
                    <tbody>
                        <tr>
                            <td className={cx('title-table')}>Họ và Tên</td>
                            <td className={cx('title-table')}>Giới tính</td>
                            <td className={cx('title-table')}>Năm sinh</td>
                        </tr>
                        <tr>
                            <td className={cx('item')}>Lê Văn Anh Đức</td>
                            <td className={cx('item')}>Nam</td>
                            <td className={cx('item')}>2002</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={cx('title-table')}>
                                Số điện thoại
                            </td>
                            <td className={cx('title-table')}>Quốc tịch</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={cx('item')}>
                                033944****
                            </td>
                            <td className={cx('item')}>Việt Nam</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className={cx('title-table')}>
                                Email
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className={cx('item')}>
                                levananhduc1804@gmail.com
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className={cx('wrapper-btn')}>
                    <Button className={cx('btn')} filled_1>
                        Lịch sử giao dịch
                    </Button>
                    <Button className={cx('btn')} filled_1 to={config.Routes.infoGuest}>
                        Quay lại
                    </Button>
                </div>
            </div>
            <Scroll />
        </div>
    );
}

export default DetaiInfo;

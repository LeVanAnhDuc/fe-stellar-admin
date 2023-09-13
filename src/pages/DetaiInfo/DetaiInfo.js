import classNames from 'classnames/bind';
import styles from './DetailInfo.module.scss';
import Scroll from '../../components/Scroll';
import config from '../../config';
import Button from '../../components/Button';
import { userApi } from '../../apis/index';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function DetaiInfo() {
    // lay url
    const location = useLocation();
    const email = location.hash.substring(1);
    const [user, setUser] = useState({});
    const [userStatus, setUserStatus] = useState(user?.status);

    const getUser = async (email) => {
        const res = await userApi.getAllUserSearch(email).catch((error) => {
            toast.error(error.response?.data.message ?? 'Mất kết nối server!');
        });
        setUser(res?.data.data[0]);
    };

    const handelAccount = async () => {
        await userApi
            .updateStatus(user?._id)
            .then((res) => {
                setUserStatus(user?.status);
                toast.success(res.data.message);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getUser(email);
        return () => {
            ignore = true;
        };
    }, [email, userStatus]);

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
                            <td className={cx('item')}>{user?.userName}</td>
                            <td className={cx('item')}>{user?.gender}</td>
                            <td className={cx('item')}>{user?.yearOfBirth}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={cx('title-table')}>
                                Số điện thoại
                            </td>
                            <td className={cx('title-table')}>Quốc tịch</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={cx('item')}>
                                {user?.phoneNumber}
                            </td>
                            <td className={cx('item')}>{user?.nationality}</td>
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
                    <Button className={cx('btn')} filled_1 onClick={handelAccount}>
                        {(user?.status === 1 && 'Khóa tài khoản') || 'Mở khóa tài khoản'}
                    </Button>
                    <Button className={cx('btn')} filled_1 to={config.Routes.historyTransaction + `#${user?._id}`}>
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

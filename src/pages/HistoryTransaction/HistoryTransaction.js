import classNames from 'classnames/bind';
import styles from './HistoryTransaction.module.scss';
import React, { useState, useEffect } from 'react';
import Scroll from '../../components/Scroll';
import Paginate from '../../components/Paginate/Paginate';
import { Container, Row } from 'react-bootstrap';
import { bookingApi } from '../../apis';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import Button from '../../components/Button';
import config from '../../config';

const cx = classNames.bind(styles);

function HistoryTransaction() {
    const location = useLocation();
    const userId = location.hash.substring(1);
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    // Phan trang (paginate)
    const itemsPerPage = 4; // Số mục hiển thị trên mỗi trang
    const getListBooking = async (page, size = itemsPerPage) => {
        const res = await bookingApi
            .getTransactionHistoryForAdmin(userId, page, (size = itemsPerPage))
            .then((res) => setlistItems(res.data.data))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const getTotalBooking = async () => {
        const res = await bookingApi
            .getTotalTransactionHistoryForAdmin(userId)
            .then((res) => setPageCount(Math.ceil(res.data.data.totalTransactionHistory / itemsPerPage)))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getListBooking(pageNumber);
        return () => {
            ignore = true;
        };
    }, [pageNumber]);

    useEffect(() => {
        let ignore = false;
        !ignore && getTotalBooking();
        return () => {
            ignore = true;
        };
    }, []);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>LỊCH SỬ GIAO DỊCH</div>
            <div className={cx('content-wrapper')}>
                <Container fluid="md" className={cx('my-container')}>
                    <Row className={cx('px-0', 'items')}>
                        {listItems.map((item, index) => {
                            return (
                                <div key={'item' + index} className={cx('px-0', 'item')}>
                                    <div>
                                        <span>Mã giao dịch:</span>
                                        <span>{item._id}</span>
                                    </div>
                                    <div>
                                        <span>Loại phòng:</span>
                                        <span>
                                            {item.typeRoom} [{item.quantity}]
                                        </span>
                                    </div>
                                    <div>
                                        <span>Ngày bắt đầu:</span>
                                        <span>{item.checkinDate}</span>
                                    </div>
                                    <div>
                                        <span>Ngày kết thúc:</span>
                                        <span>{item.checkoutDate}</span>
                                    </div>
                                    <div>
                                        <span>Tổng tiền:</span>
                                        <span>{item.totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                                    </div>
                                    <div>
                                        <span>Trạng thái:</span>
                                        <span>{item.status}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </Row>
                    <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
                </Container>
                <Button className={cx('btn')} filled_1 to={config.Routes.infoGuest}>
                    Thoát
                </Button>
            </div>
            <Scroll />
        </div>
    );
}

export default HistoryTransaction;

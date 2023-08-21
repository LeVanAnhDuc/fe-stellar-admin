import classNames from 'classnames/bind';
import styles from './HistoryTransaction.module.scss';
import { SearchIcon } from '../../components/Icon';

import React, { useState, useEffect } from 'react';

import Scroll from '../../components/Scroll';

import { Table } from 'react-bootstrap';
import Paginate from '../../components/Paginate/Paginate';

const cx = classNames.bind(styles);

function HistoryTransaction() {
    const generateRandomData = () => {
        const data = [];
        for (let i = 1; i <= 5; i++) {
            data.push({
                Madonhang: 'Ref. BW20131689481945',
                SoTienThanhToan: '2,515,000 VND',
                ThoiGian: '13:00 - 06.08.2023',
                TrangThai: 'Thất bại',
                SoThe: '',
                NganHang: '',
            });
        }
        return data;
    };

    const randomData = generateRandomData();

    // Phan trang (paginate)
    const itemsPerPage = 2; // Số mục hiển thị trên mỗi trang
    const pageCount = Math.ceil(randomData.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(randomData.slice(startIndex, endIndex));
    }, [currentPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>LỊCH SỬ GIAO DỊCH</div>
            <div className={cx('search')}>
                <input placeholder="Tìm kiếm..." className={cx('input')} />
                <SearchIcon className={cx('icon')} />
            </div>
            <div className={cx('content')}>
                {currentItems.map((item, index) => (
                    <>
                        <div className={cx('item')}>
                            <div key={index} className={cx('title-item')}>
                                Thanh toán CÔNG TY TNNH KẾ TOÁN
                            </div>
                            <div className={cx('detail-item')}>
                                <Table bordered className={cx('table')}>
                                    <tbody>
                                        {Object.entries(item).map(([key, value], index) => (
                                            <tr key={index} className={cx('info')}>
                                                <td className={cx('key')}>{key}</td>
                                                <td>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </>
                ))}
                <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </div>
            <Scroll />
        </div>
    );
}

export default HistoryTransaction;

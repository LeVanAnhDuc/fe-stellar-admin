import classNames from 'classnames/bind';
import styles from './ListRoom.module.scss';

import { SearchIcon } from '../../components/Icon';
import Select from '../../components/Select';
import Scroll from '../../components/Scroll';
import Paginate from '../../components/Paginate/Paginate';
import config from '../../config';
import Button from '../../components/Button';

import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const cx = classNames.bind(styles);

const STATE = [
    { value: '', label: 'Trạng thái phòng' },
    { value: '1', label: 'Trống' },
    { value: '2', label: 'Đã đặt' },
];

const TYPE = [
    { value: '', label: 'Loại phòng' },
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' },
];

function ListRoom() {
    const generateRandomData = () => {
        const data = [];
        for (let i = 1; i <= 100; i++) {
            data.push({
                id: i,
                maDonHang: `Lê Văn Anh Đức ${i}`,
                trangThai: true,
                phone: `123456789${i}`,
            });
        }
        return data;
    };
    const randomData = generateRandomData();

    // Phan trang (paginate)
    const itemsPerPage = 6; // Số mục hiển thị trên mỗi trang
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
            <div className={cx('title')}>DANH SÁCH ĐẶT PHÒNG</div>
            <div className={cx('adjust')}>
                <div className={cx('fillter')}>
                    <Select options={STATE} className={cx('state-room')} />
                    <Select options={TYPE} className={cx('state-room')} />
                </div>
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm..." className={cx('input')} />
                    <SearchIcon className={cx('icon')} />
                </div>
            </div>

            <div className={cx('content')}>
                <Table striped bordered responsive className={cx('table')}>
                    <thead className={cx('title-table')}>
                        <tr className={cx('wrapper-header')}>
                            <th className={cx('size-1', 'center', 'title-item')}>STT</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Mã đơn hàng</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Trạng thái</th>
                            <th className={cx('size-3', 'center', 'title-item')}>SĐT</th>
                            <th className={cx('size-1', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{item.id}</td>
                                <td className={cx('size-4', 'item')}>{item.maDonHang}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.trangThai ? 'True' : 'False'}</td>
                                <td className={cx('size-3', 'center', 'item')}>{item.phone}</td>
                                <td className={cx('size-1', 'item')}>
                                    <Button className={cx('detai-info')} to={config.Routes.detaiInfo}>
                                        ...
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </div>
            <Scroll />
        </div>
    );
}

export default ListRoom;

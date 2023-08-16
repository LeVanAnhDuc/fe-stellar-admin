import classNames from 'classnames/bind';
import styles from './InfoGuest.module.scss';

import config from '../../config';

import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';

import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';

const cx = classNames.bind(styles);

function InfoGuest() {
    const generateRandomData = () => {
        const data = [];
        for (let i = 1; i <= 100; i++) {
            data.push({
                id: i,
                name: `Lê Văn Anh Đức ${i}`,
                email: `levananhduc1804${i}@example.com`,
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
            <div className={cx('title')}>THÔNG TIN NGƯỜI DÙNG</div>
            <div className={cx('search')}>
                <input placeholder="Tìm kiếm..." className={cx('input')} />
                <SearchIcon className={cx('icon')} />
            </div>
            <div className={cx('content')}>
                <Table striped bordered responsive className={cx('table')}>
                    <thead className={cx('title-table')}>
                        <tr className={cx('wrapper-header')}>
                            <th className={cx('size-1', 'center', 'title-item')}>STT</th>
                            <th className={cx('size-3', 'center', 'title-item')}>Họ và Tên</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Email</th>
                            <th className={cx('size-2', 'center', 'title-item')}>SĐT</th>
                            <th className={cx('size-1', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{item.id}</td>
                                <td className={cx('size-3', 'item')}>{item.name}</td>
                                <td className={cx('size-4', 'item')}>{item.email}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.phone}</td>
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

export default InfoGuest;

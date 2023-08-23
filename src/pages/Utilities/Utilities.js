import classNames from 'classnames/bind';
import styles from './Utilities.module.scss';

import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import ModalInsert from './ModalInsert/ModalInsert';

import { Table } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';

const cx = classNames.bind(styles);

const arr = ['Hồ Bơi Tràn Bờ Trên Cao', 'Phòng Tập Thể Thao', 'Stellar Spa'];

const generateRandomData = () => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
        data.push({
            id: i + 1,
            name: arr[i],
            desc: `.....`,
        });
    }
    return data;
};

const randomData = generateRandomData();
function Utilities() {
    // Phan trang (paginate)
    const itemsPerPage = 5; // Số mục hiển thị trên mỗi trang
    const pageCount = Math.ceil(randomData.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(randomData.slice(startIndex, endIndex));
    }, [currentPage, randomData]);

    // model
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>DANH SÁCH LOẠI PHÒNG</div>
            <div className={cx('search')}>
                <input placeholder="Tìm kiếm..." className={cx('input')} />
                <SearchIcon className={cx('icon')} />
            </div>
            <div className={cx('content')}>
                <Table striped bordered responsive className={cx('table')}>
                    <thead className={cx('title-table')}>
                        <tr className={cx('wrapper-header')}>
                            <th className={cx('size-1', 'center', 'title-item')}>STT</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Tên tiện ích</th>
                            <th className={cx('size-3', 'center', 'title-item')}>Mô tả</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Hình ảnh</th>
                            <th className={cx('size-2', 'center', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{item.id}</td>
                                <td className={cx('size-2', 'item')}>{item.name}</td>
                                <td className={cx('size-3', 'center', 'item')}>{item.desc}</td>
                                <td className={cx('size-2', 'center', 'item')}></td>
                                <td className={cx('size-2', 'center', 'item')}>
                                    <Button className={cx('btn-small')} filled_1 onClick={handleShow}>
                                        Sửa
                                    </Button>
                                    <ModalInsert handleClose={handleClose} show={show} />
                                    <Button className={cx('btn-small')} filled_1>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={cx('wrapper-btn')}>
                    <Button className={cx('btn')} filled_1 onClick={handleShow}>
                        Thêm
                    </Button>
                    <ModalInsert handleClose={handleClose} show={show} />
                </div>
                <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </div>
            <Scroll />
        </div>
    );
}

export default Utilities;

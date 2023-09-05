import classNames from 'classnames/bind';
import styles from './ListTypeRoom.module.scss';

import config from '../../config';

import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import ModalInsert from './ModalInsert/ModalInsert';

import { Table } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';

const cx = classNames.bind(styles);

const arr = [
    'Phòng Superior Double Or Twin',
    'Phòng Deluxe Double',
    'Phòng Executive City View',
    'Phòng Deluxe Double',
];
const detail =
    'Nếu bạn đang đề cập đến việc sử dụng chung mã PO (Purchase Order) cho các sản phẩm cùng màu, cùng size và cùng loại trong ngữ cảnh của việc đặt hàng và quản lý hàng hóa, thì dưới đây là một số lưu ý cần xem xét:Nếu bạn đang đề cập đến việc sử dụng chung mã PO (Purchase Order) cho các sản phẩm cùng màu, cùng size và cùng loại trong ngữ cảnh của việc đặt hàng và quản lý hàng hóa, thì dưới đây là một số lưu ý cần xem xét:';

const generateRandomData = () => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
        data.push({
            id: '64e5c324fcfa2fb8e11f1c26',
            name: arr[i],
            number: `10000${i}`,
        });
    }
    return data;
};

const randomData = generateRandomData();
function ListTypeRoom() {
    // Phan trang (paginate)
    const itemsPerPage = 2; // Số mục hiển thị trên mỗi trang
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
                            <th className={cx('size-3', 'center', 'title-item')}>Tên loại</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Số lượng</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Mô tả</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Chỉnh sửa</th>
                            <th className={cx('size-1', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-3', 'item')}>{item.name}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.number}</td>
                                <td className={cx('size-4', 'center', 'item')}>{detail}</td>
                                <td className={cx('size-2', 'center', 'item')}>
                                    <Button filled_1 onClick={handleShow}>
                                        Chỉnh sửa thông tin
                                    </Button>
                                    <ModalInsert handleClose={handleClose} show={show} />
                                </td>
                                <td className={cx('size-1', 'center', 'item')}>
                                    <Button className={cx('detai-info')} to={config.Routes.listRoom + `#${item.id}`}>
                                        ...
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

export default ListTypeRoom;

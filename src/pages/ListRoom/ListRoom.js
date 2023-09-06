import classNames from 'classnames/bind';
import styles from './ListRoom.module.scss';

import config from '../../config';

import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import ModalInsert from './ModalInsert/ModalInsert';

import { Table } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';
import { useLocation } from 'react-router';
import { roomApi } from '../../apis';

const cx = classNames.bind(styles);
function ListRoom() {
    // lay url
    const location = useLocation();
    const id = location.hash.substring(1);

    // Phan trang (paginate)
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(10);

    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 5;

    const getListTypeRoom = async (page, searchString = '') => {
        const res = await roomApi.getAllRoomSearch(page, itemsPerPage, searchString, id);
        setlistItems(res.data.data);
    };

    const getTotalTypeRoom = async (searchString = '') => {
        const res = await roomApi.getAllRoom(searchString, id);
        setPageCount(Math.ceil(res.data.data.length / itemsPerPage));
    };

    useEffect(() => {
        getListTypeRoom(pageNumber, searchItem);
        getTotalTypeRoom(searchItem);
    }, [pageNumber, searchItem]);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    const handleChangeSearch = (e) => {
        setSearchItem(e.target.value);
    };

    // model
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>DANH SÁCH LOẠI PHÒNG</div>
            <div className={cx('search')}>
                <input
                    placeholder="Tìm kiếm..."
                    className={cx('input')}
                    value={searchItem}
                    onChange={handleChangeSearch}
                />
                <SearchIcon className={cx('icon')} />
            </div>
            <div className={cx('content')}>
                <Table striped bordered responsive className={cx('table')}>
                    <thead className={cx('title-table')}>
                        <tr className={cx('wrapper-header')}>
                            <th className={cx('size-1', 'center', 'title-item')}>STT</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Mã phòng</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Loại giường</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Sức chứa</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Giá</th>
                            <th className={cx('size-2', 'center', 'title-item')}>View</th>
                            <th className={cx('size-3', 'center', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.roomNumber}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.typeBed}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.acreage}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.prices}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.view}</td>
                                <td className={cx('size-3', 'center', 'item')}>
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
                    <Button className={cx('btn')} filled_1 to={config.Routes.listTypeRoom}>
                        Quay lại
                    </Button>
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

export default ListRoom;

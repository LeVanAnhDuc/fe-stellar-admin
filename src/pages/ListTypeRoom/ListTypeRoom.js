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

import { typeRoomApi } from '../../apis';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ListTypeRoom() {
    // Phan trang (paginate)
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 2;

    const getListTypeRoom = async (page, searchString = '') => {
        await typeRoomApi
            .getAllTypeRoom(page, itemsPerPage, searchString)
            .then((res) => setlistItems(res.data.data))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const getTotalTypeRoom = async (searchString = '') => {
        await typeRoomApi
            .getAllTypeRoomSearch(searchString)
            .then((res) => setPageCount(Math.ceil(res.data.data.length / itemsPerPage)))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getListTypeRoom(pageNumber, searchItem);
        return () => {
            ignore = true;
        };
    }, [pageNumber, searchItem]);

    useEffect(() => {
        let ignore = false;
        !ignore && getTotalTypeRoom(searchItem);
        return () => {
            ignore = true;
        };
    }, [searchItem]);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    const handleChangeSearch = (e) => {
        setSearchItem(e.target.value);
    };

    // setID
    const [idItem, setIDItem] = useState();

    // model
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setIDItem(id);
        setShow(true);
    };

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
                            <th className={cx('size-3', 'center', 'title-item')}>Tên loại</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Mô tả</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Chỉnh sửa</th>
                            <th className={cx('size-1', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-3', 'item')}>{item?.name}</td>
                                <td className={cx('size-4', 'center', 'item')}>{item?.description}</td>
                                <td className={cx('size-2', 'center', 'item')}>
                                    <Button filled_1 onClick={() => handleShow(item._id)}>
                                        Chỉnh sửa thông tin
                                    </Button>
                                    {show ? <ModalInsert handleClose={handleClose} show={show} id={idItem} /> : ''}
                                </td>
                                <td className={cx('size-1', 'center', 'item')}>
                                    <Button className={cx('detai-info')} to={config.Routes.listRoom + `#${item?._id}`}>
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

export default ListTypeRoom;

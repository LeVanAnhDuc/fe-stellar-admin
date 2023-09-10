import classNames from 'classnames/bind';
import styles from './ListOrderRoom.module.scss';

import { SearchIcon } from '../../components/Icon';
// import Select from '../../components/Select';
import Scroll from '../../components/Scroll';
import Paginate from '../../components/Paginate/Paginate';
import config from '../../config';
import Button from '../../components/Button';

import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { bookingApi } from '../../apis';

const cx = classNames.bind(styles);

// const STATE = [
//     { value: '', label: 'Trạng thái phòng' },
//     { value: '1', label: 'Trống' },
//     { value: '2', label: 'Đã đặt' },
// ];

// const TYPE = [
//     { value: '', label: 'Loại phòng' },
//     { value: 'a', label: 'a' },
//     { value: 'b', label: 'b' },
//     { value: 'c', label: 'c' },
// ];

function ListRoom() {
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(10);

    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 4;

    const getListBooking = async (page, searchString = '') => {
        const res = await bookingApi.getAllBooking(page, itemsPerPage, searchString);
        setlistItems(res.data.data);
    };

    const getTotalBooking = async (searchString = '') => {
        const res = await bookingApi.getAllBookingSearch(searchString);
        setPageCount(Math.ceil(res.data.data.length / itemsPerPage));
    };

    useEffect(() => {
        getListBooking(pageNumber, searchItem);
        getTotalBooking(searchItem);
    }, [pageNumber, searchItem]);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    const handleChangeSearch = (e) => {
        setSearchItem(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>DANH SÁCH ĐẶT PHÒNG</div>
            <div className={cx('adjust')}>
                {/* <div className={cx('fillter')}>
                    <Select options={STATE} className={cx('state-room')} />
                    <Select options={TYPE} className={cx('state-room')} />
                </div> */}
                <div className={cx('search')}>
                    <input
                        placeholder="Tìm kiếm..."
                        className={cx('input')}
                        value={searchItem}
                        onChange={handleChangeSearch}
                    />
                    <SearchIcon className={cx('icon')} />
                </div>
            </div>

            <div className={cx('content')}>
                <Table striped bordered responsive className={cx('table')}>
                    <thead className={cx('title-table')}>
                        <tr className={cx('wrapper-header')}>
                            <th className={cx('size-1', 'center', 'title-item')}>STT</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Mã đơn hàng</th>
                            <th className={cx('size-3', 'center', 'title-item')}>Loại phòng</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Giá</th>
                            <th className={cx('size-1', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-4', 'center', 'item')}>{item._id}</td>
                                <td className={cx('size-3', 'center', 'item')}>{item.typeRoom}</td>
                                <td className={cx('size-2', 'center', 'item')}>
                                    {item.totalprice.toLocaleString('en-US')}
                                </td>
                                <td className={cx('size-1', 'center', 'item')}>
                                    <Button
                                        className={cx('detai-info')}
                                        to={config.Routes.detaiOrderRoom + `#${item._id}`}
                                    >
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

import classNames from 'classnames/bind';
import styles from './InfoGuest.module.scss';
import config from '../../config';
import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';
import { userApi } from '../../apis/index';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function InfoGuest() {
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 4;

    const getListUser = async (page, searchString = '') => {
        await userApi
            .getAllUser(page, itemsPerPage, searchString)
            .then((res) => setlistItems(res.data.data))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const getTotalUser = async (searchString = '') => {
        await userApi
            .getAllUserSearch(searchString)
            .then((res) => setPageCount(Math.ceil(res.data.data.length / itemsPerPage)))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getListUser(pageNumber, searchItem);
        return () => {
            ignore = true;
        };
    }, [pageNumber, searchItem]);

    useEffect(() => {
        let ignore = false;
        !ignore && getTotalUser(searchItem);
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>THÔNG TIN NGƯỜI DÙNG</div>
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
                            <th className={cx('size-3', 'center', 'title-item')}>Họ và Tên</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Email</th>
                            <th className={cx('size-2', 'center', 'title-item')}>SĐT</th>
                            <th className={cx('size-1', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-3', 'item')}>{item?.userName}</td>
                                <td className={cx('size-4', 'item')}>{item?.email}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.phoneNumber}</td>
                                <td className={cx('size-1', 'item')}>
                                    <Button
                                        className={cx('detai-info')}
                                        to={config.Routes.detaiInfo + `#${item?.email}`}
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

export default InfoGuest;

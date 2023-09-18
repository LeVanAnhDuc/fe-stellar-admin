import classNames from 'classnames/bind';
import styles from './Utilities.module.scss';

import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import ModalInsert from './ModalInsert/ModalInsert';

import { Table } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';
import { utilitiesApi } from '../../apis';
import ModalUpdate from './ModalUpdate/ModalUpdate';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Utilities() {
    // model
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showInsert, setShowInsert] = useState(false);
    const handleCloseInsert = () => setShowInsert(false);
    const handleShowInsert = () => setShowInsert(true);

    const [isDelete, setIsDelete] = useState(false);

    // get list item
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 2;

    const handleChangeSearch = (e) => {
        setSearchItem(e.target.value);
    };

    const getListUtilities = async (page, searchString = '') => {
        await utilitiesApi
            .getAllUtilities(page, itemsPerPage, searchString)
            .then((res) => {
                setlistItems(res.data.data);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const getTotalUtilities = async (searchString = '') => {
        await utilitiesApi
            .getAllUtilitiesSearch((searchString = ''))
            .then((res) => {
                setPageCount(Math.ceil(res.data.data.length / itemsPerPage));
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getListUtilities(pageNumber, searchItem);
        return () => {
            ignore = true;
        };
    }, [pageNumber, searchItem, showUpdate, showInsert, isDelete]);

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            getTotalUtilities(searchItem);
        }
        return () => {
            ignore = true;
        };
    }, [searchItem]);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    // get ITEM
    const [idItem, setIdItem] = useState();
    const [nameItem, setNameItem] = useState();
    const [desc, setDesc] = useState();
    const [typeItem, setTypeItem] = useState();
    const handleGetUser = (index, name, description, type) => {
        handleShowUpdate();
        setIdItem(index);
        setNameItem(name);
        setDesc(description);
        setTypeItem(type);
    };

    const handelDelete = async (id) => {
        await utilitiesApi
            .deleteUtilities(id)
            .then((res) => {
                toast.success(res.data.message);
                setIsDelete(!isDelete);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>DANH SÁCH TIỆN ÍCH</div>
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
                            <th className={cx('size-2', 'center', 'title-item')}>Tên tiện ích</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Mô tả</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Loại tiện ích</th>
                            <th className={cx('size-2', 'center', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-2', 'item')}>{item?.name}</td>
                                <td className={cx('size-4', 'center', 'item')}>{item?.description}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.type}</td>

                                <td className={cx('size-2', 'center', 'item')}>
                                    <Button
                                        className={cx('btn-small')}
                                        filled_1
                                        onClick={() =>
                                            handleGetUser(item?._id, item?.name, item?.description, item?.type)
                                        }
                                    >
                                        Sửa
                                    </Button>
                                    {showUpdate && (
                                        <ModalUpdate
                                            handleClose={handleCloseUpdate}
                                            show={showUpdate}
                                            itemName={nameItem}
                                            itemDesc={desc}
                                            itemID={idItem}
                                            itemType={typeItem}
                                        />
                                    )}

                                    <Button
                                        className={cx('btn-small')}
                                        filled_1
                                        onClick={() => handelDelete(item?._id)}
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={cx('wrapper-btn')}>
                    <Button className={cx('btn')} filled_1 onClick={handleShowInsert}>
                        Thêm
                    </Button>
                    {showInsert && <ModalInsert handleClose={handleCloseInsert} show={showInsert} />}
                </div>
                <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </div>
            <Scroll />
        </div>
    );
}

export default Utilities;

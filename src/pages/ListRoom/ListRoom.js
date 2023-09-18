import classNames from 'classnames/bind';
import styles from './ListRoom.module.scss';
import config from '../../config';
import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';
import ModalInsert from './ModalInsert/ModalInsert';
import ModalUpdate from './ModalUpdate/ModalUpdate';
import { useLocation } from 'react-router';
import { roomApi } from '../../apis';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function ListRoom() {
    // lay url
    const location = useLocation();
    const id = location.hash.substring(1);

    // Phan trang (paginate)
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [showInsert, setShowInsert] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [idRoom, setIdRoom] = useState();

    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 5;

    const getListTypeRoom = async (page, searchString = '') => {
        await roomApi
            .getAllRoomSearch(page, itemsPerPage, searchString, id)
            .then((res) => setlistItems(res.data.data))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const getTotalTypeRoom = async (searchString = '') => {
        await roomApi
            .getAllRoom(searchString, id)
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
    }, [pageNumber, searchItem, showUpdate, showInsert, isDelete]);

    useEffect(() => {
        let ignore = false;
        !ignore && getTotalTypeRoom(searchItem);
        return () => {
            ignore = true;
        };
    }, [searchItem, showUpdate, showInsert, isDelete]);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    const handleChangeSearch = (e) => {
        setSearchItem(e.target.value);
    };

    const handleInsert_Close = () => setShowInsert(false);
    const handleInsert_Show = () => setShowInsert(true);
    const handleUpdate_Close = () => setShowUpdate(false);
    const handleUpdate_Show = () => setShowUpdate(true);

    const handeDelete = async (id) => {
        await roomApi
            .deleteRoom(id)
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
                            <th className={cx('size-2', 'center', 'title-item')}>Diện tích</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Giá</th>
                            <th className={cx('size-2', 'center', 'title-item')}>View</th>
                            <th className={cx('size-3', 'center', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.roomNumber}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.typeBed}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.acreage}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.prices}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item?.view}</td>
                                <td className={cx('size-3', 'center', 'item')}>
                                    <Button
                                        className={cx('btn-small')}
                                        filled_1
                                        onClick={() => {
                                            setIdRoom(item?._id);
                                            handleUpdate_Show();
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button className={cx('btn-small')} filled_1 onClick={() => handeDelete(item?._id)}>
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
                    <Button className={cx('btn')} filled_1 onClick={handleInsert_Show}>
                        Thêm
                    </Button>
                    {showUpdate && <ModalUpdate handleClose={handleUpdate_Close} show={showUpdate} idRoom={idRoom} />}

                    {showInsert && <ModalInsert handleClose={handleInsert_Close} show={showInsert} idTypeRoom={id} />}
                </div>
                <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </div>
            <Scroll />
        </div>
    );
}

export default ListRoom;

import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import config from '../../config';
import { SearchIcon } from '../../components/Icon';
import Scroll from '../../components/Scroll';
import Button from '../../components/Button';
import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Paginate from '../../components/Paginate/Paginate';
import { contactApi } from '../../apis';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../../components/Popper';

const cx = classNames.bind(styles);
function Contact() {
    // Phan trang (paginate)
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 6;

    const getListContact = async (page, searchString = '') => {
        await contactApi
            .getAllContact(page, itemsPerPage, searchString)
            .then((res) => {
                setlistItems(res.data.data);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const getTotalContact = async (searchString = '') => {
        await contactApi
            .getAllContactSearch(searchString)
            .then((res) => setPageCount(Math.ceil(res.data.data.length / itemsPerPage)))
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };
    const updatetContact = async (id) => {
        await contactApi
            .updateContact({ _id: id })
            .then((res) => {
                toast.success(res.data.message);
                setIsUpdate(!isUpdate);
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        !ignore && getListContact(pageNumber, searchItem);
        return () => {
            ignore = true;
        };
    }, [pageNumber, searchItem, loading, isUpdate]);

    useEffect(() => {
        let ignore = false;
        !ignore && getTotalContact(searchItem);
    }, [searchItem]);

    const setCurrentPage = (event) => {
        setPageNumber(event + 1);
    };

    const handleChangeSearch = (e) => {
        setSearchItem(e.target.value);
    };

    const handleUpdateStatus = (id) => {
        updatetContact(id);
        setLoading(!loading);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>DANH SÁCH LIÊN HỆ</div>
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
                            <th className={cx('size-4', 'center', 'title-item')}>Email</th>
                            <th className={cx('size-4', 'center', 'title-item')}>Tin nhắn</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Tên</th>
                            <th className={cx('size-2', 'center', 'title-item')}>SĐT</th>
                            <th className={cx('size-2', 'center', 'title-item')}>Trạng thái</th>
                            <th className={cx('size-2', 'center', 'title-item')}></th>
                        </tr>
                    </thead>
                    <tbody className={cx('data-table')}>
                        {listItems.map((item, index) => (
                            <tr key={index} className={cx('wrapper-header')}>
                                <td className={cx('size-1', 'center', 'item')}>{index + 1}</td>
                                <td className={cx('size-4', 'item')}>{item.email}</td>

                                <Tippy
                                    // visible={true}
                                    offset={[0, -5]}
                                    interactive={true}
                                    // delay={[0, 200]}
                                    placement="top-start"
                                    render={(attrs) => (
                                        <div className={cx('more-menu')} tabIndex="-1" {...attrs}>
                                            <PopperWrapper>
                                                <div className={cx('menu-list')}>{item.message}</div>
                                            </PopperWrapper>
                                        </div>
                                    )}
                                >
                                    <td className={cx('size-4', 'item')}>{item.message}</td>
                                </Tippy>

                                <td className={cx('size-2', 'center', 'item')}>{item.name}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.phoneNumber}</td>
                                <td className={cx('size-2', 'center', 'item')}>{item.status}</td>
                                <td className={cx('size-2', 'center', 'item')}>
                                    {item.status === 'đã xử lý' ? (
                                        <Button className={cx('btn-small')} filled_1 disable>
                                            Cập nhật
                                        </Button>
                                    ) : (
                                        <Button
                                            className={cx('btn-small')}
                                            filled_1
                                            onClick={() => handleUpdateStatus(item._id)}
                                        >
                                            Cập nhật
                                        </Button>
                                    )}
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

export default Contact;

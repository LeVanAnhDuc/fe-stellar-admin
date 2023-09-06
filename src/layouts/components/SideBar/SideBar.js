import React, { useState } from 'react';

import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';

import config from '../../../config';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import images from '../../../assets/image';
import { BartIcon } from '../../../components/Icon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass,
    faHistory,
    faHouse,
    faHouseMedicalFlag,
    faRectangleList,
    faSignOut,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const NAV = [
    {
        title: 'Trang của bạn',
        to: config.Routes.home,
        icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
        title: 'Thông tin người dùng',
        to: config.Routes.infoGuest,
        icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
        title: 'Danh sách đặt phòng',
        to: config.Routes.listOrderRoom,
        icon: <FontAwesomeIcon icon={faHouseMedicalFlag} />,
    },
    {
        title: 'Danh sách loại phòng ',
        to: config.Routes.listTypeRoom,
        icon: <FontAwesomeIcon icon={faRectangleList} />,
    },
    {
        title: 'Tiện ích',
        to: config.Routes.utilities,
        icon: <FontAwesomeIcon icon={faCompass} />,
    },
];

function SideBar({ sidebarClose, toggleSidebar }) {
    const currentURL = window.location.pathname;
    const index = NAV.findIndex((item) => item.to === currentURL);

    const [active, setActive] = useState(index);
    const handleActive = (index) => {
        setActive(index);
    };

    return (
        <div className={sidebarClose ? cx('wrapper-hide') : cx('wrapper')}>
            <button className={cx('icon')} onClick={toggleSidebar}>
                <BartIcon />
            </button>
            <div className={cx('content')}>
                {sidebarClose ? <div className={cx('logo')}></div> : <Image src={images.logo} className={cx('logo')} />}
                {/* <Image src={images.anhDaiDien} className={cx('avatar')} />
                    <div className={cx('name')}>Bùi Quốc Tĩnh</div> */}
                <div className={cx('nav')}>
                    <div>
                        {NAV.map((item, index) => (
                            <Button
                                leftIcon={item.icon}
                                key={index}
                                to={item.to}
                                className={active === index ? cx('custom-btn-active') : cx('custom-btn')}
                                outline_1
                                onClick={() => handleActive(index)}
                            >
                                {!sidebarClose && item.title}
                            </Button>
                        ))}
                    </div>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faSignOut} />}
                        to={'/'}
                        className={cx('custom-btn')}
                        outline_1
                        onClick={() => handleActive(-1)}
                    >
                        {sidebarClose ? '' : 'Thoát'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SideBar;

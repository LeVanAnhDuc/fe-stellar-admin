import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../../assets/image';

import Image from '../../../components/Image';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <h1 className={cx('wrapper')}>
            <div className={cx('back-ground')}>
                <Link to={'/'}>
                    <Image src={images.logo} className={cx('logo')} />
                </Link>
            </div>
            <div className={cx('thanh-ngang')}></div>
            {/* <div className={cx('info')}>
                <div>Website chính thức của khách sạn Stellar</div>
                <div>Số điện thoại: (+84) 9465412XX</div>
                <div>Email: info@stellar.com.vn</div>
                <div>Địa chỉ: 01 Võ Văn Ngân, P. Linh Chiểu, Q. Thủ Đức, TP. Hồ Chí Minh</div>
            </div> */}
        </h1>
    );
}

export default React.memo(Footer);

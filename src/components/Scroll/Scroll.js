import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Scroll.module.scss';
import Button from '../Button';
import { ScrollIcon } from '../Icon';

const cx = classNames.bind(styles);

function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={cx('scroll-to-top')}>
            {showButton && (
                <Button filled_2 className={cx('btn')} onClick={scrollToTop}>
                    <ScrollIcon />
                </Button>
            )}
        </div>
    );
}

export default ScrollToTopButton;

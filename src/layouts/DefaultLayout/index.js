import Header from '../components/Header';
// import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';
import SideBar from '../components/SideBar/SideBar';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [sidebarClose, setSidebarClose] = useState(false);

    const toggleSidebar = () => {
        setSidebarClose(!sidebarClose);
    };

    // handle responsive ----------------------------------
    function handleResize() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1000) {
            setSidebarClose(true);
        } else {
            setSidebarClose(false);
        }
    }

    useEffect(() => {
        handleResize(); // Initial call
        window.addEventListener('resize', handleResize); // Attach the event listener

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
    }, []); // Empty dependency array to ensure the effect runs only once
    // -------------------------------------------------------

    return (
        <div className={cx('wrapper')}>
            <SideBar sidebarClose={sidebarClose} toggleSidebar={toggleSidebar} />

            <div className={sidebarClose ? cx('content') : cx('content-not-nav')}>
                <Header />
                <div className={cx('main')}>{children}</div>
                {/* <Footer /> */}
            </div>
        </div>
    );
}

export default DefaultLayout;

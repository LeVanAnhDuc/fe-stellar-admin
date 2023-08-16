import classNames from 'classnames/bind';
import styles from './DetailInfo.module.scss';

import Scroll from '../../components/Scroll';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cx = classNames.bind(styles);

function DetaiInfo() {
    const generateRandomData = () => {
        const data = [];
        for (let i = 1; i <= 5; i++) {
            data.push({
                id: i,
                name: `Lê Văn Anh Đức ${i}`,
                email: `levananhduc180levananhduc14${i}@example.com`,
                phone: `123456789${i}`,
            });
        }
        return data;
    };

    const randomData = generateRandomData();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>THÔNG TIN CHI TIẾT NGƯỜI DÙNG</div>

            {/* <div className={cx('content')}> */}

            {/* </div> */}
            <Scroll />
        </div>
    );
}

export default DetaiInfo;

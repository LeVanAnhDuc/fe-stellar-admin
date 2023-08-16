import classNames from 'classnames/bind';
import Form from 'react-bootstrap/Form';

import styles from './ListRoom.module.scss';
import { SearchIcon } from '../../components/Icon';
import Select from '../../components/Select';
import Scroll from '../../components/Scroll';

const cx = classNames.bind(styles);

const STATE = [
    { value: '', label: 'Trạng thái phòng' },
    { value: '1', label: 'Trống' },
    { value: '2', label: 'Đã đặt' },
];

const TYPE = [
    { value: '', label: 'Loại phòng' },
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' },
];

function ListRoom() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>DANH SÁCH ĐẶT PHÒNG</div>
            <div className={cx('adjust')}>
                <div className={cx('fillter')}>
                    <Select options={STATE} className={cx('state-room')} />
                    <Select options={TYPE} className={cx('state-room')} />
                </div>
                <div className={cx('search')}>
                    <input placeholder="Tìm kiếm..." className={cx('input')} />
                    <SearchIcon className={cx('icon')} />
                </div>
            </div>

            <div className={cx('content')}></div>
            <Scroll />
        </div>
    );
}

export default ListRoom;

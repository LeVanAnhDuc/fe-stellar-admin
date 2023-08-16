import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
    return <h1 className={cx('wrapper')}>a</h1>;
}

export default Header;

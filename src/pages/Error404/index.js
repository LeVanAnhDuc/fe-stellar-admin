import Image from '../../components/Image';
import images from '../../assets/image';
import classNames from 'classnames/bind';
import styles from './Error404.module.scss';
const cx = classNames.bind(styles);

function Error404() {
    return (
        <>
            <Image src={images.imageNotFound} className={cx('wrapper')} />
        </>
    );
}

export default Error404;

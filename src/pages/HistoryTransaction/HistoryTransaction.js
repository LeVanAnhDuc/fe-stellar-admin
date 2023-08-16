import classNames from 'classnames/bind';
import styles from './HistoryTransaction.module.scss';
import { SearchIcon } from '../../components/Icon';

import config from '../../config';

import Scroll from '../../components/Scroll';
import Button from '../../components/Button';

import { Table } from 'react-bootstrap';

const cx = classNames.bind(styles);

function HistoryTransaction() {
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

    const DATA = [
        {
            Madonhang: 'Ref. BW20131689481945',
            SoTienThanhToan: '2,515,000 VND',
            ThoiGian: '13:00 - 06.08.2023',
            TrangThai: 'Thất bại',
            SoThe: '',
            NganHang: '',
            // Thêm các cặp key và value khác
        },
        {
            Madonhang: 'Ref. BW20131689481945',
            SoTienThanhToan: '2,515,000 VND',
            ThoiGian: '13:00 - 06.08.2023',
            TrangThai: 'Thất bại',
            SoThe: '',
            NganHang: '',
            // Thêm các cặp key và value khác
        },
        {
            Madonhang: 'Ref. BW20131689481945',
            SoTienThanhToan: '2,515,000 VND',
            ThoiGian: '13:00 - 06.08.2023',
            TrangThai: 'Thất bại',
            SoThe: '',
            NganHang: '',
            // Thêm các cặp key và value khác
        },
        {
            Madonhang: 'Ref. BW20131689481945',
            SoTienThanhToan: '2,515,000 VND',
            ThoiGian: '13:00 - 06.08.2023',
            TrangThai: 'Thất bại',
            SoThe: '',
            NganHang: '',
            // Thêm các cặp key và value khác
        },
        {
            Madonhang: 'Ref. BW20131689481945',
            SoTienThanhToan: '2,515,000 VND',
            ThoiGian: '13:00 - 06.08.2023',
            TrangThai: 'Thất bại',
            SoThe: '',
            NganHang: '',
            // Thêm các cặp key và value khác
        },
        {
            Madonhang: 'Ref. BW20131689481945',
            SoTienThanhToan: '2,515,000 VND',
            ThoiGian: '13:00 - 06.08.2023',
            TrangThai: 'Thất bại',
            SoThe: '',
            NganHang: '',
            // Thêm các cặp key và value khác
        },
    ];

    const randomData = generateRandomData();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>LỊCH SỬ GIAO DỊCH</div>
            <div className={cx('search')}>
                <input placeholder="Tìm kiếm..." className={cx('input')} />
                <SearchIcon className={cx('icon')} />
            </div>
            <div className={cx('content')}>
                {DATA.map((item, index) => (
                    <>
                        <div className={cx('item')}>
                            <div key={index} className={cx('title-item')}>
                                Thanh toán CÔNG TY TNNH KẾ TOÁN
                            </div>
                            <div className={cx('detail-item')}>
                                <Table bordered className={cx('table')}>
                                    <tbody>
                                        {Object.entries(item).map(([key, value], index) => (
                                            <tr key={index} className={cx('info')}>
                                                <td className={cx('key')}>{key}</td>
                                                <td>{value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <Scroll />
        </div>
    );
}

export default HistoryTransaction;

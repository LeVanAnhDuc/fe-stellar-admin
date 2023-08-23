import { useState } from 'react';
import Pie from '../../../components/Chart/Pie';

function PieChart() {
    const generateRandomData = () => {
        const data = [];
        for (let i = 1; i <= 100; i++) {
            data.push({
                id: i,
                maDonHang: `Ma STALLER ${i}`,
                trangThai: i > 10 ? true : false,
                phone: `123456789${i}`,
            });
        }
        return data;
    };
    const randomData = generateRandomData();
    const statusTrue = randomData.filter((data) => data.trangThai).length;
    const statusFalse = randomData.length - statusTrue;
    const [userData, setUserData] = useState({
        labels: ['Phòng được đặt', 'Phòng trống'],
        datasets: [
            {
                label: 'Số phòng',
                data: [statusTrue, statusFalse],
                backgroundColor: ['#c38154', '#f9e0bb'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });
    return <Pie chartData={userData} />;
}

export default PieChart;

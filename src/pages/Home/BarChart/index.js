import { useState } from 'react';
import Bar from '../../../components/Chart/Bar';

const arr = ['Superior Double Or Twin', 'Deluxe Double', 'Executive City View', 'Deluxe Double'];

function LineChart() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generateRandomData = () => {
        const data = [];

        for (let i = 0; i <= 3; i++) {
            data.push({
                id: i,
                name: arr[i],
                number: getRandomInt(1, 150),
            });
        }
        return data;
    };
    const randomData = generateRandomData();
    const [userData, setUserData] = useState({
        labels: arr.map((item) => item),
        datasets: [
            {
                label: 'Số phòng',
                data: randomData.map((item) => item.number),
                backgroundColor: ['#c38154', '#f9e0bb'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });
    return <Bar chartData={userData} />;
}

export default LineChart;

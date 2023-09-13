import { useState, useEffect, memo } from 'react';
import Bar from '../../../components/Chart/Bar';
import { typeRoomApi } from '../../../apis';
import { toast } from 'react-toastify';

function LineChart() {
    const [listTotalRoomsByTypeRoom, setListTotalRoomsByTypeRoom] = useState({
        labels: [],
        datasets: [
            {
                label: 'Số phòng',
                data: [],
                backgroundColor: ['#c38154'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        let ignore = false;
        async function fetchTotalAccounts() {
            await typeRoomApi
                .getListTotalRoomsByTypeRoom()
                .then((response) => {
                    const { data } = response.data;

                    const typeRooms = data ? data.map((item) => item.typeRoom) : [];
                    console.log(typeRooms);
                    const totalRoom = data ? data.map((item) => parseInt(item.totalRoom)) : [];
                    setListTotalRoomsByTypeRoom({
                        labels: typeRooms,
                        datasets: [
                            {
                                label: 'Số phòng',
                                data: totalRoom,
                                backgroundColor: ['#c38154'],
                                borderColor: 'black',
                                borderWidth: 1,
                            },
                        ],
                    });
                })
                .catch((error) => {
                    toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                });
        }

        !ignore && fetchTotalAccounts();

        return () => {
            ignore = true;
        };
    }, []);

    return <Bar chartData={listTotalRoomsByTypeRoom} />;
}

export default LineChart;

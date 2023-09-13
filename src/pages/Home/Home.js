import React from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Button from '../../components/Button';
import config from '../../config';
import Scroll from '../../components/Scroll';

import PieChart from './PieChart/index';
import LineChart from './LineChart/index';
import BarChart from './BarChart/index';

import { useEffect, useState, memo } from 'react';
import { userApi, bookingApi, typeRoomApi } from '../../apis';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Home() {
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalAllTransactionHistory, setTotalAllTransactionHistory] = useState(0);
    const [totalTypeRooms, setTotalTypeRooms] = useState(0);

    useEffect(() => {
        let ignore = false;
        async function fetchTotalAccounts() {
            await userApi
                .getTotalAccounts()
                .then((response) => {
                    setTotalAccounts(parseInt(response.data.data));
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

    useEffect(() => {
        let ignore = false;
        async function fetchTotalAllTransactionHistory() {
            await bookingApi
                .getTotalAllTransactionHistory()
                .then((response) => {
                    setTotalAllTransactionHistory(parseInt(response.data.data));
                })
                .catch((error) => {
                    toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                });
        }
        !ignore && fetchTotalAllTransactionHistory();
    }, []);

    useEffect(() => {
        let ignore = false;
        async function fetchTotalTypeRooms() {
            await typeRoomApi
                .getTotalTyperooms()
                .then((response) => {
                    setTotalTypeRooms(parseInt(response.data.data));
                })
                .catch((error) => {
                    toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                });
        }
        !ignore && fetchTotalTypeRooms();
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <Container>
                    <Row className={cx('row')}>
                        <Col className={cx('col')}>
                            <Card className={cx('card', 'card-1')}>
                                <Card.Header className={cx('header')}>Tài khoản</Card.Header>
                                <Card.Body>
                                    <Card.Title className={cx('title')}>{totalAccounts}</Card.Title>
                                    <Card.Text>Tài khoản</Card.Text>
                                </Card.Body>
                                <Card.Footer className={cx('footer')}>
                                    <Button filled_1 className={cx('btn')} to={config.Routes.infoGuest}>
                                        Danh sách
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col className={cx('col')}>
                            <Card className={cx('card', 'card-2')}>
                                <Card.Header className={cx('header')}>Đặt phòng</Card.Header>
                                <Card.Body>
                                    <Card.Title className={cx('title')}>{totalAllTransactionHistory}</Card.Title>
                                    <Card.Text>Lượt đặt</Card.Text>
                                </Card.Body>
                                <Card.Footer className={cx('footer')}>
                                    <Button filled_1 className={cx('btn')} to={config.Routes.listOrderRoom}>
                                        Danh sách
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col className={cx('col')}>
                            <Card className={cx('card', 'card-3')}>
                                <Card.Header className={cx('header')}>Loại phòng</Card.Header>
                                <Card.Body>
                                    <Card.Title className={cx('title')}>{totalTypeRooms}</Card.Title>
                                    <Card.Text>Loại</Card.Text>
                                </Card.Body>
                                <Card.Footer className={cx('footer')}>
                                    <Button filled_1 className={cx('btn')} to={config.Routes.listTypeRoom}>
                                        Danh sách
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                    <Row className={cx('wrapper-chart')}>
                        <Col>
                            <div className={cx('wrapper-chart-top')}>
                                <LineChart />
                            </div>
                        </Col>
                        <Col>
                            <div className={cx('wrapper-chart-bottom')}>
                                <div className={cx('wrapper-chart-small')}>
                                    <PieChart />
                                </div>
                                <div className={cx('wrapper-chart-small')}>
                                    <BarChart />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Scroll />
            </div>
        </>
    );
}

export default Home;

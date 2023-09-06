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

import { useEffect, useState } from 'react';
import { userApi, bookingRoomApi, typeRoomApi } from '../../apis';

const cx = classNames.bind(styles);

function Home() {
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [countTotalAccounts, setCountTotalAccounts] = useState(0);

    const [totalAllTransactionHistory, setTotalAllTransactionHistory] = useState(0);
    const [countTotalAllTransactionHistory, setCountTotalAllTransactionHistory] = useState(0);

    const [totalTypeRooms, setTotalTypeRooms] = useState(0);
    const [countTotalTypeRooms, setContTotalTypeRooms] = useState(0);

    useEffect(() => {
        async function fetchTotalAccounts() {
            await userApi
                .getTotalAccounts()
                .then((response) => {
                    setTotalAccounts(parseInt(response.data.data));
                })
                .catch((error) => {
                    console.error('Error ftching', error);
                });
        }

        async function fetchTotalAllTransactionHistory() {
            await bookingRoomApi
                .getTotalAllTransactionHistory()
                .then((response) => {
                    setTotalAllTransactionHistory(parseInt(response.data.data));
                })
                .catch((error) => {
                    console.error('Error ftching', error);
                });
        }

        async function fetchTotalTypeRooms() {
            await typeRoomApi
                .getTotalTyperooms()
                .then((response) => {
                    setTotalTypeRooms(parseInt(response.data.data));
                })
                .catch((error) => {
                    console.error('Error ftching', error);
                });
        }

        const intervalTotalAccounts = setInterval(() => {
            setCountTotalAccounts((preState) => {
                if (preState >= totalAccounts) {
                    clearInterval(intervalTotalAccounts);
                    return preState;
                } else {
                    return preState + 1;
                }
            });
        }, [500 / totalAccounts]);

        const intervalTotalAllTransactionHistory = setInterval(() => {
            setCountTotalAllTransactionHistory((preState) => {
                if (preState >= totalAllTransactionHistory) {
                    clearInterval(intervalTotalAllTransactionHistory);
                    return preState;
                } else {
                    return preState + 1;
                }
            });
        }, [500 / totalAllTransactionHistory]);

        const intervalTotalTypeRooms = setInterval(() => {
            setContTotalTypeRooms((preState) => {
                if (preState >= totalTypeRooms) {
                    clearInterval(intervalTotalTypeRooms);
                    return preState;
                } else {
                    return preState + 1;
                }
            });
        }, [500 / totalTypeRooms]);

        fetchTotalAccounts();
        fetchTotalAllTransactionHistory();
        fetchTotalTypeRooms();
        return () => {
            clearInterval(intervalTotalAccounts);
            clearInterval(intervalTotalAllTransactionHistory);
            clearInterval(intervalTotalTypeRooms);
        };
    }, [totalAccounts, totalAllTransactionHistory, totalTypeRooms]);

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col className={cx('col')}>
                        <Card className={cx('card', 'card-1')}>
                            <Card.Header className={cx('header')}>Tài khoản</Card.Header>
                            <Card.Body>
                                <Card.Title className={cx('title')}>{countTotalAccounts}</Card.Title>
                                <Card.Text>Tài khoản</Card.Text>
                            </Card.Body>
                            <Card.Footer className={cx('footer')}>
                                <Button filled_1 className={cx('btn')} to={config.Routes.infoGuest}>
                                    Danh sách
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col>
                        <Card className={cx('card', 'card-2')}>
                            <Card.Header className={cx('header')}>Đặt phòng</Card.Header>
                            <Card.Body>
                                <Card.Title className={cx('title')}>{countTotalAllTransactionHistory}</Card.Title>
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
                                <Card.Title className={cx('title')}>{countTotalTypeRooms}</Card.Title>
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
                <Row>
                    <Col>
                        <div className={cx('wrapper-chart')}>
                            <LineChart />
                        </div>
                    </Col>
                    <Col>
                        <div className={cx('wrapper-chart-small')}>
                            <PieChart />
                        </div>
                        <div className={cx('wrapper-chart-small')}>
                            <BarChart />
                        </div>
                    </Col>
                </Row>
            </Container>

            <Scroll />
        </div>
    );
}

export default Home;

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

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col className={cx('col')}>
                        <Card className={cx('card', 'card-1')}>
                            <Card.Header className={cx('header')}>Tài khoản</Card.Header>
                            <Card.Body>
                                <Card.Title>3333</Card.Title>
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
                                <Card.Title>111</Card.Title>
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
                                <Card.Title>3</Card.Title>
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

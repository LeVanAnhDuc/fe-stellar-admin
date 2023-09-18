import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from '../ListRoom.module.scss';
import Button from '../../../components/Button';
import { roomApi } from '../../../apis';
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ModalUpdate({ handleClose, show, idRoom }) {
    const [roomNumber, setRoomNumber] = useState();
    const [typeBed, setTypeBed] = useState();
    const [acreage, setAcreage] = useState();
    const [prices, setPrices] = useState();
    const [view, setView] = useState();

    const handelUpdate = async () => {
        await roomApi
            .updateRoom(idRoom, roomNumber, typeBed, acreage, prices, view)
            .then((res) => {
                toast.success(res.data.message);
                handleClose();
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    useEffect(() => {
        let ignore = false;
        async function fetchGetRoombyId() {
            await roomApi
                .getRoombyId(idRoom)
                .then((response) => {
                    const { data } = response.data;
                    setRoomNumber(data.roomNumber);
                    setTypeBed(data.typeBed);
                    setAcreage(data.acreage);
                    setPrices(data.prices);
                    setView(data.view);
                })
                .catch((error) => {
                    toast.error(error.response?.data.message ?? 'Mất kết nối server!');
                });
        }
        !ignore && fetchGetRoombyId();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered className={cx('modal')}>
                <Modal.Header closeButton className={cx('header')}>
                    <Modal.Title className={cx('title')}>CHỈNH SỬA DANH SÁCH PHÒNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={cx('label')}>Mã phòng</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                type="text"
                                autoFocus
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Loại giường</Form.Label>
                            <Form.Select
                                className={cx('input-modal')}
                                value={typeBed}
                                onChange={(e) => setTypeBed(e.target.value)}
                            >
                                <option>02 Single bed</option>
                                <option>Double bed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Diện tích</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                type="number"
                                value={acreage}
                                onChange={(e) => setAcreage(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Giá</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                type="text"
                                value={prices}
                                onChange={(e) => setPrices(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>View</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                value={view}
                                onChange={(e) => setView(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={cx('btn')} filled_1 onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={cx('btn')} filled_1 onClick={handelUpdate}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;

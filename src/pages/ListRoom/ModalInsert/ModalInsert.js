import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from '../ListRoom.module.scss';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

function ModalInsert({ handleClose, show }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered className={cx('modal')}>
                <Modal.Header closeButton className={cx('header')}>
                    <Modal.Title className={cx('title')}>CHỈNH SỬA DANH SÁCH PHÒNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={cx('label')}>Tên loại phòng</Form.Label>
                            <Form.Control className={cx('input-modal')} type="text" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Hình ảnh</Form.Label>
                            <Form.Control className={cx('input-modal')} type="file" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Loại giường</Form.Label>
                            <Form.Control className={cx('input-modal')} type="text" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Sức chứa</Form.Label>
                            <Form.Control className={cx('input-modal')} type="number" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Giá</Form.Label>
                            <Form.Control className={cx('input-modal')} type="text" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Trạng thái</Form.Label>
                            <Form.Control className={cx('input-modal')} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={cx('btn')} filled_1 onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={cx('btn')} filled_1 onClick={handleClose}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInsert;
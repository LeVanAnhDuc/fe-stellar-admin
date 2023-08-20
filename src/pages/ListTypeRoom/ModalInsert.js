import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './ListTypeRoom.module.scss';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function ModalInsert({ handleClose, show }) {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered>
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
                        <Form.Label className={cx('label')}>Mô tả</Form.Label>
                        <Form.Control className={cx('input-modal')} as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button filled_1 onClick={handleClose}>
                    Đóng
                </Button>
                <Button filled_1 onClick={handleClose}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalInsert;

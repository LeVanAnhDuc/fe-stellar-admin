import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from '../Utilities.module.scss';
import Button from '../../../components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ModalInsert({ handleClose, show, PostUtilities }) {
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [desc, setDesc] = useState();
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeDesc = (e) => {
        setDesc(e.target.value);
    };
    const handleSetImg = (e) => {
        const fileList = e.target.files;

        const imageArray = Array.from(fileList).map((file) => {
            return URL.createObjectURL(file); // Or use FileReader to convert to base64
        });

        setImage(imageArray);
    };

    const handleComfirm = () => {
        PostUtilities(name, image, desc);
        setName('');
        setDesc('');
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered className={cx('modal')}>
                <Modal.Header closeButton className={cx('header')}>
                    <Modal.Title className={cx('title')}>CHỈNH SỬA DANH SÁCH PHÒNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={cx('label')}>Tên tiện ích</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                type="text"
                                autoFocus
                                value={name}
                                onChange={handleChangeName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Hình ảnh</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                type="file"
                                rows={3}
                                src={image}
                                onChange={handleSetImg}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Mô tả</Form.Label>
                            <Form.Control
                                className={cx('input-modal')}
                                type="text"
                                as="textarea"
                                rows={8}
                                onChange={handleChangeDesc}
                                value={desc}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={cx('btn')} filled_1 onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={cx('btn')} filled_1 onClick={handleComfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInsert;

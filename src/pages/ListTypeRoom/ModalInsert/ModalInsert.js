import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from '../ListTypeRoom.module.scss';
import Button from '../../../components/Button';
import { typeRoomApi } from '../../../apis';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ModalInsert({ handleClose, show, id }) {
    const [formData, setFormData] = useState();
    const [fileList, setFileList] = useState([]);

    const update = async () => {
        await typeRoomApi
            .updateTypeRoom(formData)
            .then((res) => {
                toast.success(res.data.message);
                handleClose();
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    const handleSetImg = (e) => {
        setFileList([...e.target.files]);
    };
    

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            const getFormData = new FormData();
            fileList.forEach((image) => {
                getFormData.append('image', image);
            });
            getFormData.append('idTypeRoom', id);
            setFormData(getFormData);
        }
        return () => {
            ignore = true;
        };
    }, [fileList]);

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered className={cx('modal')}>
                <Modal.Header closeButton className={cx('header')}>
                    <Modal.Title className={cx('title')}>CHỈNH SỬA DANH SÁCH LOẠI PHÒNG</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className={cx('label')}>Hình ảnh</Form.Label>
                        <Form.Control
                            className={cx('input-modal')}
                            src={fileList}
                            onChange={handleSetImg}
                            multiple
                            type="file"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={cx('btn')} filled_1 onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={cx('btn')} filled_1 onClick={update}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInsert;

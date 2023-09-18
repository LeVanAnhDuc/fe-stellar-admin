import { Modal, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '../Utilities.module.scss';
import Button from '../../../components/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { utilitiesApi } from '../../../apis';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ModalUpdate({ handleClose, show, itemID, itemName, itemDesc, itemType }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [fileList, setFileList] = useState([]);
    const [formData, setFormData] = useState();

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            setId(itemID);
            setName(itemName);
            setDesc(itemDesc);
            setType(itemType);
        }
        return () => {
            ignore = true;
        };
    }, []);

    const handleChangeName = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleChangeDesc = (e) => {
        const value = e.target.value;
        setDesc(value);
    };

    const handelChangeType = (e) => {
        setType(e.target.value);
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
            getFormData.append('id', id);
            getFormData.append('name', name);
            getFormData.append('description', desc);
            getFormData.append('type', type);

            setFormData(getFormData);
        }
        return () => {
            ignore = true;
        };
    }, [fileList, name, desc, type]);

    // update item
    const UpdateUtilities = async () => {
        await utilitiesApi
            .updateUtilities(formData)
            .then((res) => {
                toast.success(res.data.message);
                handleClose();
            })
            .catch((error) => {
                toast.error(error.response?.data.message ?? 'Mất kết nối server!');
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" centered className={cx('modal')}>
                <Modal.Header closeButton className={cx('header')}>
                    <Modal.Title className={cx('title')}>CHỈNH SỬA DANH SÁCH TIỆN ÍCH</Modal.Title>
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
                                src={fileList}
                                onChange={handleSetImg}
                                multiple
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={cx('label')}>Loại tiện ích</Form.Label>
                            <Form.Select className={cx('input-modal')} value={type} onChange={handelChangeType}>
                                <option>Restaurant</option>
                                <option>Utilities</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={cx('btn')} filled_1 onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button className={cx('btn')} filled_1 onClick={UpdateUtilities}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;

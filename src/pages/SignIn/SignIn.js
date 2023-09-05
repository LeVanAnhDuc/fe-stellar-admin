import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { authApi } from '../../apis/index.js';
import { useNavigate } from 'react-router-dom';
import { setIsSignIn } from './SignInSlice';

const cx = classNames.bind(styles);

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false); // validate
    const [isValidEmail, setIsValidEmail] = useState(true); // validate mail
    const [isValidPassword, setIsValidPassword] = useState(true); // validate password
    const notificationRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassWord = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = () => {
        // Sử dụng biểu thức chính quy (regex) để kiểm tra tính hợp lệ của email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(email));
    };

    const validatePassword = () => {
        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        setIsValidPassword(passwordPattern.test(password));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (isValidEmail && isValidPassword) {
            await authApi
                .login(email, password)
                .then((response) => {
                    notificationRef.current.classList.remove(cx('hidden'));
                    notificationRef.current.classList.add(cx('success'));
                    notificationRef.current.textContent = response.data.message;
                    dispatch(setIsSignIn(true));
                    navigate('/trang-chu');
                })
                .catch((error) => {
                    notificationRef.current.classList.remove(cx('hidden'));
                    notificationRef.current.classList.add(cx('error'));
                    notificationRef.current.textContent = error.response.data.message;
                });
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Form noValidate validated={validated} className={cx('form')}>
                    <h1>Login</h1>
                    <div ref={notificationRef} className={cx('notification', 'hidden')}></div>

                    <Form.Group controlId="validationCustom01" className={cx('input-box')}>
                        <Form.Control
                            className={cx('input')}
                            required
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={handleChangeEmail}
                            isInvalid={!isValidEmail}
                            onBlur={validateEmail}
                        />
                        <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                        <Form.Control.Feedback type="invalid">Invalid email address.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom02" className={cx('input-box')}>
                        <Form.Control
                            className={cx('input')}
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChangePassWord}
                            isInvalid={!isValidPassword}
                            onBlur={validatePassword}
                        />
                        <FontAwesomeIcon icon={faLock} className={cx('icon')} />
                        <Form.Control.Feedback type="invalid">Invalid password</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className={cx('btn-submit')} onClick={handleSubmit}>
                        Login
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default SignIn;

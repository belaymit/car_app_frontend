/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import logo from '../assets/images/logo.png';
import openedEye from '../assets/images/opened_eye.png';
import closedEye from '../assets/images/closed_eye.png';
import { login, clearError } from '../redux/sessionSlice';
import { getUser } from '../redux/Auth/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((store) => store.session);
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    const property = e.target.name;
    setFormData({
      ...formData,
      [property]: e.target.value,
    });
  };

  const toggleShow = () => {
    setShowPassword(!showPassword);
  };

  const sendForm = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let lengthValid = false;
    let emailFormatValid = false;
    if (formData.email?.length > 0 && formData.password?.length > 0) lengthValid = true;
    if (formData.email?.match(validRegex)) emailFormatValid = true;

    if (lengthValid && emailFormatValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUser());
      navigate('/');
    }
  }, [session, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <section className={styles.onTopContainer}>
      <div className={styles.container}>
        <div className={styles.imageArea}>
          <div className={styles.welcome}> </div>
        </div>
        <div className={styles.formArea}>
          <form onSubmit={sendForm}>
            <img src={logo} alt="logo" />
            <p>LOG IN</p>
            <input type="text" placeholder="email" name="email" onChange={changeHandler} />
            <div className={styles.secretField}>
              <input
                className={styles.secretInput}
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                name="password"
                onChange={changeHandler}
              />
              <button className={styles.eye} type="button" onClick={toggleShow}>
                <img
                  src={showPassword ? openedEye : closedEye}
                  alt="eye"
                />
              </button>
            </div>
            <p className={styles.error}>{session.data.message}</p>
            <button className={styles.submit} type="submit" disabled={!isFormValid}>LOGIN</button>
            <Link to="/register">Create account</Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

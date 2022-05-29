/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import makeRequest from './makeRequest.js';
import logo from './logo.jpeg';

function Login() {
  // const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const params = {
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: makeRequest,
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  };
  const formik = useFormik(params);

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a href="/" className="navbar-brand">Hexlet Chat</a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <img src={logo} alt="logo" className="rounded-circle" />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder="Ваш ник"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        // ref={}
                        required
                      />
                      <Form.Label>Ваш ник</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-2">
                      <Form.Control
                        name="password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        // isInvalid
                        required
                      />
                      <Form.Label>Пароль</Form.Label>
                      {/* <Form.Control.Feedback className="d-flex bg-danger rounded text-white py-1 px-2" type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback> */}
                    </Form.Group>

                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
                  </Form>
                </div>
              </div>
              <div className="card-footer p-4 text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

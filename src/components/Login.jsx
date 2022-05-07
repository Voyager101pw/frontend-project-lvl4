/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import logo from './logo.jpeg';

function Login() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const settings = {
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => { console.log(values); },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
  };

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
                <form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Formik {...settings}>
                    {({
                      errors, values, handleChange, handleSubmit,
                    }) => (
                      <>
                        <div className="form-floating mb-3">
                          <input
                            name="username"
                            id="username"
                            onChange={handleChange}
                            value={values.username}
                            autoComplete="username"
                            placeholder="Ваш ник"
                            className="form-control"
                            required
                            ref={inputRef}
                          />
                          <label className="form-label" htmlFor="username">Ваш ник</label>
                        </div>

                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                            placeholder="Пароль"
                            className="form-control"
                            required
                          />
                          <label className="form-label" htmlFor="password">Пароль</label>
                        </div>
                        {errors.username || errors.password
                          ? <span className="invalid-tooltip bg-danger text-white px-3 py-2 rounded">Неверные имя пользователя или пароль</span>
                          : null}

                        <button
                          type="submit"
                          className="btn btn-outline-primary w-100 mb-3"
                          onSubmit={handleSubmit}
                        >
                          Войти
                        </button>
                      </>
                    )}
                  </Formik>
                </form>
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

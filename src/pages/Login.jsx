import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import routes from '../routes.js';
import AuthContext from '../contexts/AuthContext.jsx';
import logo from '../../public/auth_logo.jpeg';

function Login() {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useContext(AuthContext); // useAuth hook
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (authData) => {
      try {
        const { data: token } = await axios.post(routes.loginPath(), authData);
        localStorage.setItem('userId', JSON.stringify(token));
        auth.logIn();
        navigate(routes.mainPage());
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();
          setAuthFailed(true);
          return;
        }
        toast.error(t('toasts.failLogIn'));
        throw error;
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <img src={logo} alt="logo" className="rounded-circle" />
                </div>
                <div className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t('logIn.title')}</h1>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder="Ваш ник"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={authFailed}
                        ref={inputRef}
                        required
                      />
                      <Form.Label htmlFor="username">{t('logIn.name')}</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        name="password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={authFailed}
                        required
                      />
                      <Form.Label htmlFor="password">{t('logIn.pass')}</Form.Label>
                      <Form.Control.Feedback tooltip type="invalid">{t('logIn.error.failLogIn')}</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" variant="outline-primary" className="w-100">{t('logIn.submit')}</Button>
                  </Form>
                </div>
              </div>
              <div className="card-footer p-4 text-center">
                <span>{t('logIn.noAccount')}</span>
                <Link to={routes.signupPage()}>{t('signUp.title')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

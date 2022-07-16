import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import signLogo from '../../public/sign_logo.jpg';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

function Sign() {
  const auth = useAuth();

  const f = useFormik({
    initialValues: {
      name: '',
      pass: '',
      passConfirm: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
      pass: yup
        .string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      passConfirm: yup
        .string()
        .required('Обязательное поле')
        .test('pass-match', 'Пароли должны совпадать', (passConfirm, form) => passConfirm === form.parent.pass),
    }),
    onSubmit: async ({ name: username, pass: password }, { setErrors }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
      } catch (error) {
        const { status } = error?.response ?? {};
        const { name, message } = error;
        if (status === 409) {
          setErrors({ name: ' ', pass: ' ', passConfirm: 'Такой пользователь уже существует' });
          return;
        }
        if (name === 'AxiosError') {
          setErrors({ name: ' ', pass: ' ', passConfirm: `${name}: ${message}` });
        } else {
          setErrors({ name: ' ', pass: ' ', passConfirm: 'Запрос завершился ошибкой:' });
        }
      }
    },

  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signLogo} alt="sign_logo" className="rounded-circle" />
              </div>

              <Form onSubmit={f.handleSubmit} className="w-50">
                <div className="title d-flex justify-content-center">
                  <h1 className="mb-4">
                    Регистрация
                  </h1>
                </div>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="name"
                    name="name"
                    autoComplete="username"
                    value={f.values.name}
                    required
                    placeholder="Имя пользователя"
                    onChange={f.handleChange}
                    isInvalid={f.errors.name && f.values.name.length}
                    isValid={!f.errors.name && f.values.name.length}
                  />
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{f.errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="pass"
                    name="pass"
                    type="password"
                    autoComplete="password"
                    value={f.values.pass}
                    required
                    placeholder="Пароль"
                    isValid={!f.errors.pass && f.values.pass.length}
                    isInvalid={f.errors.pass && f.values.pass.length}
                    onChange={f.handleChange}
                  />
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{f.errors.pass}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    id="passConfirm"
                    name="passConfirm"
                    type="password"
                    value={f.values.passConfirm}
                    required
                    placeholder="Подтвердить пароль"
                    isValid={!f.errors.passConfirm && f.values.passConfirm.length}
                    isInvalid={f.errors.passConfirm && f.values.passConfirm.length}
                    onChange={f.handleChange}
                  />
                  <Form.Label>Подтвердить пароль</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{f.errors.passConfirm}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-primary w-100" type="submit">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;

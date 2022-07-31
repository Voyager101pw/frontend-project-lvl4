import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import FormFormik from '../components/FormFormik.jsx';
import routes from '../routes.js';
import logo from '../../public/auth_logo.jpeg';
import useAuth from '../hooks/useAuth.jsx';

function Container({ children }) {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={logo} alt="logo" className="rounded-circle" />
                <div className="col-12 col-md-6">
                  {children}
                </div>
              </div>
              <div className="card-footer p-4 text-center">
                <span>{t('login.noAccount')}</span>
                <Link to={routes.signupPage()}>{t('login.registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const handlerHttpError = (error, setErrors, inputRef, t) => {
  inputRef.current.select();
  if (error.response.status === 401) {
    toast.info(t('toasts.failLogin'));
    setErrors({ username: ' ', password: t('login.failLogin') });
  } else {
    toast.warning(t('toasts.errorNetwork'));
    setErrors({ username: ' ', password: ' ' });
  }
  throw error;
};

function Login() {
  const { authorization } = useAuth();
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const Form = FormFormik({
    typeForm: 'login',
    settingInputs: [
      { name: 'username', mb: 'mb-3', inputRef },
      { name: 'password', mb: 'mb-5' },
    ],
    onSubmit: async (authData, { setErrors }) => {
      try {
        await authorization(authData);
        navigate(routes.mainPage());
      } catch (error) {
        handlerHttpError(error, setErrors, inputRef, t);
      }
    },
  });

  return (<Container>{Form}</Container>);
}

export default Login;

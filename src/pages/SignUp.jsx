import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import FormFormik from '../components/FormFormik.jsx';

import signLogo from '../../public/sign_logo.jpg';

function Container({ children }) {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <img src={signLogo} alt="sign_logo" className="rounded-circle" />
              <div className="w-50">
                {children}
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
  if (error.response.status === 409) setErrors({ name: ' ', pass: ' ', passConfirm: t('signup.errors.userExist') });
  else setErrors({ name: ' ', pass: ' ', passConfirm: t('signup.errors.someError') });
};

function Sign() {
  const { registration } = useAuth();
  const { t } = useTranslation();
  const inputRef = useRef();

  const Form = FormFormik({
    typeForm: 'signup',
    settingInputs: [
      { name: 'username', mb: 'mb-3', inputRef },
      { name: 'password', mb: 'mb-3' },
      { name: 'passConfirm', mb: 'mb-4' },
    ],
    onSubmit: async (authData, { setErrors }) => {
      try {
        await registration(authData);
      } catch (error) {
        handlerHttpError(error, setErrors, inputRef, t);
      }
    },
  });

  return (<Container>{Form}</Container>);
}

export default Sign;

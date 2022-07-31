import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts/AuthContext.jsx';
import routes from '../routes.js';

const sendData = async (url, authData) => {
  const { data } = await axios.post(url, authData);
  localStorage.setItem('userId', JSON.stringify(data));
  return data;
};

const showToast = (page, user, t) => toast.success(`${t(`toasts.success${page}`)} ${user}!🥳🎉`);

function AuthProvider({ children }) {
  const { t } = useTranslation();
  const { token, username } = JSON.parse(localStorage.getItem('userId')) ?? {};
  const [loggedIn, setloggedIn] = useState(Boolean(token));

  const logIn = () => setloggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setloggedIn(false);
  };
  const authorization = async (authData) => {
    const data = await sendData(routes.loginPath(), authData);
    showToast('Login', data.username, t);
    logIn();
  };
  const registration = async (authData) => {
    const data = await sendData(routes.signupPath(), authData);
    showToast('Signup', data.username, t);
    logIn();
  };

  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
  const value = useMemo(() => ({
    username, loggedIn, logIn, logOut, authorization, registration,
  }), [loggedIn, username]);

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}

export default AuthProvider;

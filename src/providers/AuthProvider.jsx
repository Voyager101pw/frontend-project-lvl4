import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

function AuthProvider({ children }) {
  const { token, username } = JSON.parse(localStorage.getItem('userId')) ?? {};
  const isAuth = Boolean(token);

  const [loggedIn, setloggedIn] = useState(isAuth);

  const logIn = () => {
    setloggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setloggedIn(false);
  };

  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
  const value = useMemo(() => ({
    username, loggedIn, logIn, logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

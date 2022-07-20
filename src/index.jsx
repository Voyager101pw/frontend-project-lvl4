import React from 'react';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';
import providers from './providers/index.jsx';
import 'react-toastify/dist/ReactToastify.css';

const {
  StoreProvider, AuthProvider, SocketProvider, I18nextProvider,
} = providers;

function initApp() {
  return (
    <SocketProvider>
      <StoreProvider>
        <I18nextProvider>
          <AuthProvider>
            <ToastContainer />
            <App />
          </AuthProvider>
        </I18nextProvider>
      </StoreProvider>
    </SocketProvider>
  );
}

export default initApp;

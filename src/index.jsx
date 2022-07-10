import React from 'react';
import App from './App.jsx';
import providers from './providers/index.jsx';

const { StoreProvider, AuthProvider ,SocketProvider, } = providers;

function initApp() {
  return (
    <StoreProvider>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default initApp;

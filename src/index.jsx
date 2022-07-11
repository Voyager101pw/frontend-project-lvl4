import React from 'react';

import App from './App.jsx';
import providers from './providers/index.jsx';

const { StoreProvider, AuthProvider, SocketProvider } = providers;

function initApp() {
  return (
    <SocketProvider>
      <StoreProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoreProvider>
    </SocketProvider>
  );
}

export default initApp;

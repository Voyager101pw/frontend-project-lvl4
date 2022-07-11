import React from 'react';
import { io } from 'socket.io-client';
import App from './App.jsx';
import providers from './providers/index.jsx';

const { StoreProvider, AuthProvider, SocketProvider } = providers;

const socket = io();
function initApp() {
  return (
    <StoreProvider>
      <AuthProvider>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default initApp;

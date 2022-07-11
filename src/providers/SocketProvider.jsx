import React from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext.jsx';

function SocketProvider({ children }) {
  const socket = io();

  socket.promisifyEmit = (...args) => new Promise((resolve, reject) => {
    socket.emit(...args, ({ status, data }) => {
      if (status !== 'ok') reject(new Error('Ошибка сети'));
      resolve(data);
    });
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

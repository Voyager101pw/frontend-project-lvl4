import React, { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext.jsx';

function SocketProvider({socket, children }) {
  console.log('x')
  const addChannel = (name) => socket.emit('newChannel', { name }, (res) => {
    console.log(res);
  });
  const removeChannel = (id) => socket.emit('removeChannel', { id }, (res) => {
    console.log(res);
  });
  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name }, (res) => {
    console.log(res);
  });
  const addMessage = (channelId, username, text) => socket.emit('newMessage', { channelId, username, text }, (res) => {
    console.log(res);
  });

  const socketFeature = useMemo(() => ({ // correct code for ESLint rule
    addChannel,
    removeChannel,
    renameChannel,
    addMessage,
  }), []);

  // Rule:
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md

  return (
    <SocketContext.Provider value={socketFeature}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

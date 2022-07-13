import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { addChannel, removeChannel, renameChannel } from '../slices/channels/channelsSlice';
import { addOneMessage, removeMessagesChannel } from '../slices/messages/messagesSlice.js';
import useSocket from '../hooks/useSocket.jsx';

function StoreProvider({ children }) {
  const socket = useSocket();

  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(removeMessagesChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  socket.on('newMessage', (data) => {
    store.dispatch(addOneMessage(data));
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;

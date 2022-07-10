import React from 'react';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import store from '../store';
import { addChannel, removeChannel, renameChannel } from '../slices/channels/channelsSlice';
import { addOneMessage } from '../slices/messages/messagesSlice.js';

// Если фронт обслуживается в том же домене, что и сервер, то можно просто использовать io()
const socket = io();

socket.on('newChannel', (res) => {
  const { status, data } = res;
  store.dispatch(addChannel(data));
});

socket.on('removeChannel', (res) => {
  const { status, data } = res;
  store.dispatch(removeChannel(data));
});

socket.on('renameChannel', (res) => {
  const { status, data } = res;
  store.dispatch(renameChannel(data));
});

socket.on('newMessage', (res) => {
  const { status, data } = res;
  store.dispatch(addOneMessage(data));
});

function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;

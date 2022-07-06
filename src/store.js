import { configureStore } from '@reduxjs/toolkit';
import channelsSclie from './slices/channels/channelsSlice.js';
import messagesSlice from './slices/messages/messagesSlice.js';
import modalSlice from './slices/modal/modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsSclie,
    messages: messagesSlice,
    modal: modalSlice,
  },
  preloadedState: {
    channels: {
      entities: {},
      ids: [],
    },
  },
});

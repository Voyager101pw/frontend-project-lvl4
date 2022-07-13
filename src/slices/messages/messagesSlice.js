import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addOneMessage: messagesAdapter.addOne,
    addManyMessages: messagesAdapter.addMany,
    removeMessagesChannel: (state, { payload: id }) => {
      const removedIds = Object
        .values(state.entities)
        .filter((entiti) => entiti.channelId === id)
        .map((removedMessage) => removedMessage.id);
      if (removedIds.length) messagesAdapter.removeMany(state, removedIds);
    },
  },
});

export default messagesSlice.reducer;

export const { addManyMessages, addOneMessage, removeMessagesChannel } = messagesSlice.actions;

export const {
  selectIds: selectIdsMessages,
  selectById: selectMessageById,
  selectEntities: selectAllMessages,
} = messagesAdapter.getSelectors((state) => state.messages);

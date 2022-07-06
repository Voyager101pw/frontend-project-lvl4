import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addManyMessages: messagesAdapter.addMany,
    addOneMessage: messagesAdapter.addOne,
  },
});

export default messagesSlice.reducer;

export const { addManyMessages, addOneMessage } = messagesSlice.actions;

export const {
  selectIds: selectIdsMessages,
  selectById: selectMessageById,
  selectEntities: selectAllMessages,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectNewIdMessage = (state) => {
  const { ids } = state.messages;
  const newId = ids[ids.length] + 1;
  return newId;
};

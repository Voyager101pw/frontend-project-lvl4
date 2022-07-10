import {
  createSlice,
  createEntityAdapter,
  createSelector, // because included code from the "Reselect" library (memoization feature)
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addOneMessage: messagesAdapter.addOne,
    addManyMessages: messagesAdapter.addMany,
  },
});

export default messagesSlice.reducer;

export const { addManyMessages, addOneMessage } = messagesSlice.actions;

export const {
  selectIds: selectIdsMessages,
  selectById: selectMessageById,
  selectEntities: selectAllMessages,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectNewIdMessage = createSelector(
  (state) => state.messages.ids,
  (ids) => ids[ids.length] + 1,
);

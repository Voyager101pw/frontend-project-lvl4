import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

export const fetchChannels = createAsyncThunk('chat/fetchData', async (headers) => {
  // const { data } = await axios.get(routes.usersPath(), headers);
  // return data;
});

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addManyChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    // removeChannel: (state, { payload: { id } }) => {
    //   state.entities = Object
    //     .fromEntries(Object.entries(state.entities)
    //       .filter(([key]) => parseInt(key, 10) !== id));
    //   state.ids = state.ids.filter((channelId) => channelId !== id);
    // },
    removeChannel: channelsAdapter.removeOne, // Аналогично черзе адаптер
    // renameChannel: (state, action) => {
    //   state.entities[action.payload.id] = action.payload.newName;
    // },
    renameChannel: channelsAdapter.upsertOne,
    toggleCurrentChannel: (state, { payload: newId }) => {
      state.currentChannelId = parseInt(newId, 10);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        const { channels, messages, currentChannelId } = payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
        // state.messages = messages;
      });
  },
});

export const {
  removeChannel, addChannel, renameChannel, toggleCurrentChannel, addManyChannels, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const {
  selectIds: selectIdsChannels,
  selectById: selectChannelById,
  selectEntities: selectEntitiesChannels, // selectAllChannels = (state) => state.channels.entities;
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectIdCurrentChannel = (state) => state.channels.currentChannelId ?? null;
export const selectNameSelectedChannel = (state) => {
  const channels = state.channels.entities;
  const currentId = state.channels.currentChannelId;
  return channels[currentId]?.name ?? null;
};

export const selectNewId = (state) => state.channels.ids.length + 1;

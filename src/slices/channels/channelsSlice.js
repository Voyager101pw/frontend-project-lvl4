/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter, // Normalized structure, CRUD reducers, ready selectors form normalize struc.
  createSelector, // Because included code from the "Reselect" library (memoization feature)
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    // CRUD reducers from entityAdapter
    addManyChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload: id }) => {
      channelsAdapter.removeOne(state, id);
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: channelsAdapter.upsertOne,

    // Custom reducers
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    toggleCurrentChannel: (state, { payload: newId }) => {
      state.currentChannelId = parseInt(newId, 10);
    },
  },
});

export const {
  removeChannel, addChannel, renameChannel,
  toggleCurrentChannel, addManyChannels, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const {
  selectIds: selectIdsChannels,
  selectById: selectChannelById,
  selectEntities: selectEntitiesChannels,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectIdCurrentChannel = createSelector(
  (state) => state,
  (state) => state.channels.currentChannelId,
);

export const selectNameSelectedChannel = createSelector(
  [(state) => state.channels.entities, (state) => state.channels.currentChannelId],
  (channels, currentId) => channels[currentId]?.name,
);

export const selectChannelNames = createSelector(
  [(state) => state.channels.ids, (state) => state.channels.entities],
  (ids, channels) => ids.map((id) => channels[id].name),
);

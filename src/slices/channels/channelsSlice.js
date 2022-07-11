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
    removeChannel: channelsAdapter.removeOne,
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

// export const selectIdCurrentChannel = (state) => state.channels.currentChannelId ?? null;
export const selectIdCurrentChannel = createSelector(
  (state) => state,
  (state) => state.channels.currentChannelId,
);
// export const selectIdsChannels = createSelector(
//   [(state) => state],
//   (state) => state.channels.ids,
// );
// export const selectEntitiesChannels = createSelector(
//   [(state) => state],
//   (state) => state.channels.entities,
// );

export const selectNameSelectedChannel = (state) => {
  const channels = state.channels.entities;
  const currentId = state.channels.currentChannelId;
  return channels[currentId]?.name;
};

export const selectNewId = (state) => state.channels.ids.length + 1;

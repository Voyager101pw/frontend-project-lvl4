/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    id: null,
    isOpened: false,
    typeCurrentModal: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { idChannel = null, type } = payload;
      state.id = idChannel;
      state.isOpened = true;
      state.typeCurrentModal = type;
    },
    closeModal: (state) => {
      state.typeCurrentModal = null;
      state.id = null;
      state.isOpened = false;
    },
    addManyProps: (state, { payload }) => {
      Object.entries(payload).forEach(([k, v]) => {
        state[k] = v;
      });
    },
  },
});

export const { openModal, closeModal, addManyProps } = modalSlice.actions;

export default modalSlice.reducer;

export const selectModalIsOpened = (state) => state.modal.isOpened;
export const selectTypeCurrentModal = (state) => state.modal.typeCurrentModal;
export const selectEditableId = (state) => state.modal.id;

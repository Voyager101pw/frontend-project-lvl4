import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modal/modalSlice.js';

const iconSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

function AddChannelBtn() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenModal = () => {
    dispatch(openModal({ type: 'Add' }));
  };
  return (
    <div className="d-flex ps-4 pe-2 mb-2 justify-content-between">
      <span>{t('chatPage.channels')}</span>
      <button
        type="button"
        className="text-primary border-0 p-0 btn btn-group-vertical"
        onClick={handleOpenModal}
      >
        {iconSVG}
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
}

export default AddChannelBtn;

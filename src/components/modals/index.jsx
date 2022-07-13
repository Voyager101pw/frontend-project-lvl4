import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { selectModalIsOpened, selectTypeCurrentModal, closeModal } from '../../slices/modal/modalSlice';

import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const modals = { Add, Rename, Remove };

function ShowModal() {
  const dispatch = useDispatch();

  const isOpened = useSelector(selectModalIsOpened);
  const typeCurrentModal = useSelector(selectTypeCurrentModal);

  if (!isOpened) return null;

  const hideModal = () => dispatch(closeModal());
  const SelectedModal = modals[typeCurrentModal];
  return (
    <Modal show centered onHide={hideModal}>
      <SelectedModal onHide={hideModal} />
    </Modal>
  );
}

export default ShowModal;

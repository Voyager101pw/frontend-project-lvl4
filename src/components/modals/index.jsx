import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { selectModalIsOpened, selectTypeCurrentModal, closeModal } from '../../slices/modal/modalSlice';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  add: AddChannel,
  rename: RenameChannel,
};

function ShowModal() {
  const isOpened = useSelector(selectModalIsOpened);
  const typeCurrentModal = useSelector(selectTypeCurrentModal);
  const dispatch = useDispatch();

  if (!isOpened) return null;

  const SelectedModal = modals[typeCurrentModal];
  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <SelectedModal />
    </Modal>
  );
}

export default ShowModal;

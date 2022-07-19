import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket.jsx';
import { selectEditableId } from '../../slices/modal/modalSlice';

function RemoveChannel({ onHide }) {
  const { t } = useTranslation();
  const socket = useSocket();

  const id = useSelector(selectEditableId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await socket.promisifyEmit('removeChannel', { id });
      onHide();
      // success toast
    } catch (textError) {
      console.warn(textError);
      // fail toast
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead p-0">{t('modals.remove.body')}</p>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={onHide}>{t('modals.cancelBtn')}</Button>
            <Button type="submit" variant="danger">{t('modals.removeBtn')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
}

export default RemoveChannel;

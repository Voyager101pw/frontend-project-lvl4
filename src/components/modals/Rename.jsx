import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { selectChannelById, selectChannelNames } from '../../slices/channels/channelsSlice';
import { closeModal, selectEditableId } from '../../slices/modal/modalSlice';
import useSocket from '../../hooks/useSocket.jsx';

function ModalRenameChannel({ onHide }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();

  const socket = useSocket();
  const idEditableChannel = useSelector(selectEditableId);
  const { name } = useSelector((state) => selectChannelById(state, idEditableChannel));
  const channelNames = useSelector(selectChannelNames);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const f = useFormik({
    initialValues: { channelName: name },
    onSubmit: async ({ channelName }) => {
      try {
        await socket.promisifyEmit('renameChannel', { id: idEditableChannel, name: channelName });
        dispatch(closeModal());
        toast.info(t('toasts.rename'));
      } catch (textError) {
        console.warn(textError);
        toast.error(t('toasts.failRename'));
      }
    },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .trim()
        .required(t('errors.required'))
        .min(3, t('errors.minMax'))
        .max(20, t('errors.minMax'))
        .test(
          'is unique',
          t('errors.uniq'),
          (newName) => !channelNames.includes(newName),
        ),
    }),
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="channelName"
              name="channelName"
              className="mb-2"
              value={f.values.channelName}
              isInvalid={f.errors.channelName}
              onChange={f.handleChange}
              ref={inputRef}
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">{f.errors.channelName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={onHide}>{t('modals.cancelBtn')}</Button>
            <Button variant="primary" type="submit">{t('modals.sendBtn')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ModalRenameChannel;

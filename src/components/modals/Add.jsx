import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { selectChannelNames, setCurrentChannelId } from '../../slices/channels/channelsSlice.js';
import useSocket from '../../hooks/useSocket.jsx';

function ModalAddChannel({ onHide }) {
  const socket = useSocket();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelNames = useSelector(selectChannelNames);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: { channelName: '' },
    onSubmit: async ({ channelName: name }) => {
      try {
        const { id } = await socket.promisifyEmit('newChannel', { name }); // id - id added channel
        onHide();
        dispatch(setCurrentChannelId(id));
        toast.success(t('toasts.add'));
      } catch (textError) {
        console.warn(textError);
        toast.error(t('toasts.failAdd'));
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
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="channelName"
              value={f.values.channelName}
              isInvalid={f.errors.channelName}
              onChange={f.handleChange}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{f.errors.channelName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>{t('modals.cancelBtn')}</Button>
            <Button type="submit" variant="primary">{t('modals.sendBtn')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ModalAddChannel;

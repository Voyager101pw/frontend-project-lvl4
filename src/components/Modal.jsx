import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { Formik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import useSocket from '../hooks/useSocket.jsx';
import {
  selectModalIsOpened, selectTypeCurrentModal, closeModal, selectEditableId,
} from '../slices/modal/modalSlice';
import { selectChannelNames, setCurrentChannelId } from '../slices/channels/channelsSlice.js';

function ShowModal() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();
  const inputRef = useRef();

  const typeModal = useSelector(selectTypeCurrentModal);

  useEffect(() => {
    inputRef.current?.focus();
  }, [typeModal]);

  const isOpened = useSelector(selectModalIsOpened);
  const channelNames = useSelector(selectChannelNames);
  const idEditableChannel = useSelector(selectEditableId);
  const id = useSelector(selectEditableId);
  if (!isOpened) return null;

  const hideModal = () => dispatch(closeModal());

  const handlers = {
    Add: async ({ channelName }) => {
      const data = await socket.promisifyEmit('newChannel', { name: channelName });
      dispatch(setCurrentChannelId(data.id));
      toast.success(t('toasts.add'));
    },
    Rename: async ({ channelName }) => {
      await socket.promisifyEmit('renameChannel', { id: idEditableChannel, name: channelName });
      toast.info(t('toasts.rename'));
    },
    Remove: async () => {
      await socket.promisifyEmit('removeChannel', { id });
      toast.warning(t('toasts.remove'));
    },
  };

  const validationSchema = yup.object({
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
      )
      .test(
        'contains obscene',
        t('errors.obscene'),
        (newName) => !filter.check(newName),
      ),
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.${typeModal.toLowerCase()}.title`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            try {
              handlers[typeModal](values);
              hideModal();
            } catch (textError) {
              console.warn(textError);
              toast.error(t(`toasts.fail${typeModal}`));
            }
          }}
        >
          {
            ({
              values, errors, handleChange, handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                {
                  typeModal === 'Remove'
                    ? (
                      <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.cancelBtn')}</Button>
                        <Button onClick={() => { handlers[typeModal](); hideModal(); }} variant="danger">{t('modals.removeBtn')}</Button>
                      </div>
                    )
                    : (
                      <>
                        <Form.Group>
                          <Form.Control
                            id="channelName"
                            name="channelName"
                            className="mb-2"
                            value={values.channelName}
                            isInvalid={errors?.channelName}
                            onChange={handleChange}
                            ref={inputRef}
                          />
                          <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
                          <Form.Control.Feedback type="invalid">{errors?.channelName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-end">
                          <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.cancelBtn')}</Button>
                          <Button variant="primary" type="submit">{t('modals.sendBtn')}</Button>
                        </Form.Group>
                      </>
                    )
                }
              </Form>
            )
          }
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ShowModal;

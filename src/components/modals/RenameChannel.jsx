import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { selectChannelById, renameChannel } from '../../slices/channels/channelsSlice';
import { closeModal, selectEditableId } from '../../slices/modal/modalSlice';

function ModalRenameChannel() {
  const idEditableChannel = useSelector(selectEditableId);
  const { name } = useSelector((state) => selectChannelById(state, idEditableChannel));
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: { channelName: name },
    onSubmit: ({ channelName }) => {
      dispatch(renameChannel({ id: idEditableChannel, name: channelName }));
      dispatch(closeModal());
    },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов'),
    }),
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
            <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ModalRenameChannel;

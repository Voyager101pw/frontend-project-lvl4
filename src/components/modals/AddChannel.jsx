import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { closeModal } from '../../slices/modal/modalSlice';
import useSocket from '../../hooks/useSocket.jsx';

function ModalAddChannel() {
  const socket = useSocket();
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: { channelName: '' },
    onSubmit: async ({ channelName: name }) => {
      try {
        await socket.promisifyEmit('newChannel', { name });
        dispatch(closeModal());
        // success toast
      } catch (textError) {
        console.warn(textError);
        // fail toast
      }
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
        <Modal.Title>Добавить канал</Modal.Title>
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
            <Button className="me-2" variant="secondary" onClick={() => dispatch(closeModal())}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ModalAddChannel;

import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';

import { useFormik } from 'formik';
import { selectChannelNames, setCurrentChannelId } from '../../slices/channels/channelsSlice.js';

import useSocket from '../../hooks/useSocket.jsx';

function ModalAddChannel({ onHide }) {
  const socket = useSocket();
  const inputRef = useRef();
  const dispatch = useDispatch();
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
        // success toast
      } catch (textError) {
        console.warn(textError);
        // fail toast
      }
    },
    validationSchema: yup.object({
      channelName: yup
        .string()
        .trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .test(
          'is unique',
          'Имя канала должно быть уникальным',
          (newName) => !channelNames.includes(newName),
        ),
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
            <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ModalAddChannel;

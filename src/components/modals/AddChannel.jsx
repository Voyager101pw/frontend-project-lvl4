import React, { useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { closeModal } from '../../slices/modal/modalSlice';
import useSocket from '../../hooks/useSocket.jsx';
import { selectIdsChannels as selectIds, selectEntitiesChannels as selectChannels, setCurrentChannelId } from '../../slices/channels/channelsSlice.js';

function ModalAddChannel() {
  const socket = useSocket();
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [ids, channels] = useSelector((state) => [selectIds(state), selectChannels(state)]);
  const listChannelNames = useMemo(() => ids.map((id) => channels[id].name), []);

  const f = useFormik({
    initialValues: { channelName: '' },
    onSubmit: async ({ channelName: name }) => {
      try {
        const { id } = await socket.promisifyEmit('newChannel', { name }); // id - id added channel
        dispatch(closeModal());
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
          (newName) => !listChannelNames.includes(newName),
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
            <Button className="me-2" variant="secondary" onClick={() => dispatch(closeModal())}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default ModalAddChannel;

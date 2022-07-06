import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { closeModal } from '../../slices/modal/modalSlice';
import { selectNewId, addChannel } from '../../slices/channels/channelsSlice';

function ModalAddChannel() {
  const inputRef = useRef();
  const newId = useSelector(selectNewId);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: { channelName: '' },
    onSubmit: ({ channelName }) => {
      dispatch(addChannel({ id: newId, name: channelName, removable: true }));
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

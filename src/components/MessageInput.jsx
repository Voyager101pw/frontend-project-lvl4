import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import { selectIdCurrentChannel } from '../slices/channels/channelsSlice.js';
import useSocket from '../hooks/useSocket.jsx';
import useAuth from '../hooks/useAuth.jsx';

const svgArrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1
      1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1
      2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5
      0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3
      a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
    />
  </svg>
);

function MessageInput() {
  const [text, setText] = useState('');
  const inputRef = useRef();
  const { t } = useTranslation();

  const socket = useSocket();
  const { username } = useAuth();

  const channelId = useSelector(selectIdCurrentChannel);
  const clearInput = () => setText('');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // window.onerror("TestError: Hello world", window.location.href)
    try {
      const filtredText = filter.clean(text);
      await socket.promisifyEmit('newMessage', { channelId, username, text: filtredText });
      clearInput();
    } catch (textError) {
      toast.error(t('toasts.failSendMsg'));
      console.warn(textError);
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="border rounded-2 py-1"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <Form.Control
            placeholder={t('chatPage.input')}
            className="border-0 p-0 ps-2"
            name="text"
            value={text}
            onChange={handleChange}
            ref={inputRef}
            aria-label="?????????? ??????????????????"
          />
          <Button
            type="submit"
            variant="text outline-secondary btn-group-vertical border-0"
            disabled={!text.length}
          >
            {svgArrowRight}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default MessageInput;

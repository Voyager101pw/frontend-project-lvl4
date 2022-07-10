import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIdCurrentChannel } from '../slices/channels/channelsSlice.js';
import { selectAllMessages, selectIdsMessages } from '../slices/messages/messagesSlice.js';

function MessagesBoard() {
  const ids = useSelector(selectIdsMessages);
  const entities = useSelector(selectAllMessages);
  const idCurrentChannel = useSelector(selectIdCurrentChannel);
  const messagesBoxRef = useRef();

  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  });
  const messages = ids.reduce((acc, id) => {
    if (entities[id].channelId !== idCurrentChannel) return acc;
    const { id: idMessage, username, text } = entities[id];
    const item = (
      <div key={idMessage} className="text-break mb-2">
        <b>{username}</b>
        {': '}
        {text}
      </div>
    );
    return [...acc, item];
  }, []);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBoxRef}>
      {messages}
    </div>
  );
}

export default MessagesBoard;

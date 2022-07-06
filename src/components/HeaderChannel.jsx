import React from 'react';
import { useSelector } from 'react-redux';
import { selectNameSelectedChannel, selectIdCurrentChannel } from '../slices/channels/channelsSlice.js';
import { selectIdsMessages, selectAllMessages } from '../slices/messages/messagesSlice.js';

function HeaderChannel() {
  const idCurrentChannel = useSelector(selectIdCurrentChannel);
  const ids = useSelector(selectIdsMessages);
  const entities = useSelector(selectAllMessages);
  const messagesLength = ids.filter((id) => entities[id].channelId === idCurrentChannel).length;

  const nameSelectedChannel = useSelector(selectNameSelectedChannel);

  return (
    <div className="mb-4 p-3 shadow-sm small bg-light">
      <p className="mb-0">
        <b>{`# ${nameSelectedChannel}`}</b>
      </p>
      <span className="text-secondary">{`${messagesLength} сообщений`}</span>
    </div>
  );
}

export default HeaderChannel;

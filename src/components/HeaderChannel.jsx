import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectNameSelectedChannel, selectIdCurrentChannel } from '../slices/channels/channelsSlice.js';
import { selectIdsMessages, selectAllMessages } from '../slices/messages/messagesSlice.js';

function HeaderChannel() {
  const { t } = useTranslation();
  const idCurrentChannel = useSelector(selectIdCurrentChannel);
  const ids = useSelector(selectIdsMessages);
  const entities = useSelector(selectAllMessages);
  const messagesLength = ids.filter((id) => entities[id].channelId === idCurrentChannel).length;

  const nameSelectedChannel = useSelector(selectNameSelectedChannel);
  return (
    <div className="mb-4 p-3 shadow-sm small bg-light">
      <p className="mb-0">
        <b>{nameSelectedChannel ? `# ${nameSelectedChannel}` : `${t('chatPage.channelIsNotSelected')}`}</b>
      </p>
      <span className="text-secondary">{`${messagesLength} ${t('chatPage.messages')}`}</span>
    </div>
  );
}

export default HeaderChannel;

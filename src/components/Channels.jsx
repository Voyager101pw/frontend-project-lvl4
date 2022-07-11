import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { openModal } from '../slices/modal/modalSlice';

import {
  toggleCurrentChannel,
  selectEntitiesChannels, selectIdCurrentChannel, selectIdsChannels,
} from '../slices/channels/channelsSlice';
import useSocket from '../hooks/useSocket.jsx';

function Channels() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const channels = useSelector(selectEntitiesChannels);
  const ids = useSelector(selectIdsChannels);
  const idCurrentChanndel = useSelector(selectIdCurrentChannel);

  const selectChannel = (id) => (e) => {
    dispatch(toggleCurrentChannel(id));
    e.target.blur();
  };

  const handleRemoveChannel = async (id) => {
    try {
      await socket.promisifyEmit('removeChannel', { id });
      // success toast
    } catch (textError) {
      console.warn(textError);
      // fail toast
    }
  };
  const handleRenameChannel = (id) => {
    dispatch(openModal({ type: 'rename', idChannel: id }));
  };

  const items = ids.map((id) => {
    const { name: channelName, removable } = channels[id];
    const isSelected = id === idCurrentChanndel;
    const channelClass = cn('btn w-100 rounded-0 d-flex', { 'btn-secondary': isSelected });
    return (
      <li className="nav-item" key={id}>
        { removable
          ? (
            <div role="group" className="d-flex dropdown btn-group">
              <button type="button" className={channelClass} onClick={selectChannel(id)}>
                <span>{`# ${channelName}`}</span>
              </button>
              <DropdownButton variant={isSelected ? 'secondary' : 'btn-secondary'} title="">
                <Dropdown.Item href="#" onClick={() => handleRemoveChannel(id)}>
                  Удалить
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => handleRenameChannel(id)}>
                  Переименовать
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )
          : (
            <button type="button" className={channelClass} onClick={selectChannel(id)}>
              <span>{`# ${channelName}`}</span>
            </button>
          )}
      </li>
    );
  });

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {items}
    </ul>
  );
}

export default Channels;

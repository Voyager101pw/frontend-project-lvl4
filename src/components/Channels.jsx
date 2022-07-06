import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { openModal } from '../slices/modal/modalSlice';

import {
  removeChannel, toggleCurrentChannel,
  selectEntitiesChannels, selectIdCurrentChannel, selectIdsChannels,
} from '../slices/channels/channelsSlice';

const showMenuHandle = (e) => {
  document.querySelectorAll('.dropdown-menu').forEach((elm) => elm.classList.contains('show') && elm.classList.remove('show'));
  e.target.nextSibling.classList.toggle('show');
};

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector(selectEntitiesChannels);
  const ids = useSelector(selectIdsChannels);
  const idCurrentChanndel = useSelector(selectIdCurrentChannel);

  if (!ids.length) return null;

  const selectChannel = (id) => (e) => {
    dispatch(toggleCurrentChannel(id));
    e.target.blur();
  };

  const elements = ids.map((id) => {
    const { name: channelName, removable } = channels[id];
    const isSelected = id === idCurrentChanndel;
    const channelClass = cn('btn w-100 rounded-0 d-flex', { 'btn-secondary': isSelected });
    const dropdownClass = cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', { 'btn-secondary': isSelected });
    return (
      <li className="nav-item" key={id}>
        { removable
          ? (
            <div role="group" className="d-flex dropdown btn-group">
              <button type="button" className={channelClass} onClick={selectChannel(id)}>
                <span>{`# ${channelName}`}</span>
              </button>
              <button type="button" className={dropdownClass} onClick={showMenuHandle}>
                <span className="visually-hidden">Управление каналом</span>
              </button>
              <div
                className="dropdown-menu"
                data-popper-placement="bottom-start"
                style={{
                  position: 'absolute',
                  inset: '0px auto auto 0px',
                  transform: 'translate(113px, 40px)',
                }}
              >
                <a href="#" tabIndex="0" className="dropdown-item" onClick={() => dispatch(removeChannel(id))}>Удалить</a>
                <a href="#" tabIndex="0" className="dropdown-item" onClick={() => dispatch(openModal({ type: 'rename', idChannel: id }))}>Переименовать</a>
              </div>
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
      {elements}
    </ul>
  );
}

export default Channels;

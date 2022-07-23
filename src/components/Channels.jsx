import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modal/modalSlice';
import {
  toggleCurrentChannel, selectEntitiesChannels,
  selectIdCurrentChannel, selectIdsChannels,
} from '../slices/channels/channelsSlice';

function Channels() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(selectEntitiesChannels);
  const ids = useSelector(selectIdsChannels);
  const idCurrentChanndel = useSelector(selectIdCurrentChannel);

  const selectChannel = (id) => (e) => {
    dispatch(toggleCurrentChannel(id));
    e.target.blur();
  };

  const items = ids.map((id) => {
    const { name: channelName, removable } = channels[id];
    const isSelected = id === idCurrentChanndel;
    const channelClass = cn('btn w-100 rounded-0 text-start text-truncate', { 'btn-secondary': isSelected });
    return (
      <li className="nav-item w-100" key={id}>
        { removable
          ? (
            <Dropdown as={ButtonGroup} className="d-flex">
              <button type="button" className={channelClass} onClick={selectChannel(id)}>
                <span className="me-1">#</span>
                {channelName}
              </button>
              <Dropdown.Toggle split variant={isSelected ? 'secondary' : 'btn-secondary'}>
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'Remove', idChannel: id }))}>
                  {t('chatPage.remove')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => dispatch(openModal({ type: 'Rename', idChannel: id }))}>
                  {t('chatPage.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

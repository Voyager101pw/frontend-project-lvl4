import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

import { openModal } from '../slices/modal/modalSlice';
import {
  toggleCurrentChannel, selectEntitiesChannels,
  selectIdCurrentChannel, selectIdsChannels,
} from '../slices/channels/channelsSlice';

function Channels() {
  const dispatch = useDispatch();
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
    const channelClass = cn('btn w-100 rounded-0 d-flex', { 'btn-secondary': isSelected });
    return (
      <li className="nav-item" key={id}>
        { removable
          ? (
            <div role="group" className="d-flex ">
              <Dropdown as={ButtonGroup} className="w-100">
                <Button type="button" variant={channelClass} onClick={selectChannel(id)}>
                  {`# ${channelName}`}
                </Button>
                <Dropdown.Toggle split variant={isSelected ? 'secondary' : 'btn-secondary'} />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(openModal({ type: 'Remove', idChannel: id }))}>
                    Удалить
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(openModal({ type: 'Rename', idChannel: id }))}>
                    Переименовать
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

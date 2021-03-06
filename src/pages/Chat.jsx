import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes.js';

import { addManyChannels, setCurrentChannelId } from '../slices/channels/channelsSlice.js';
import { addManyMessages } from '../slices/messages/messagesSlice.js';

import ShowModal from '../components/Modal.jsx';
import AddChannelBtn from '../components/AddChannelBtn.jsx';
import Channels from '../components/Channels.jsx';
import HeaderChannel from '../components/HeaderChannel.jsx';
import MessagesBoard from '../components/MessagesBoard.jsx';
import MessageInput from '../components/MessageInput.jsx';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('userId'));
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const fetchData = async () => {
      const { data } = await axios.get(routes.usersPath(), headers);
      const { channels, messages, currentChannelId } = data;
      // Если вы используете React 18, вам не нужно использовать batch API.
      // React 18 автоматически группирует все обновления состояния, независимо
      // от того, где они находятся в очереди.
      // batch() - позволяет объединять любые обновления React в такте цикла событий
      // в один проход рендеринга. React уже использует это внутри для собственных
      // обратных вызовов обработчиков событий.
      // https://react-redux.js.org/api/batch
      dispatch(addManyChannels(channels));
      dispatch(addManyMessages(messages));
      dispatch(setCurrentChannelId(currentChannelId));
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="container my-4 h-100 overflow-hidden rounded shadow">
      <div className="row h-100 flex-md-row shadow bg-white">
        <div className="col-4 col-md-2 px-0 border-end pt-5 bg-light">
          <AddChannelBtn />
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <HeaderChannel />
            <MessagesBoard />
            <MessageInput />
          </div>
        </div>
        <ShowModal />
      </div>
    </div>
  );
}

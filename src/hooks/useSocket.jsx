import { useContext } from 'react';
import SocketContext from '../contexts/SocketContext.jsx';

const useSocket = () => useContext(SocketContext);

export default useSocket;

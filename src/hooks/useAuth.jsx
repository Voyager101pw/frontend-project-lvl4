import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

const useAuth = () => useContext(AuthContext);

export default useAuth;

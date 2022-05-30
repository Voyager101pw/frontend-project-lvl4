import axios from 'axios';
import React, { useEffect } from 'react';
import routes from '../routes.js';

export default function Home() {
  useEffect(() => {
    const fetchData = async (userId) => {
      const res = await axios.post(routes.usersPath(), { headers: { Authorization: userId } });
      return res;
    };
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log(fetchData(userId));
  }, []);
  return <h1>Home</h1>;
}

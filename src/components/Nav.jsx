import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AuthContext from '../contexts/index.jsx';

export default function Navi() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="white" className="shadow-sm">
        <Container expand="lg" className="me-auto">
          <Navbar.Brand>
            Hexlet Chat
          </Navbar.Brand>
          { loggedIn && <Button className="my-0">Выйти</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';

export default function Navi() {
  const { loggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" className="shadow-sm">
        <Container expand="lg" className="me-auto">
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          { loggedIn && (
          <Button onClick={() => {
            logOut();
            navigate('/login');
          }}
          >
            Выйти
          </Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

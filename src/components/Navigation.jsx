import React, { useContext } from 'react';
import {
  Navbar, Container, Button, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';
import routes from '../routes.js';

export default function Navi() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { loggedIn, logOut } = useContext(AuthContext);
  const changeLocale = (e) => {
    i18n.changeLanguage(e.target.textContent);
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" className="shadow-sm">
        <Container expand="lg" className="me-auto">
          <Navbar.Brand as={Link} to={routes.mainPage()}>Hexlet Chat</Navbar.Brand>
          <ButtonGroup>
            <div className="d-flex pe-3 align-items-center">
              <Link to="#" onClick={changeLocale}>ru</Link>
              <span className="px-1">/</span>
              <Link to="#" onClick={changeLocale}>en</Link>
            </div>
            { loggedIn && (
            <Button
              className="rounded-1"
              onClick={() => {
                logOut();
                navigate(routes.loginPage());
              }}
            >
              {t('chatPage.exit')}
            </Button>
            )}
          </ButtonGroup>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

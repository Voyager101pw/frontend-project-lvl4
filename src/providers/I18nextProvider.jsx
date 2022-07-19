import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import resources from '../locales/index.js';

function initProvider({ children }) {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}

export default initProvider;

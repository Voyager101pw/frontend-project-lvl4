import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

function RollbarProvider({ children }) {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Provider>
  );
}

export default RollbarProvider;

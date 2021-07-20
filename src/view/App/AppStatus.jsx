import React from 'react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AppStatus = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

export default AppStatus;

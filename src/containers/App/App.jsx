import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Router />
      </Fragment>
  </BrowserRouter>
  );
}

export default App;

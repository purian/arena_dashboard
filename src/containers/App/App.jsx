import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import {
  GoogleReCaptchaProvider,
  withGoogleReCaptcha,
} from "react-google-recaptcha-v3";
function App() {
  return (
    <GoogleReCaptchaProvider
    reCaptchaKey={process.env.REACT_APP_GOOGLE_CAPTCHA_KEY}
  >
    <BrowserRouter>
      <Fragment>
        <Router />
      </Fragment>
  </BrowserRouter>

  </GoogleReCaptchaProvider>
  );
}

export default App;

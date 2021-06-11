import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import {
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
function App() {
  console.log("recaptcha key is", process.env.REACT_APP_GOOGLE_CAPTCHA_KEY)
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

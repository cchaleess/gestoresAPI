import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

 const CLIENT_ID = "128507741231-f29fn3id10e5nhoihhvhehvgrr8t44r4.apps.googleusercontent.com";
// secret: ORX4n7dQkcq8AJeqzybh2aa6

    const responseGoogle = (response) => {
        console.log(response);
    }

    ReactDOM.render(
  <GoogleLogin
    clientId = "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText = "Login"
    onSuccess = { responseGoogle }
    onFailure = { responseGoogle }
    cookiePolicy = { 'single_host_origin'}
            />,
        document.getElementById('googleButton')
);


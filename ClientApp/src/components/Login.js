import React, {useState } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

function Login(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");

    const responseGoogle = (response) => {
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
    };

        return (
                    <div className="App">
                
                <GoogleLogin
                        clientId="128507741231-f29fn3id10e5nhoihhvhehvgrr8t44r4.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <p>Nombre: {name} </p>
                    <p>Correo: {email}</p>
                    <img src={url} alt={name} />
                  </div>
        );
    
}

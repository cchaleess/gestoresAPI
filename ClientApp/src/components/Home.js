import React, { Component } from 'react';
import {GoogleLogin} from 'react-google-login';

export class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            image:''
        }
    }

responseGoogle = (response) => {

    this.setState({
        name: response.profileObj.name,
        email: response.profileObj.email,
        image: response.profileObj.imageUrl
    })   


}  
    render() {      
        
      return (
          <div className="container">
              <div className = "float-right">
                  <GoogleLogin
                      clientId="128507741231-f29fn3id10e5nhoihhvhehvgrr8t44r4.apps.googleusercontent.com"
                      buttonText="Iniciar Sesion"
                      onSuccess={(response) => {
                          this.responseGoogle(response)
                      }}
                     
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={true}
                  />
              </div>
            
              <br /><br /><br />
              <div>
                  <div><h1></h1></div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">Nombre:{this.state.name}</li>       
                      <li class="list-group-item">Correo:{this.state.email}</li> 
                      <li class="list-group-item">Foto: <img src={this.state.image} alt={this.state.image} /></li>
                  </ul>
              </div>    
          </div>
              )
              }
        }

import React from 'react';
import Login from '../../components/login/login.component.jsx'
import Signup from '../../components/signup/signup.component.jsx'

import './login-or-signup.styles.scss'


const LoginOrSignup = () => (
  <div className='login-or-signup'>
    <Login />
    <Signup />
  </div>
);

export default LoginOrSignup;
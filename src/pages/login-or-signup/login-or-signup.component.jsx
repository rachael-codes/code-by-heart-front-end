import React from 'react';
import Login from '../../components/login/login.component.jsx'
// import Signup from '../../components/signup/signup.component.jsx'

import './login-or-signup.styles.scss'


const LoginOrSignup = (props) => (
  <div className='login-or-signup'>
    <Login emailSignInStart={props.emailSignInStart} signInWithGoogle={props.signInWithGoogle} />
    <div>More info about the app will go on this page</div>
    {/* <Signup /> */}
  </div>
);

export default LoginOrSignup;
import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
// import { useNavigate } from "react-router-dom";

import './login.styles.scss'

class SignIn extends React.Component {
  constructor(props) {
    super(props);


  this.state = {
    email: '',
    password: ''
  } 
}

handleSubmit = async event => {
  event.preventDefault();

  const { email, password } = this.state;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    this.setState( { email: '', password: '' }) // reset fields after signing in
  } catch (error) {
    console.log(error)
  }
};

handleChange = event => {
  const { value, name } = event.target;

  this.setState( { [name]: value })
};

  render() {
    return (
      <div className='login'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type="email" 
            handleChange={this.handleChange}
            value={this.state.email} 
            label="Email"
            required 
          />

          <FormInput 
            name="password" 
            type="password" 
            value={this.state.password} 
            handleChange={this.handleChange}
            label="Password" 
            required 
          />
          <div className="buttons">
            <CustomButton type="submit">log in</CustomButton>
            <CustomButton 
              onClick={signInWithGoogle} isGoogleSignIn>
                Google log in 
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
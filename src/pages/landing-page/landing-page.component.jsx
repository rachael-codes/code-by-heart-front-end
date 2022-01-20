import React from 'react';
import './landing-page.styles.scss'


const LandingPage = () => (
  <div className='landing-page'>
    <h3>This is what the user will see when not signed in</h3>
    <span>More info about the app will go here, including a prompt to sign in with their Google account</span>
  </div>
);

export default LandingPage;
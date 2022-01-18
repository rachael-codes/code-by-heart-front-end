import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
// import { useState } from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// import two main pages and header
import Header from "./components/header/header.component";
import LoginOrSignup from "./pages/login-or-signup/login-or-signup.component";
import FlashcardPage from "./pages/flashcard-page/flashcard-page.component";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  // lets our app listen to authentication state changes
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      this.setState({ currentUser: userAuth }); // sets currentUser to null if user logs out
    });
  }

  // will close subscription upon app unmounting
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const SignInWrapper = ({ children, currentUser }) => {
      return currentUser ? <Navigate to="/flashcards" replace /> : children;
    };

    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              <SignInWrapper currentUser={this.state.currentUser}>
                <LoginOrSignup />
              </SignInWrapper>
            }
          />
          <Route
            path="/flashcards"
            element={<FlashcardPage currentUser={this.state.currentUser} />}
          />
        </Routes>
      </div>
    );
  }
}


export const NotFound = () => {
  return <div>This page could not be found.</div>;
};

export default App;

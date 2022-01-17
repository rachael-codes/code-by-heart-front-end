import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// import two main pages and header
import Header from "./components/header/header.component";
import LoginOrSignup from "./pages/login-or-signup/login-or-signup.component";
// import flashcard page here

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
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path="/login" element={<LoginOrSignup />} />
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    );
  }
}

export const FlashcardPage = () => {
  return <div>This is the page where you practice with your flashcards.</div>;
};
export const NotFound = () => {
  return <div>This page could not be found.</div>;
};

export default App;

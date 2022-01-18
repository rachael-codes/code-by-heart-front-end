import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "./firebase/firebase.utils";

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

  unsubscribeFromAuth = null; // class method?

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

  // will close subscription upon app unmounting (clean up function)
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const SignInWrapper = ({ children, currentUser }) => {
      return currentUser ? <Navigate to="/flashcards" replace /> : children;
    };

    // Note to self - ADD THE "PAGE NOT FOUND" ROUTE IN
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              <SignInWrapper currentUser={this.state.currentUser}>
                <LoginOrSignup
                  // emailSignInStart={emailSignInStart}
                  signInWithGoogle={signInWithGoogle}
                />
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

// Note to self: can't figure out how to use hooks instead of classes here! Too confused!
// Question: Should I change this over with the help of a teacher/TA?
// const App = () => {
//   [currentUser, setCurrentUser] = useState(null);
//   // let unsubscribeFromAuth = null;

// Note: this would take the place of componentDidMount
//   useEffect(() => {
//     const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);
//           userRef.onSnapshot((snapShot) => {
//             setCurrentUser({
//               currentUser: {
//                 id: snapShot.id,
//                 ...snapShot.data(),
//               },
//             });
//           });
//         }
//         this.setState({ currentUser: userAuth }); // sets currentUser to null if user logs out
//   }, [currentUser])

// Note: this would take the place of componentWillUnmount
// unEffect(() => {
// const unsubscribeFromAuth = something

// return () => {
//   unsubscribeFromAuth();
// }
// }, [])
// }

export const NotFound = () => {
  return <div>This page could not be found.</div>;
};

export default App;

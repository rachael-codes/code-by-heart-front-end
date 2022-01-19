import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DecksList from '../../components/decks-list/decks-list.component.jsx'
import axios from "axios";

const FlashcardPage = ( {currentUser} ) => {
  const [isSignedIn, setIsSignedIn] = useState(true)

  useEffect(() => {
    function connectToDB () {
      const userData = {
          uid: currentUser.id,
          displayName: currentUser.displayName,
          email: currentUser.email
      }
      axios
      .post("http://127.0.0.1:5000/verify_client", userData)
      .then((response) => {
          console.log(response);
      })
      .catch((error) => {
          console.log("there was an error", error);
      });
    }

    if (!currentUser) {
      setIsSignedIn(false)
    } else {
      connectToDB()
    }
  }, [currentUser]);

  // if currentUser logs out, navigate back home 
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  // load decks Data
  const decksData = {}

  // else, render the page 
  return (
    <>
      <DecksList decksData={decksData} />
    </>
  );
};

export default FlashcardPage;
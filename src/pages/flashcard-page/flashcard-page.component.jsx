import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DecksList from '../../components/decks-list/decks-list.component.jsx'
import axios from "axios";

const FlashcardPage = ( {currentUser} ) => {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [decksData, setDecksData] = useState([])
  const [currentDeck, setCurrentDeck] = useState({
    id: null,
    owner_id: "",
    name: "",
  });

  useEffect(() => {
    function loadDecks () {
      const userData = {
          uid: currentUser.id,
          displayName: currentUser.displayName,
          email: currentUser.email
      }
      axios
      .post("http://127.0.0.1:5000/load_decks", userData)
      .then((response) => {
          setDecksData(response.data);
      })
      .catch((error) => {
          console.log("there was an error", error);
      });
    }

    if (!currentUser) {
      setIsSignedIn(false)
    } else {
      loadDecks()
    }
  }, [currentUser]);

  const updateCurrentDeck = (deck) => {
    setCurrentDeck(deck);
    console.log("Current deck:", currentDeck);
  };

  // if currentUser logs out, navigate back home 
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  // else, render the page 
  return (
    <>
      <section className="decks-list-container">
        <DecksList 
        decksData={decksData}
        updateCurrentDeck={updateCurrentDeck} />
      </section>
    </>
  );
};

export default FlashcardPage;
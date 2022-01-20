import React from 'react';
import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import CodeEditor from '../../components/code-editor/code-editor.component.jsx'
import DecksList from '../../components/decks-list/decks-list.component.jsx'
import NewDeck from '../../components/new-deck/new-deck.component.jsx'
import axios from "axios";
import './flashcard-page.styles.scss'

const FlashcardPage = ( {currentUser} ) => {
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
      console.log('user signed out')
      // setIsSignedIn(false)
    } else {
      loadDecks()
    }
  }, [currentUser]);

  const createNewDeck = (newDeck) => {
      const newDeckData = {
        deck_name: newDeck["name"]
      }
    axios
    .post(`http://127.0.0.1:5000/decks/${currentUser.id}`, newDeckData)
    .then((response) => {
      console.log("response:", response.data);
      const decks = [...decksData];
      decks.push(response.data);
      setDecksData(decks);
    })
    .catch((error) => {
      console.log("error:", error)
    });
  };

  const updateCurrentDeck = (deck) => {
    setCurrentDeck(deck);
    console.log("Current deck:", currentDeck);
  };

  // if currentUser logs out, navigate back home 
  // if (!isSignedIn) {
  //   return <Navigate to="/" replace />
  // }

  return (
    <div className="main-container">

      <section className="decks-list-container">
        <DecksList 
          decksData={decksData}
          updateCurrentDeck={updateCurrentDeck}
        />
        <NewDeck createNewDeck={createNewDeck}></NewDeck>
      </section>

      <section className="ide-area-container">
        <CodeEditor />
      </section>
    </div>
  );
};

export default FlashcardPage;
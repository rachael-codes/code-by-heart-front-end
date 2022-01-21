import React from 'react';
import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import CodeEditor from '../../components/code-editor/code-editor.component.jsx'
import DecksList from '../../components/decks-list/decks-list.component.jsx'
import NewDeck from '../../components/new-deck/new-deck.component.jsx'
import FlashcardsContainer from '../../components/flashcards-container/flashcards-container.component.jsx'

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
    loadDecks()
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

  const deleteDeck = () => {
    axios
      .delete(`http://127.0.0.1:5000/decks/${currentDeck.id}`)
      .then((response) => {
        console.log(response);
        const updatedDecksData = decksData.filter(
          (deck) => deck.id !== currentDeck.id
        );
        setCurrentDeck({
          id: null,
          owner_id: "",
          name: "",
        })
        setDecksData(updatedDecksData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-container">
      <section className="decks-list-container">
        <DecksList 
          decksData={decksData}
          updateCurrentDeck={updateCurrentDeck}
        />
        <NewDeck createNewDeck={createNewDeck} />
      </section>

      <section className="flashcard-area-container">
        {currentDeck.id ? (
          <FlashcardsContainer currentDeck={currentDeck} deleteDeck={deleteDeck} />
        ) : (
          <div>Select a deck</div>
        )}
      </section>

      <section className="ide-area-container">
        <CodeEditor />
      </section>
    </div>
  );
};

export default FlashcardPage;
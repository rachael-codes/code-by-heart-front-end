import PropTypes from "prop-types";
import "./flashcards-container.styles.scss";
import Flashcard from "../flashcard/flashcard.component.jsx";
import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
import axios from "axios";
import { useState, useEffect } from "react";

const FlashcardsContainer = ( { currentDeck }) => {
  const [flashcardsData, setFlashcardsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/decks/${currentDeck.id}/flashcards`
      )
      .then((response) => {
        setFlashcardsData(response.data);
        console.log(flashcardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentDeck]);

  const deleteFlashcard = (deletedCard) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${deletedCard.id}`)
      .then((response) => {
        // console.log(response);
        const updatedCardsData = flashcardsData.filter(
          (card) => card.id !== deletedCard.id
        );
        setFlashcardsData(updatedCardsData);
      })
      .catch((error) => {
        console.log(error);
        // Improve error handling
      });
  };

  const FlashcardList = flashcardsData.map((flashcard) => {
    return (
      <Flashcard
        key={flashcard.id}
        cardData={flashcard}
        deleteFlashcard={deleteFlashcard}
      />
    );
  });

  const createNewFlashcard = (newCardData) => {
    // newCardData shape -> { "front": flashcardFront, "back": flashcardBack }
    axios
      .post(`http://127.0.0.1:5000/decks/${currentDeck.id}/flashcards`, newCardData)
      .then((response) => {
        // console.log("Response:", response);
        const flashcards = [...flashcardsData];
        flashcards.push(response.data);
        setFlashcardsData(flashcards);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };


  return (
    <div className="deck-wrapper">
      <div className="deck-header">
        <h2 className="current-deck-title">{currentDeck.name}</h2>
      </div>
      <div className="new-card-submission-container">
        <NewFlashcard createNewFlashcard={createNewFlashcard} />
      </div>
      {/* <section className="cards-container">{FlashcardList}</section> */}
    </div>
  );
};

FlashcardsContainer.propTypes = {
  currentDeck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }),
};

export default FlashcardsContainer;

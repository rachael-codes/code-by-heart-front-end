import PropTypes from "prop-types";
import "./flashcards-container.styles.scss";
import FlashcardFront from "../flashcard-front/flashcard-front.component.jsx";
import FlashcardBack from "../flashcard-back/flashcard-back.component.jsx";
import NewFlashcard from "../new-flashcard/new-flashcard.component.jsx";
import CustomButton from '../custom-button/custom-button.component';
import axios from "axios";
import { useState, useEffect } from "react";

const FlashcardsContainer = ( { currentDeck, deleteDeck }) => {
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [revealCardAnswer, SetRevealCardAnswer] = useState(false)

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/decks/${currentDeck.id}/flashcards`
      )
      .then((response) => {
        setFlashcardsData(response.data);
        if (response.data.length > 0) {
          setCurrentCard(response.data[0])
        } else {
          setCurrentCard(null)
        }
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("current deck id:", currentDeck.id)
      console.log("current card:", currentCard)
      console.log("flashcards data:", flashcardsData)
  }, [currentDeck]);

  const deleteFlashcard = (deletedCard) => {
    axios
      .delete(`flashcards/${deletedCard.id}`)
      .then((response) => {
        // console.log(response);
        const updatedCardsData = flashcardsData.filter(
          (card) => card.id !== deletedCard.id
        );
        setFlashcardsData(updatedCardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewFlashcard = (newCardData) => {
    // newCardData shape -> { "front": flashcardFront, "back": flashcardBack }
    axios
      .post(`http://127.0.0.1:5000/decks/${currentDeck.id}/flashcards`, newCardData)
      .then((response) => {
        // console.log("Response:", response);
        const flashcards = [...flashcardsData];
        flashcards.push(response.data);
        setFlashcardsData(flashcards);
        setCurrentCard(newCardData)
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };


  return (
    <div className="deck-wrapper">
      <div className="deck-header">
        <h2 className="current-deck-title">{currentDeck.name}</h2>
        <CustomButton onClick={deleteDeck}>Delete Deck</CustomButton>
      </div>
      <div className="new-card-submission-container">
        <NewFlashcard createNewFlashcard={createNewFlashcard} />
      </div>
      <section className="flashcard">
        {currentCard && 
          <FlashcardFront 
            front={currentCard.front}
            deleteFlashcard={deleteFlashcard}>
          </FlashcardFront>
        }
        {currentCard && 
          <FlashcardBack
            back={currentCard.back} revealAnswer={revealCardAnswer}>
          </FlashcardBack>
        }

      </section>
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

import './flashcard-back.styles.scss'
import PropTypes from "prop-types";

const FlashcardBack = ({ back }) => {
  console.log("flashcardBack:", back)

  return (
    <div className="flashcard-back">This is the back of the card: {back}</div>
  );
};

FlashcardBack.propTypes = {
  deleteFlashcard: PropTypes.func,
  front: PropTypes.string
};

export default FlashcardBack;
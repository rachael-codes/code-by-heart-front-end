import PropTypes from "prop-types";
import './flashcard-front.styles.scss'

const FlashcardFront = ({ front, deleteFlashcard }) => {
  console.log("flashcardFront:", front)

  return (
    <div className="flashcard-front">
      <div className="front-text">This is the front text: {front}</div>
      <div className="front-delete-button">
        <button onClick={() => deleteFlashcard}>
          Delete
        </button>
      </div>
    </div>
  );
};

FlashcardFront.propTypes = {
  deleteFlashcard: PropTypes.func,
  front: PropTypes.string
};

export default FlashcardFront;
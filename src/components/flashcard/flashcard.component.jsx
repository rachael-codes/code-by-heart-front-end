// import PropTypes from "prop-types";
import "./flashcard.styles.scss";

const Flashcard = ({ flashcardData, deleteFlashcard }) => {
  const { front, back } = flashcardData;

  return (
    <div>
    <section className="flashcard-front">
      <div className="front-text">{front}</div>
      <div className="front-delete-button">
        <button onClick={() => deleteFlashcard(flashcardData)}>
          Delete
        </button>
      </div>
    </section>
    <section className="flashcard-front">
      <div className="back-text">{back}</div>
    </section>
    </div>
  );
};

// Flashcard.propTypes = {
//   deleteFlashcard: PropTypes.func,
//   flashcardData: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     front: PropTypes.string.isRequired,
//     back: PropTypes.string.isRequired,
//     deck_id: PropTypes.number.isRequired
//   }),
// };

export default Flashcard;
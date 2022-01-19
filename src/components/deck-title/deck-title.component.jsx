import PropTypes from "prop-types";
import React from 'react';
import './deck-title.styles.scss'

const DeckTitle = (props) => {
  const selectCurrentDeck = () => {
    const newCurrentDeck = {
      id: props.deckData.id,
      name: props.deckData.name,
      owner_id: props.deckData.owner_id
    };
    props.updateCurrentDeck(newCurrentDeck);
  };

  return (
    <section className='deck-titles'>
      <button onClick={selectCurrentDeck}>{props.deckData.name}</button>
    </section>
  );
};

DeckTitle.propTypes = {
  updateCurrentDeck: PropTypes.func,
  deckData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }),
};

export default DeckTitle;
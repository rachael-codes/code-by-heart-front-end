import React, { useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import PropTypes from "prop-types";
import './new-deck.styles.scss';


// NOTE - IN ORDER TO MAKE THIS WORK, YOU MUST DEFINE A 
// CREATENEWBOARD FUNC IN THE flashcard PAGE + PASS IT INTO THIS 
// COMPONENT AS A PROP 
// IT SHOULD CALL THE `CREATE NEW DECK` POST ROUTE IN BACKEND!
// SEE: https://github.com/sphillips11/front-end-inspiration-board/blob/main/src/App.js

const NewDeck = ( { createNewDeck } ) => {
  const [formFields, setFormFields] = useState({ name: "" });
  const newDeckIsEnabled = formFields.name.length > 0;

  const onNameChange = (event) => {
    setFormFields({
      ...formFields, // think this isn't necessary since there's only 1 thing in form?
      name: event.target.value,
    });
  };

  const submitNewDeck = (event) => {
    event.preventDefault();
    createNewDeck({
      name: formFields.name
    });
    console.log(formFields)
    // reset form
    setFormFields({
      name: ""
    });
  };

  return (
    <form className="new-deck-style" onSubmit={submitNewDeck}>
      <input
        className="name-box"
        type="text"
        placeholder="type here"
        value={formFields.name}
        onChange={onNameChange}
      />
      <div className="submit-button">
        <input
          className="button"
          type="submit"
          value="Add new deck"
          disabled={!newDeckIsEnabled}
        />
      </div>
    </form>
  );
};

NewDeck.propTypes = {
  createNewDeck: PropTypes.func,
};

export default NewDeck;

import React from 'react';
import { Navigate } from 'react-router-dom';

const FlashcardPage = ( {currentUser} ) => {
  console.log(currentUser)

  if (!currentUser) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <div>This is a flashcard page for {currentUser.displayName}.</div>
      <div>{currentUser.displayName}'s email is {currentUser.email}.</div>
      <div>{currentUser.displayName}'s unique user ID to look up in the database is {currentUser.id}.</div>
    </>
  );
};

export default FlashcardPage;
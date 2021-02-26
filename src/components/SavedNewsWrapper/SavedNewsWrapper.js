import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import SavedNews from "../SavedNews/SavedNews.js";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from 'react'


function SavedNewsWrapper(props) {
   
const currentUser = React.useContext(CurrentUserContext)
  
  return (
      <>
    <SavedNewsHeader
        cards={props.cards}
        onDelete={props.onDelete}
        location={props.location}
        currentUser={currentUser}
        />
    <SavedNews
        cards={props.cards}
        onDelete={props.onDelete}
        location={props.location}
        currentUser={currentUser}
        />   
    </>
  );
}

export default SavedNewsWrapper;
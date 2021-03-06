import "./SearchResults.css";
import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList.js";
import NotFound from "../NotFound/NotFound.js";

function SearchResults(props) {
  const [itemsToShow, setItemsToShow] = React.useState(3);
  const [expanded, setExpanded] = React.useState(false);

  function handleShowMoreClick() {
    setItemsToShow(itemsToShow+3);
    if (itemsToShow === props.cards.length){
    setExpanded(true);
    }
  }

  return props.cards.length === 0 || props.errorMessage !==""? (
    <NotFound errorMessage = {props.errorMessage}/>
  ) : (
    <div className="results">
      <h3 className="results__title">Search Results</h3>
      <NewsCardList
        cards={props.cards.slice(0, itemsToShow)}
        onSaveClick={props.onSaveClick}
        loggedIn={props.loggedIn}
        location={props.location}
        onDelete={props.onDelete}
      />
      <button
        className={`results__show-more${
          expanded === false && props.cards.length > itemsToShow ? "" : "_hidden"
        }`}
        onClick={handleShowMoreClick}
      >
        Show More
      </button>
    </div>
  );
}

export default SearchResults;

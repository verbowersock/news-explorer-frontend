import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.js";
import React from "react";

function NewsCardList(props) {
  return (
    <ul className="newsCardList">
      {props.cards.map((card) => (
        <NewsCard
          onSaveClick={props.onSaveClick}
          key={card.id}
          card={card}
          loggedIn={props.loggedIn}
          location={props.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;
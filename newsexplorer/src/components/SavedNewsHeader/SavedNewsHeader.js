import "./SavedNewsHeader.css";
import React from "react";

function SavedNewsHeader(props) {
  const tags = props.cards.map((c) => c.tag);
  const uniqueTags = tags.filter((v, i, a) => a.indexOf(v) === i);
  const itemsToDisplay = 2;

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Saved Articles</h1>
      <h2 className="saved-news-header__counter">
        Elise, you have {props.cards.length} saved articles
      </h2>
      <h3 className="saved-news-header__keywords">
        By keywords:
        <ul className="saved-news-header__keywords_items">
          {uniqueTags.slice(0, 2).map((item, i, arr) => (
            <li key={i} className="saved-news-header__keywords_item">
              {item}
              {i !== arr.length - 1 ? ", " : " "}
            </li>
          ))}
          {uniqueTags.length > itemsToDisplay && (
            <span className="saved-news-header__keywords_more">
              and {uniqueTags.length - 2} more
            </span>
          )}
        </ul>
      </h3>
    </div>
  );
}

export default SavedNewsHeader;

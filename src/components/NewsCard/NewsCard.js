import "./NewsCard.css";
import React from "react";
import { Markup } from 'interweave';

function NewsCard(props) {
  const [toolTipVisibility, setToolTipVisibility] = React.useState(false);
  function handleSaveClick() {
    props.onSaveClick(props.card);
  }

  function showToolTip() {
    if (!props.loggedIn) {
      setToolTipVisibility(true);
    } else {
      setToolTipVisibility(false);
    }
  }

  function hideToolTip() {
    setToolTipVisibility(false);
  }

  function handleDelete() {
    props.onDelete(props.card);
  }

  return (
    <div className="newsCard">
      <div
        className="newsCard__image"
        style={{ backgroundImage: `url(${props.card.image})` }}
      ></div>
      {props.location.pathname === "/" ? (
        <button
          className={`newsCard__icon newsCard__icon_save${
            props.card.saved === false ? "" : "_active"
          }`}
          onMouseEnter={showToolTip}
          onMouseLeave={hideToolTip}
          onClick={handleSaveClick}
        ></button>
      ) : (
        <button
          className="newsCard__icon newsCard__icon_delete"
          onClick={handleDelete}
        ></button>
      )}
      <div
        className={`newsCard__callout newsCard__callout_right ${
          toolTipVisibility ? "" : "newsCard__callout_hidden"
        }`}
      >
        Sign in to save articles
      </div>
      <div
        className={`newsCard__callout newsCard__callout_tag ${
          props.location.pathname === "/saved-news"
            ? ""
            : "newsCard__callout_hidden"
        }`}
      >
        {props.card.keyword}
      </div>
      <div className="newsCard__content">
        <div className="newsCard__date">{props.card.date}</div>
        <div className="newsCard__title">{props.card.title}</div>

        <div className="newsCard__text"><Markup content={props.card.text}/></div>
        <div className="newsCard__source">{props.card.source}</div>
      </div>
    </div>
  );
}

export default NewsCard;

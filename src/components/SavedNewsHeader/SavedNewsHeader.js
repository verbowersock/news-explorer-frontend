import "./SavedNewsHeader.css";
import React from "react";

function SavedNewsHeader(props) {
  console.log(props.cards);
  const tags = props.cards.map((c) => c.keyword);
  const uniqueTags = tags.filter((v, i, a) => a.indexOf(v) === i);
  const itemsToDisplay = uniqueTags.length <= 3 ? 3 : 2;
  const sortedTags = findTopKeywords();

  function countInArray(array, value) {
    return array.reduce((n, x) => n + (x === value), 0);
  }

  function findTopKeywords() {
    const tagMap = new Map();
    console.log(tags);
    tags.forEach((element) => {
      const frequency = countInArray(tags, element);
      tagMap.set(element, frequency);
    });
    console.log(tagMap);
    const sorted = new Map([...tagMap.entries()].sort((a, b) => b[1] - a[1]));
    console.log(sorted);
    return Array.from(sorted.keys());
  }
  console.log(sortedTags);

  return (
    <div className="saved-news-header">
      <h1 className="saved-news-header__title">Saved Articles</h1>
      <h2 className="saved-news-header__counter">
        {props.currentUser.name}, you have {props.cards.length} saved articles
      </h2>
      <h3 className="saved-news-header__keywords">
        By keywords:
        <ul className="saved-news-header__keywords_items">
          {sortedTags.slice(0, itemsToDisplay).map((item, i, arr) => (
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

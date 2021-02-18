import NewsCardList from "../NewsCardList/NewsCardList.js";
import "./SavedNews.css";

function SavedNews(props) {
  return (
    <section className="saved-news">
      <NewsCardList
        cards={props.cards}
        onDelete={props.onDelete}
        location={props.location}
      />
    </section>
  );
}

export default SavedNews;
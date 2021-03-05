import "./NotFound.css";
import notFound from "../../images/not-found_v1.svg";

function NotFound(props) {
  return (
    <div className="notFound">
      <img className="notFound__image" src={notFound} alt="not found" />
      <h2 className="notFound__title">Nothing found</h2>
      <p className="notFound__text">{props.errorMessage!==""? props.errorMessage:
        "Sorry, but nothing matched your search terms"}
      </p>
    </div>
  );
}

export default NotFound;

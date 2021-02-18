import "./Preloader.css";
import loader from "../../images/Ellipse.png";

function Preloader(props) {
  return (
    <div className="preloader">
      <img className="preloader__image" src={loader} alt="loader" />
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;

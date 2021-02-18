import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import "./Confirmation.css";
import "../Signin/Signin.js";

function Confirmation(props) {
  return (
    <PopupWithForm
      name="confirmation"
      title="Registration successfully completed!"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div
        className="popup__link popup__link_confirmation"
        onClick={props.onLinkClick}
      >
        Sign In
      </div>
    </PopupWithForm>
  );
}

export default Confirmation;

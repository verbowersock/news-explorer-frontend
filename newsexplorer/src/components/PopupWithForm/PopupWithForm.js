import "./PopupWithForm.css";
import { useRef } from "react";
function PopupWithForm(props) {
  const node = useRef(null);

  const isOpen = props.isOpen ? "" : "popup_hidden";

  function handleOverlayClick(event) {
    if (node.current.contains(event.target)) {
      return;
    }
    props.onClose();
  }
  return (
    <div className={`popup ${isOpen}`} onClick={handleOverlayClick}>
      <div className={`popup__content popup__content_${props.name}`} ref={node}>
        <form
          className={`popup__form popup__form_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <button
            name="close_button"
            className="popup__close"
            type="reset"
            aria-label="Close"
            onClick={props.onClose}
          ></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

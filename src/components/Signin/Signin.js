import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import "./Signin.css";
import { ReactComponent as Loader } from "../../images/spinner.svg";

function Signin(props) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    React.useState(true);

  const handleEmailChange = (e) => {
    props.setUserEmail(e.target.value);
    props.validate(e);
  };

  const handlePasswordChange = (e) => {
    props.setUserPassword(e.target.value);
  };

  React.useEffect(() => {
    setIsSubmitButtonDisabled(
      props.userEmail === "" ||
        props.userPassword === "" ||
        props.errors.email !== "" ||
        props.errors.password !== ""
    );
  }, [props]);

  return (
    <PopupWithForm
      name="signin"
      title="Sign in"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    >
      <p className="popup__field_label">Email</p>
      <input
        type="text"
        placeholder="Email"
        className="popup__field"
        name="email"
        value={props.userEmail}
        required
        minLength={2}
        maxLength={40}
        onChange={handleEmailChange}
      />
      <p className="popup__input-error">{props.errors.email}</p>
      <p className="popup__field_label">Password</p>
      <input
        type="password"
        placeholder="Password"
        className="popup__field"
        name="password"
        value={props.userPassword}
        required
        minLength={2}
        maxLength={200}
        onChange={handlePasswordChange}
      />
      <p className="popup__input-error popup__input-error_centered">
        {props.errors.result}
      </p>
      <button
        className="popup__save popup__save_signin"
        aria-label="Sign in"
        disabled={isSubmitButtonDisabled}
        onClick={props.onSubmit}
      >
        {!props.loading ? "Sign in" : <Loader className="spinner" />}
      </button>
      <div className="popup__link">
        or{" "}
        <span className="popup__link_text" onClick={props.onLinkClick}>
          Sign Up
        </span>
      </div>
    </PopupWithForm>
  );
}

export default Signin;

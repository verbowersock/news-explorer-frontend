import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import "./Signup.css";
import "../Signin/Signin.css";

function Signup(props) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = React.useState(
    true
  );

  const handleEmailChange = (e) => {
    props.setUserEmail(e.target.value);
    props.validate(e);
  };

  const handlePasswordChange = (e) => {
    props.setUserPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    props.setUserName(e.target.value);
    props.validate(e);
  };

  React.useEffect(() => {
    setIsSubmitButtonDisabled(
      props.userEmail === "" ||
        props.userPassword === "" ||
        props.userName === "" ||
        props.errors.email !== "" ||
        props.errors.password !== "" ||
        props.errors.userName !== ""
    );
  }, [props]);

  return (
    <PopupWithForm
      name="signup"
      title="Sign up"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.handleLoginSubmit}
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
      <p className="popup__input-error"></p>
      <p className="popup__field_label">Username</p>
      <input
        type="text"
        placeholder="Username"
        className="popup__field"
        name="userName"
        value={props.userName}
        required
        minLength={2}
        maxLength={200}
        onChange={handleUsernameChange}
      />
      <p className="popup__input-error popup__input-error_centered">
        {props.errors.userName}
      </p>
      <button
        className="popup__save popup__save_signup"
        aria-label="Sign up"
        defaultValue="Sign up"
        disabled={isSubmitButtonDisabled}
        onClick={props.onSubmit}
      >
        Sign up
      </button>
      <div className="popup__link">
        or{" "}
        <span className="popup__link_text" onClick={props.onLinkClick}>
          Sign In
        </span>
      </div>
    </PopupWithForm>
  );
}

export default Signup;

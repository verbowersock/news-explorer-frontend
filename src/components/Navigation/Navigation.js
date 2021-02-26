import "./Navigation.css";
import { NavLink } from "react-router-dom";
import Logout from "../../images/logout.svg";
import LogoutWhite from "../../images/logout_white.svg";
import React from "react";

function Navigation(props) {

  function handleSignout(event) {
    props.onSignOut(event);
  }

  const mobile = props.mobile ? "mobile" : "";

  return (
    <div className={`navigation_${mobile} navigation `}>
      <NavLink
        className={`navigation__button navigation__button_home  ${
          props.location.pathname === "/saved-news"
            ? "navigation__button_black"
            : ""
        }`}
        onClick={props.onAnyClick}
        activeClassName="navigation__button_active"
        exact
        to="/"
      >
        Home
      </NavLink>

      {props.loggedIn && (
        <NavLink
          className={`navigation__button navigation__button_saved navigation__button_${mobile} ${
            props.location.pathname === "/saved-news"
              ? "navigation__button_black"
              : ""
          }`}
          activeClassName="navigation__button_active navigation__button_active_black"
          onClick={props.onAnyClick}
          exact
          to="/saved-news"
        >
          Saved Articles
        </NavLink>
      )}
      {!props.loggedIn ? (
        <button
          className="navigation__button navigation__button_login"
          onClick={props.onSigninClick}
          disabled={props.buttonDisabled}
        >
          Sign In
        </button>
      ) : (
        <button
          className={`navigation__button navigation__button_signout ${
            props.location.pathname === "/saved-news"
              ? "navigation__button_black"
              : ""
          } navigation__button_signout_${
            props.location.pathname === "/saved-news" ? "black" : "white"
          }`}
          onClick={handleSignout}
        >
         <span className="navigation__button_username"> {props.userName}</span>
          <img
            src={
              props.location.pathname === "/" || props.mobile
                ? LogoutWhite
                : Logout
            }
            className="navigation__signout"
            alt="signout"
          />
        </button>
      )}
    </div>
  );
}

export default Navigation;

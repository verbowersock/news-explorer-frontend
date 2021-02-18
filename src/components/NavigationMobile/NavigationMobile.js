import "./NavigationMobile.css";
import "../Header/Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import React from "react";

function NavigationMobile(props) {
  console.log(props);
  function handleClose() {
    props.onClose();
  }
  return (
    <div
      className={`mobile-menu mobile-menu_${
        props.mobileMenuOpen ? "" : "hidden"
      }`}
    >
      <div className="mobile-menu__content">
        <Link
          className={`header header__logo header__logo_mobile header__logo`}
          onClick={props.onAnyClick}
          to="/"
        >
          NewsExplorer
        </Link>
        <button className="mobile-menu__close" onClick={handleClose}></button>
        <Navigation
          open={props.mobileMenuOpen}
          onSigninClick={props.onSigninClick}
          buttonDisabled={props.buttonDisabled}
          location={props.location}
          loggedIn={props.loggedIn}
          onSignOut={props.onSignOut}
          onAnyClick={props.onAnyClick}
          mobile={props.mobile}
          color={props.color}
        />
      </div>
    </div>
  );
}

export default NavigationMobile;

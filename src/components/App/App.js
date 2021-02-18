/* eslint-disable default-case */

import "./App.css";
import React from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Main from "../Main/Main.js";
import Header from "../Header/Header.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import Signin from "../Signin/Signin.js";
import Signup from "../Signup/Signup.js";
import Confirmation from "../Confirmation/Confirmation.js";
import Image1 from "../../images/image_06-1.jpg";
import Image2 from "../../images/image_01-1.jpg";
import Image3 from "../../images/image_05.jpg";
import Image4 from "../../images/image_06.jpg";
import Image5 from "../../images/image_01.jpg";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import SavedNews from "../SavedNews/SavedNews.js";
import { useLocation } from "react-router-dom";

function App() {
  const cardPlaceholders = [
    {
      id: 1,
      image: Image1,
      date: "November 4, 2020",
      title: "Everyone Needs a Special 'Sit Spot' in Nature",
      text:
        'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
      source: "treehugger",
      tag: "Nature",
      //tag: "test",
      saved: true,
    },
    {
      id: 2,
      image: Image2,
      date: "February 19, 2019",
      title: "Nature makes you better",
      text:
        "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
      source: "national geographic",
      tag: "Nature",
      //tag: "test",
      saved: false,
    },
    {
      id: 3,
      image: Image3,
      date: "November 4, 2020",
      title: "Grand Teton Renews Historic Crest Trail",
      text:
        "“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...",
      source: "National parks traveler",
      tag: "Parks",
      //tag: "test",
      saved: true,
    },
    {
      id: 4,
      image: Image4,
      date: "October 19, 2020",
      title: "Nostalgic Photos of Tourists in U.S. National Parks",
      text:
        "Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...",
      source: "national geographic",

      tag: "Yellowstone",
      //tag: "test",
      saved: true,
    },
    {
      id: 5,
      image: Image5,
      date: "March 16, 2020",
      title: "Scientists Don't Know Why Polaris Is So Weird",
      text:
        "Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.",
      source: "treehugger",
      tag: "Photography",
      //tag: "test",
      saved: true,
    },
  ];

  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [error, setError] = React.useState({
    email: "",
    password: "",
    userName: "",
  });
  const [signinButtonDisabled, setSigninButtonDisabled] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(
    false
  );
  const [showResults, setShowResults] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [cards, setCards] = React.useState(cardPlaceholders);
  const [foundCards, setFoundCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 621;
  const [mobile, setMobile] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    width < breakpoint ? setMobile(true) : setMobile(false);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  let location = useLocation();
  const history = useHistory({ forceRefresh: true });

  function clearFieldsErrors() {
    setUserEmail("");
    setUserPassword("");
    setUserName("");
    setError({ email: "", password: "", userName: "" });
  }

  function handleSigninButtonClick() {
    setMobileMenuOpen(false);
    setIsSigninPopupOpen(true);
  }

  function handleSignupLinkClick() {
    clearFieldsErrors();
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(true);
    setSigninButtonDisabled(true);
  }

  function closeAllPopups() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    clearFieldsErrors();
    setSigninButtonDisabled(false);
    setIsConfirmationPopupOpen(false);
  }

  function handleSigninLinkClick() {
    clearFieldsErrors();
    setIsSigninPopupOpen(true);
    setIsSignupPopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  function handleSignupButtonClick(event) {
    event.preventDefault();
    setIsConfirmationPopupOpen(true);
    setIsSignupPopupOpen(false);
    clearFieldsErrors();
  }

  function validateFields(e) {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        setError((prevState) => ({
          ...prevState,
          [name]: value === "Elise" ? "This username is not available" : "",
        }));
        break;
      case "email":
        const validEmailRegex = RegExp(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        );
        setError((prevState) => ({
          ...prevState,
          [name]: validEmailRegex.test(value) ? "" : "Invalid email address",
        }));
        break;
    }
  }

  function handleSearchClick(searchTerm) {
    setShowResults(false);
    setShowPreloader(true);
    setFoundCards(
      cards.filter((el) => el.tag.toLowerCase() === searchTerm.toLowerCase())
    );
    setTimeout(() => {
      setShowResults(true);
      setShowPreloader(false);
    }, 2000);
  }

  function handleSaveClick(card) {
    const newCards = cards.map((el) =>
      el.id === card.id ? { ...el, saved: !card.saved } : el
    );
    setCards(newCards);
    setFoundCards(
      foundCards.map((el) =>
        el.id === card.id ? { ...el, saved: !card.saved } : el
      )
    );
    setSavedCards(cards.filter((el) => el.saved));
    console.log(savedCards);
  }

  function findSavedCards() {
    const newCards = cards.filter((el) => el.saved);
    console.log(newCards);
    setSavedCards(newCards);
  }

  function deleteCard(card) {
    const newCards = savedCards.filter((c) => c.id !== card.id);
    setSavedCards(newCards);
    setFoundCards(
      foundCards.map((el) =>
        el.id === card.id ? { ...el, saved: !card.saved } : el
      )
    );
  }

  function handleSignin(event) {
    event.preventDefault();
    setLoggedIn(true);
    setIsSigninPopupOpen(false);
    clearFieldsErrors();
    findSavedCards();
  }

  function handleSignOut(event) {
    event.preventDefault();
    setLoggedIn(false);
    console.log(loggedIn);
    history.push("/");
    setShowResults(false);
  }

  React.useEffect(() => {
    findSavedCards();
  }, [cards]);

  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        clearFieldsErrors();
        closeAllPopups();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function handleHamburgerClick() {
    setMobileMenuOpen(true);
  }

  function handleClose() {
    setMobileMenuOpen(false);
  }

  function handleCloseMenu() {
    console.log("reached");
    setMobileMenuOpen(false);
  }

  return (
    <>
      <Header
        onSigninClick={handleSigninButtonClick}
        buttonDisabled={signinButtonDisabled}
        location={location}
        loggedIn={loggedIn}
        onSignOut={handleSignOut}
        mobile={mobile}
        mobileMenuOpen={mobileMenuOpen}
        onClose={handleClose}
        onHamburgerClick={handleHamburgerClick}
        onAnyClick={handleCloseMenu}
      />
      <Switch>
        <Route exact path="/">
          <Main
            onSearchClick={handleSearchClick}
            showResults={showResults}
            showPreloader={showPreloader}
            onSaveClick={handleSaveClick}
            cards={foundCards}
            loggedIn={loggedIn}
            location={location}
          />
          <About />
          <Signin
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
            isOpen={isSigninPopupOpen}
            onClose={closeAllPopups}
            onLinkClick={handleSignupLinkClick}
            validate={validateFields}
            errors={error}
            onSubmit={handleSignin}
          />
          <Signup
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
            userName={userName}
            setUserName={setUserName}
            isOpen={isSignupPopupOpen}
            onClose={closeAllPopups}
            validate={validateFields}
            onLinkClick={handleSigninLinkClick}
            errors={error}
            onSubmit={handleSignupButtonClick}
          />
          <Confirmation
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onLinkClick={handleSigninLinkClick}
          />
        </Route>
        <Route exact path="/saved-news">
          <SavedNewsHeader cards={savedCards} />
          <SavedNews
            cards={savedCards}
            onDelete={deleteCard}
            location={location}
          />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;

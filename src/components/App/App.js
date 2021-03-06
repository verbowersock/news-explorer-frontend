/* eslint-disable default-case */

import "./App.css";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main.js";
import Header from "../Header/Header.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import Signin from "../Signin/Signin.js";
import Signup from "../Signup/Signup.js";
import Confirmation from "../Confirmation/Confirmation.js";
import { useLocation } from "react-router-dom";
import { newsApi } from "../../utils/NewsApi.js";
import { mainApi } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsWrapper from "../SavedNewsWrapper/SavedNewsWrapper";

function App() {
  const [isSigninPopupOpen, setIsSigninPopupOpen] = React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [error, setError] = React.useState({
    email: "",
    password: "",
    result: "",
  });
  const [signinButtonDisabled, setSigninButtonDisabled] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(
    false
  );
  const [showResults, setShowResults] = React.useState(false);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 621;
  const [mobile, setMobile] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const localCards = JSON.parse(localStorage.getItem("cards"));
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    width < breakpoint ? setMobile(true) : setMobile(false);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  React.useEffect(() => {
    if (localCards !== null && loggedIn) {
      setCards(localCards);
      setShowResults(true);
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((result) => {
          setCurrentUser(result);
          findSavedCards(token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  let location = useLocation();
  const history = useHistory({ forceRefresh: true });

  function clearFieldsErrors() {
    setUserEmail("");
    setUserPassword("");
    setUserName("");
    setError({ email: "", password: "", result: "" });
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

  function handleSignup(event) {
    event.preventDefault();
    mainApi
      .register(userEmail, userPassword, userName)
      .then((res) => {
        if (res.ok) {
          setError((prevState) => ({
            ...prevState,
            result: res.message,
          }));
          console.log(res.message);
          throw new Error(res.message);
        }
      })
      .then(() => {
        setIsConfirmationPopupOpen(true);
        setIsSignupPopupOpen(false);
        clearFieldsErrors();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignin(event) {
    event.preventDefault();
    mainApi
      .signIn(userEmail, userPassword)
      .then((res) => {
        console.log(res);
        if (!res.token) {
          setError((prevState) => ({
            ...prevState,
            result: res.message,
          }));
          throw new Error(res.message);
        }
      })
      .then(() => {
        setLoggedIn(true);
        setIsSigninPopupOpen(false);
        clearFieldsErrors();
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  }

  function validateFields() {
    const validEmailRegex = RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i
    );
    setError((prevState) => ({
      ...prevState,
      email: validEmailRegex.test(userEmail) ? "" : "Invalid email address",
    }));
  }

  function convertDate(date) {
    const newDate = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return newDate.toLocaleDateString("en-US", options);
  }

  function getDates() {
    const date = new Date();
    let from = new Date();
    const to = date.toISOString().slice(0, 10);
    const fromDate = date.getDate() - 7;
    from.setDate(fromDate);
    from = from.toISOString().slice(0, 10);
    return { to, from };
  }

  function handleSearchClick(searchTerm) {
    const date = getDates();
    setShowResults(false);
    setShowPreloader(true);
    if (searchTerm === "") {
      setShowResults(true);
      setShowPreloader(false);
      setErrorMessage("Please enter a search term");
      return;
    } else {
      newsApi
        .getNews(searchTerm, date.to, date.from)
        .then((data) => {
          if (data.status === "ok") {
            const cards = data.articles.map((info, index) => {
              const card_info = {
                source: info.source.name,
                link: info.url,
                title: info.title,
                date: convertDate(info.publishedAt),
                text: info.description,
                saved: false,
                keyword: searchTerm,
                image: info.urlToImage,
                _id: index,
              };
              return card_info;
            });
            setCards(cards);
            setShowResults(true);
            compareArticles(cards, savedCards);
            setShowPreloader(false);
            setErrorMessage("")
            localStorage.setItem("cards", JSON.stringify(cards));
          } else {
            throw Error(data.statusText);
          }
        })
        .catch((error) => {
          console.log(error);
          setShowPreloader(false);
          setShowResults(true);
          setErrorMessage(
            "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
          );
        });
      closeAllPopups();
    }
  }

  function handleSaveClick(card) {
    if (!loggedIn) {
      return;
    } else if (card.saved) {
      handleDeleteCard(card);
    } else {
      mainApi
        .saveArticle(card, token)
        .then((res) => {
          const newCards = cards.map((el) =>
            el._id === card._id
              ? { ...el, saved: !card.saved, _id: res._id }
              : el
          );
          setCards(newCards);
          findSavedCards(token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function findSavedCards(token) {
    mainApi
      .getSavedArticles(token)
      .then((res) => {
        setSavedCards(res);
      })
      .catch((error) => console.log(error));
  }

  function compareArticles(cards, savedCards) {
    for (let i = 0; i < cards.length; i++) {
      const srcObj = cards[i];
      const tarObj = savedCards.find(
        (obj) =>
          obj.title === srcObj.title &&
          obj.link === srcObj.link &&
          obj.image === srcObj.image &&
          obj.text === srcObj.text
      );
      if (tarObj) {
        cards[i].saved = tarObj.true;
        cards[i]._id = tarObj._id;
      }
    }

    setCards(cards);
  }

  function handleDeleteCard(card) {
    mainApi
      .deleteArcticle(card._id, token)
      .then(() => {
        const newSavedCards = savedCards.filter((c) => c._id !== card._id);
        setSavedCards(newSavedCards);
        const newCards = cards.map((el) =>
          el._id === card._id ? { ...el, saved: false } : el
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut(event) {
    event.preventDefault();
    setLoggedIn(false);
    setSavedCards("");
    history.push("/");
    setShowResults(false);
    localStorage.removeItem("token");
    localStorage.removeItem("cards");
  }

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

  React.useEffect(() => {
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserName(res.name);
        })
        .then(() => history.push("/"))
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, [history]);

  function handleHamburgerClick() {
    setMobileMenuOpen(true);
  }

  function handleClose() {
    setMobileMenuOpen(false);
  }

  function handleCloseMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
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
              cards={cards}
              loggedIn={loggedIn}
              location={location}
              errorMessage={errorMessage}
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
              onSubmit={handleSignup}
            />
            <Confirmation
              isOpen={isConfirmationPopupOpen}
              onClose={closeAllPopups}
              onLinkClick={handleSigninLinkClick}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNewsWrapper}
            cards={savedCards}
            onDelete={handleDeleteCard}
            location={location}
          />
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

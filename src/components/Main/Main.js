import "./Main.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import Preloader from "../Preloader/Preloader";



function Main(props) {



  return (
    <main className="main">
      <div className="main__background">
        <h1 className="main__heading">What's going on in the world?</h1>
        <h2 className="main__subheading">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <SearchForm onSearchClick={props.onSearchClick} />
      </div>
      {props.showPreloader && <Preloader />}
      {props.showResults && (
        <SearchResults
          cards={props.cards}
          onSaveClick={props.onSaveClick}
          loggedIn={props.loggedIn}
          location={props.location}
          errorMessage={props.errorMessage}
        />
      )}
    </main>
  );
}

export default Main;
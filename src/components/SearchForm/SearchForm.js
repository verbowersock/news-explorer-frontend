import "./SearchForm.css";
import React from "react";

function SearchForm(props) {
  const [buttonColor, setButtonColor] = React.useState("#2F71E5");
  const [searchTerm, setSearchTerm] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setButtonColor("#2A65CC");
    props.onSearchClick(searchTerm);
  }

  function handleMouseEnter() {
    setButtonColor("#347EFF");
  }

  function handleMouseLeave() {
    setButtonColor("#2F71E5");
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <form className="search-form">
      <input
        className="search-form__input"
        placeholder="Enter topic"
        onChange={handleSearchChange}
      />
      <button
        type="input"
        className="search-form__submit"
        style={{ backgroundColor: buttonColor }}
        onClick={handleSubmit}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;

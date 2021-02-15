import "./Footer.css";
import FB from "../../images/FB.svg";
import Git from "../../images/Git.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        © 2020 Supersite, Powered by News API
      </div>
      <div className="footer__links-container">
        <Link
          className="footer__link footer__link_text footer__link_text_home"
          to="/"
        >
          Home
        </Link>
        <a
          className="footer__link footer__link_text footer__link_text_practicum"
          href="https://practicum.yandex.com/"
          rel="noreferrer"
          target="_blank"
        >
          Practicum by Yandex
        </a>
        <a
          className="footer__link footer__link_icon footer__link_icon_git"
          aria-label="git"
          href="https://github.com/vermelon"
          rel="noreferrer"
          target="_blank"
          style={{ backgroundImage: `url(${Git})` }}
        >
          {" "}
        </a>
        <a
          className="footer__link footer__link_icon footer__link_icon_facebook"
          aria-label="facebook"
          href="https://www.facebook.com/"
          rel="noreferrer"
          target="_blank"
          style={{ backgroundImage: `url(${FB})` }}
        >
          {" "}
        </a>
      </div>
    </footer>
  );
}

export default Footer;

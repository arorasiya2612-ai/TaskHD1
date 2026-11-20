
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer site-footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            DEV<span>@</span>Deakin
          </Link>
          <p>
            A space for sharing ideas, building practical skills
            and growing together as developers.
          </p>
          <span className="footer-mini">
            LEARN · BUILD · CONNECT
          </span>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/browse">Community posts</Link>
          <a href="/#work">Projects</a>
          <a href="/#articles">Articles</a>
        </div>

        {/* Discover */}
        <div className="footer-column">
          <h3>Discover</h3>
          <a href="/#tutorials">Tutorials</a>
          <Link to="/opportunities">Careers</Link>
          <Link to="/pricing">Membership</Link>
          <a href="/#gallery">Gallery</a>
        </div>

        {/* Contact and Social Media */}
        <div className="footer-column">
          <h3>Get in touch</h3>

    

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF /> Facebook
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram /> Instagram
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn /> LinkedIn
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter /> Twitter
          </a>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 DEV@Deakin. Built for curious minds.</p>
        <p>Made with care for the developer community.</p>
      </div>
    </footer>
  );
}

export default Footer;

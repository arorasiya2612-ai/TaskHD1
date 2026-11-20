import { Link } from "react-router-dom";
import bannerImage from "./assets/images/banner.jpg";

function Banner() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <div className="home-hero-kicker"><span className="home-hero-dot" /> DEVELOPER PORTFOLIO & COMMUNITY</div>
          <h1 id="home-hero-title">Turning ideas into <span>meaningful technology.</span></h1>
          <p>Hi, I'm Siya Arora. I enjoy building practical projects, learning new technologies, and connecting with people who love to create.</p>
          <div className="home-hero-actions">
            <a href="#work" className="home-btn home-btn-primary">Explore my work <span aria-hidden="true">↗</span></a>
            <Link to="/browse" className="home-btn home-btn-secondary">Browse community posts <span aria-hidden="true">→</span></Link>
          </div>
          <div className="home-hero-note"><span className="home-hero-note-line" /> SOFTWARE ENGINEERING · DEV@DEAKIN</div>
        </div>
        <div className="home-hero-image">
          <img src={bannerImage} alt="Deakin University campus building" />
          <div className="home-hero-image-caption">Learning, building and growing at Deakin</div>
        </div>
      </div>
    </section>
  );
}
export default Banner;

import profileImage from "./assets/images/siya.jpg";
function About() {
 return (
  <section id="about" className="about-section">
   <div className="home-shell about-layout">
    <div className="about-portrait"><img src={profileImage} alt="Siya Arora portrait" /></div>
    <div className="about-content">
     <span className="home-eyebrow">ABOUT ME</span>
     <h2>Curious by nature.<br/><span>Driven to build.</span></h2>
     <p className="about-lead">I’m a Software Engineering student passionate about using technology to solve real-world problems.</p>
     <p>From exploring new development tools to turning ideas into working projects, I enjoy every part of the learning process. DEV@Deakin is a place to share that journey and learn with the community.</p>
     <a className="home-text-link" href="#work">See what I’ve built <span aria-hidden="true">↗</span></a>
    </div>
   </div>
  </section>
 );
}
export default About;

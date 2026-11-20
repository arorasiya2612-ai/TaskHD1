import tutorials from "./Tutorials.js";
function Tutorials(){return <section id="tutorials" className="tutorials-section"><div className="home-shell">
 <div className="home-section-heading"><div><span className="home-eyebrow">04 / START LEARNING</span><h2>Build your foundation.</h2><p className="home-section-description">Approachable tutorials for the technologies behind modern web applications.</p></div></div>
 <div className="tutorial-grid">{tutorials.map(tutorial=><article className="tutorial-card" key={tutorial.id}>
  <div className="home-media"><img src={tutorial.image} alt={tutorial.title} loading="lazy" /></div>
  <div className="card-content"><span className="home-card-type">TUTORIAL</span><h3>{tutorial.title}</h3><p>{tutorial.description}</p><div className="home-card-meta"><span>By {tutorial.username}</span><span className="home-rating">★ {tutorial.rating}</span></div></div>
 </article>)}</div></div></section>}
export default Tutorials;

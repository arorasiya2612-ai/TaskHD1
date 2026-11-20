import projects from "./Work.js";
function Work() {
 return <section id="work" className="work-section">
  <div className="home-shell">
   <div className="home-section-heading"><div><span className="home-eyebrow">01 / SELECTED PROJECTS</span><h2>Work worth sharing.</h2><p className="home-section-description">Hands-on projects that reflect how I learn, experiment and solve problems.</p></div></div>
   <div className="project-grid">{projects.map(project=><article className="project-card" key={project.id}>
    <div className="project-image"><img src={project.image} alt={project.title} /></div>
    <div className="card-content"><h3>{project.title}</h3><p>{project.description}</p>
     <div className="tags">{project.tags.map((tag,i)=><span key={i}>{tag}</span>)}</div>
     <a href={project.link}>View project <span aria-hidden="true">↗</span></a>
    </div>
   </article>)}</div>
  </div>
 </section>;
}
export default Work;

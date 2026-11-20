import articles from "./Articles.js";
function Articles(){return <section id="articles" className="articles-section"><div className="home-shell">
 <div className="home-section-heading"><div><span className="home-eyebrow">03 / KNOWLEDGE & IDEAS</span><h2>Featured articles.</h2><p className="home-section-description">Practical insights and foundational concepts from the developer community.</p></div></div>
 <div className="article-grid">{articles.map(article=><article className="article-card" key={article.id}>
  <div className="home-media"><img src={article.image} alt={article.title} loading="lazy" /></div>
  <div className="card-content"><span className="home-card-type">ARTICLE</span><h3>{article.title}</h3><p>{article.description}</p><div className="home-card-meta"><span>By {article.author}</span><span className="home-rating">★ {article.rating}</span></div></div>
 </article>)}</div></div></section>}
export default Articles;

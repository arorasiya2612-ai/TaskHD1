import firstImage from "./assets/images/first.jpg";
import secondImage from "./assets/images/second.jpg";
import thirdImage from "./assets/images/third.jpg";
import fourthImage from "./assets/images/fourth.jpg";
const photos = [
 {image:firstImage,alt:"University group event",label:"University community"},
 {image:secondImage,alt:"Presenting technology at an outdoor event",label:"Learning in action"},
 {image:thirdImage,alt:"Visit to an engineering campus",label:"Exploring new places"},
 {image:fourthImage,alt:"Academic recognition event",label:"Celebrating milestones"}
];
function Gallery(){return <section id="gallery" className="gallery-section"><div className="home-shell">
 <div className="home-section-heading"><div><span className="home-eyebrow">02 / BEYOND THE SCREEN</span><h2>Moments along the way.</h2><p className="home-section-description">People, places and experiences that make the journey memorable.</p></div></div>
 <div className="gallery">{photos.map(photo=><figure className="gallery-tile" key={photo.alt}><img src={photo.image} alt={photo.alt} loading="lazy"/><figcaption>{photo.label}</figcaption></figure>)}</div>
 </div></section>}
export default Gallery;

function Contact() {
  return (
    <section id="contact" className="contact-section">

      <div className="section-container">

        <span className="home-eyebrow">GET IN TOUCH</span>
        <h2>Have an idea? Let’s talk.</h2>

        <p className="section-subtitle">
          Questions, collaborations or just a hello? I’d love to hear from you.
        </p>

        <div className="contact-links">

          <a
            href="mailto:arorasiya2612@gmail.com"
            className="contact-button"
          >
            📧 Email Me
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            💻 GitHub →
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            🔗 LinkedIn →
          </a>

        </div>

      </div>

    </section>
  )
}

export default Contact
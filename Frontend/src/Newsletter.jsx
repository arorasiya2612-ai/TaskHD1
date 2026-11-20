import { useState } from 'react'

function Newsletter() {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {

    event.preventDefault()

    if (!email.trim()) {
  setMessage('Please enter your email.')
  return
}
try{
    const response = await fetch('/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    email: email.trim()
  }).toString()
})

const result = await response.text()

if (response.ok) {
  setMessage(result)
  setEmail('')
} else {
  setMessage('Subscription failed. Please try again.')
}
  }
  catch (error) {
  console.error('Subscription error:', error)
  setMessage('Unable to connect to the server. Please try again.')
}
  }
  return (
    <section
      id="subscribe"
      className="newsletter-section"
    >

      <div className="section-container">

        <span className="home-eyebrow">THE COMMUNITY NEWSLETTER</span>
        <h2>A little inspiration, delivered.</h2>

        <p className="section-subtitle">
          Get thoughtful updates, developer resources, and community highlights in your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="newsletter-form"
        >

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

        <p className="newsletter-message">
          {message}
        </p>

      </div>

    </section>
  )
}

export default Newsletter
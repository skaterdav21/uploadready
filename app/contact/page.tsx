export default function ContactPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <h1>Contact</h1>
          <p>
            This is a placeholder contact form UI for UploadReady. You can wire it to
            email, Formspree, Resend, or your preferred backend later.
          </p>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-row">
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic">
              <option>General question</option>
              <option>Bug report</option>
              <option>Feature request</option>
              <option>Partnership / ads</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Tell us what you need help with"
            />
          </div>

          <div className="hero-actions">
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Need quick help?</h2>
          <p>
            Most users come to UploadReady for file conversion, resizing, compression,
            and simple PDF cleanup. More self-serve help pages can be added later.
          </p>
        </div>
      </section>
    </main>
  );
}

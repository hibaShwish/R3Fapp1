import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState(null); // for success/error messages

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      await emailjs.send(
        'service_itbsx4l',
        'template_32p9eay',
        {
          from_name: form.name,
          to_name: 'Hiba',
          from_email: form.email,
          to_email: 'hebahshawiesh@gmail.com',
          message: form.message,
        },
        'WKWz7VcMKm2Uchf2d'
      );
      setLoading(false);
      setFeedback({ type: 'success', message: 'Your message has been sent!' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setLoading(false);
      console.error(error);
      setFeedback({ type: 'error', message: 'Your message has not been sent. Please try again.' });
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="/assets/terminal.png"
          alt="terminal-bg"
          className="absolute inset-0 min-h-screen"
          loading="lazy"
        />

        <div className="contact-container relative z-10">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to
            life, I’m here to help.
          </p>

          {feedback && (
            <p
              className={`mt-5 text-center ${
                feedback.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {feedback.message}
            </p>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

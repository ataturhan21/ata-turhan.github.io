import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const Contact = () => {
    return (
        <section id="contact" className="section section--contact" aria-labelledby="contact-title">
            <div className="container">
                <div className="contact-card">
                    <div className="section-header">
                        <h2 id="contact-title" className="section-title">Get in touch</h2>
                        <p className="section-lead">For AI engineering collaborations, product partnerships, or Solarity AI inquiries, email me or connect on LinkedIn.</p>
                    </div>
                    <div className="contact-actions">
                        <a className="button button--primary" href="mailto:ataturhan21@gmail.com">
                            <FiMail aria-hidden="true" focusable="false" /> ataturhan21@gmail.com
                        </a>
                        <a className="button button--secondary" href="https://www.linkedin.com/in/ataturhan21/" target="_blank" rel="noreferrer" aria-label="Ata Turhan on LinkedIn">
                            <FaLinkedin aria-hidden="true" focusable="false" /> LinkedIn
                        </a>
                    </div>
                    <ul className="social-links">
                        <li><a href="https://github.com/ataturhan21" target="_blank" rel="noreferrer" aria-label="Ata Turhan on GitHub"><FaGithub aria-hidden="true" focusable="false" /></a></li>
                        <li><a href="https://medium.com/@ataturhan21" target="_blank" rel="noreferrer" aria-label="Ata Turhan on Medium"><FaMedium aria-hidden="true" focusable="false" /></a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Contact;

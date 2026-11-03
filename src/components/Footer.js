import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer-contact-info">
                <h2 className="footer-heading">Connect With Me</h2>
                <p className="footer-contact-access">
                <a href="mailto:ataturhan21@gmail.com">Email: ataturhan21@gmail.com</a>
                </p>
            </div>
            <div>
                <h2>Social Links</h2>
                <div className="social-icons">
                    <a href="https://github.com/ataturhan21" target="_blank" rel="noreferrer" aria-label="Ata Turhan on GitHub"><i><FaGithub /></i></a>
                    <a href="https://www.linkedin.com/in/ataturhan21/" target="_blank" rel="noreferrer" aria-label="Ata Turhan on LinkedIn"><i><FaLinkedin /></i></a>
                    <a href="https://medium.com/@ataturhan21" aria-label="Ata Turhan on Medium"><i><FaMedium /></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

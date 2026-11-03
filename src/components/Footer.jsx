import { FiArrowUp } from 'react-icons/fi';
import ExternalLink from './ExternalLink';
import { useClientValue } from '../useClientValue';

const Footer = () => {
    // The pre-rendered page carries the build year; the visitor's clock takes over after
    // hydration, which keeps the year current between deploys.
    const year = useClientValue(() => new Date().getFullYear(), __BUILD_YEAR__);
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <p>© {year} Ata Turhan</p>
                <ul className="footer-links">
                    <li><ExternalLink href="https://ataturhan.com/">ataturhan.com</ExternalLink></li>
                    <li><ExternalLink href="https://solarityai.com/">Solarity AI</ExternalLink></li>
                    <li><a href="#app">Back to top <FiArrowUp aria-hidden="true" focusable="false" /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;

import { useSyncExternalStore } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import ExternalLink from './ExternalLink';

// The pre-rendered page carries the build year, which hydration reuses so the two renders match;
// after that the visitor's clock decides, which keeps the year current between deploys.
const noSubscription = () => () => {};
const useYear = () => useSyncExternalStore(noSubscription, () => new Date().getFullYear(), () => __BUILD_YEAR__);

const Footer = () => {
    const year = useYear();
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

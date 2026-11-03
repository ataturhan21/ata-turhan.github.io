import { FaGithub, FaLinkedin } from "react-icons/fa";
import Avatar from '../assets/pfp.webp';
import ExternalLink from './ExternalLink';

const Body = () => {
    return (
        <section id="home" className="hero" aria-labelledby="hero-title">
            <div className="container hero__inner">
                <div className="hero__copy">
                    <p className="eyebrow">AI Engineer &amp; Manager at HP · Founder &amp; CEO of Solarity AI</p>
                    <h1 id="hero-title" className="hero__title">Ata Turhan</h1>
                    <p className="hero__lead">I build local AI systems, integrate language models and agents, and lead product development from engineering through delivery.</p>
                    <div className="hero__actions">
                        <a className="button button--primary" href="#projects">View projects</a>
                        <a className="button button--secondary" href="#contact">Get in touch</a>
                    </div>
                    <ul className="social-links">
                        <li><ExternalLink href="https://github.com/ataturhan21" label="Ata Turhan on GitHub"><FaGithub aria-hidden="true" focusable="false" /></ExternalLink></li>
                        <li><ExternalLink href="https://www.linkedin.com/in/ataturhan21/" label="Ata Turhan on LinkedIn"><FaLinkedin aria-hidden="true" focusable="false" /></ExternalLink></li>
                    </ul>
                </div>
                <div className="hero__portrait">
                    <img alt="Ata Turhan" src={Avatar} width="600" height="600" fetchpriority="high" />
                </div>
            </div>
        </section>
    )
}

export default Body;

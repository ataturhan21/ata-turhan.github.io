import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiAward, FiMonitor, FiSun } from "react-icons/fi";
import Avatar from '../assets/pfp.webp';
import AvatarMedium from '../assets/pfp-480.webp';
import AvatarSmall from '../assets/pfp-360.webp';
import ExternalLink from './ExternalLink';

const Body = () => {
    return (
        <section id="home" className="hero" aria-labelledby="hero-title">
            <div className="container hero__inner">
                <div className="hero__copy">
                    <p className="eyebrow">AI engineering &amp; product development</p>
                    <h1 id="hero-title" className="hero__title">Ata <em>Turhan</em></h1>
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
                    <img alt="Ata Turhan" src={Avatar} srcSet={`${AvatarSmall} 360w, ${AvatarMedium} 480w, ${Avatar} 720w`} sizes="(max-width: 52rem) 11rem, 24rem" width="720" height="836" />
                </div>
            </div>
            <div className="container">
                <ul className="hero-facts" aria-label="Highlights">
                    <li><FiMonitor aria-hidden="true" focusable="false" /> AI Engineer &amp; Manager at HP</li>
                    <li><FiSun aria-hidden="true" focusable="false" /> Founder &amp; CEO of Solarity AI</li>
                    <li><FiAward aria-hidden="true" focusable="false" /> 2× Valedictorian · 4.0 GPA</li>
                </ul>
            </div>
        </section>
    )
}

export default Body;

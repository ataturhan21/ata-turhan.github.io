import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { FiCheck, FiCopy, FiMail } from 'react-icons/fi';
import ExternalLink from './ExternalLink';

const email = 'ataturhan21@gmail.com';

const Contact = () => {
    // idle, copied or failed. "Copied" reverts after 2 s; a failed copy keeps the address on screen.
    const [copyState, setCopyState] = useState('idle');

    useEffect(() => {
        if (copyState !== 'copied') return undefined;
        const timer = setTimeout(() => setCopyState('idle'), 2000);
        return () => clearTimeout(timer);
    }, [copyState]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopyState('copied');
        } catch {
            setCopyState('failed');
        }
    };

    return (
        <section id="contact" className="section section--contact" aria-labelledby="contact-title">
            <div className="container">
                <div className="contact-card">
                    <div className="section-header">
                        <h2 id="contact-title" className="section-title">Get in touch</h2>
                        <p className="section-lead">For AI engineering collaborations, product partnerships, or Solarity AI inquiries, email me or connect on LinkedIn.</p>
                    </div>
                    <div className="contact-actions">
                        <a className="button button--primary" href={`mailto:${email}`}>
                            <FiMail aria-hidden="true" focusable="false" /> {email}
                        </a>
                        <button type="button" className="button button--secondary" onClick={copyEmail}>
                            {copyState === 'copied'
                                ? <><FiCheck aria-hidden="true" focusable="false" /> Copied</>
                                : <><FiCopy aria-hidden="true" focusable="false" /> Copy <span className="visually-hidden">email address</span></>}
                        </button>
                        <ExternalLink className="button button--secondary" href="https://www.linkedin.com/in/ataturhan21/" label="Ata Turhan on LinkedIn">
                            <FaLinkedin aria-hidden="true" focusable="false" /> LinkedIn
                        </ExternalLink>
                    </div>
                    <p className={copyState === 'failed' ? 'contact-status' : 'visually-hidden'} role="status">
                        {copyState === 'copied' && 'Email address copied.'}
                        {copyState === 'failed' && <>Couldn't copy automatically. Select the address: <span className="contact-status__address">{email}</span></>}
                    </p>
                    <ul className="social-links">
                        <li><ExternalLink href="https://github.com/ataturhan21" label="Ata Turhan on GitHub"><FaGithub aria-hidden="true" focusable="false" /></ExternalLink></li>
                        <li><ExternalLink href="https://medium.com/@ataturhan21" label="Ata Turhan on Medium"><FaMedium aria-hidden="true" focusable="false" /></ExternalLink></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Contact;

import { useEffect, useState } from 'react';

const sections = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

// The current section is the last one whose top has passed 40% of the screen height. At the
// bottom of the page it is the last section, which can be too short to reach that line.
const useCurrentSection = () => {
    const [current, setCurrent] = useState('');

    useEffect(() => {
        const targets = sections.map(({ href }) => [href, document.querySelector(href)]).filter(([, el]) => el);
        let frame = 0;
        const update = () => {
            frame = 0;
            const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
            const line = window.innerHeight * 0.4;
            let next = '';
            for (const [href, el] of targets) {
                if (atBottom || el.getBoundingClientRect().top <= line) next = href;
            }
            setCurrent(next);
        };
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            window.cancelAnimationFrame(frame);
        };
    }, []);

    return current;
};

const Header = () => {
    const current = useCurrentSection();
    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <a className="wordmark" href="#app">
                    <span className="wordmark__mark" aria-hidden="true">AT</span>
                    <span className="wordmark__name">Ata Turhan</span>
                </a>
                <nav aria-label="Primary">
                    <ul className="nav-list">
                        {sections.map(({ label, href }) => (
                            <li key={href}><a href={href} aria-current={current === href ? 'true' : undefined}>{label}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;

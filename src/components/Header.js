const sections = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const Header = () => {
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
                            <li key={href}><a href={href}>{label}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;

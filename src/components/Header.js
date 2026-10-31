const Header = () => {
    return (
        <header className="header">
                <div className="header-logo">
                    <a href="#app"><h3 className="header-name">ATA TURHAN</h3></a>
                </div>
                <nav className="header-container" aria-label="Primary">
                    <div className="nav-item"><a href="#about">About</a></div>
                    <div className="nav-item"><a href="#projects">Projects</a></div>
                    <div className="nav-item"><a href="#skills">Skills</a></div>
                </nav>
        </header>
    )
}

export default Header;

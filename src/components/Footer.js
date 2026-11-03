const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <p>© {new Date().getFullYear()} Ata Turhan</p>
                <ul className="footer-links">
                    <li><a href="https://ataturhan.com/">ataturhan.com</a></li>
                    <li><a href="https://solarityai.com/">Solarity AI</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;

const About = () => {
    return (
        <section id="about" className="section" aria-labelledby="about-title">
            <div className="container">
                <div className="section-header">
                    <h2 id="about-title" className="section-title">About</h2>
                </div>
                <div className="about-grid">
                    <p className="about-bio">I am Ata Turhan, an AI Engineer and Manager at HP and the Founder and CEO of Solarity AI, based in Dallas, Texas. I build local AI systems, integrate language models and agents, and lead product development from engineering through delivery.</p>
                    <dl className="facts">
                        <div className="fact">
                            <dt>Now</dt>
                            <dd>AI Engineer &amp; Manager at HP</dd>
                            <dd>Founder &amp; CEO of <a className="text-link" href="https://solarityai.com/" target="_blank" rel="noreferrer">Solarity AI</a></dd>
                        </div>
                        <div className="fact">
                            <dt>Based in</dt>
                            <dd>Dallas, Texas</dd>
                        </div>
                        <div className="fact">
                            <dt>Education</dt>
                            <dd>M.S. Computer Science, Maharishi International University</dd>
                            <dd>B.Sc. Artificial Intelligence Engineering, TOBB ETÜ</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    )
}

export default About;

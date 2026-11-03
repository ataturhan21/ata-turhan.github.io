import IMG from '../assets/detective.webp';

const About = () => {
    return (
        <div id="about" className="about">
            <h2 className="about-heading">About Me</h2>
            <div className="about-info">
                <p className="about-desc">I am Ata Turhan, an AI Engineer and Manager at HP and the Founder and CEO of Solarity AI, based in Dallas, Texas. I build local AI systems, integrate language models and agents, and lead product development from engineering through delivery.</p>
                <div className="about-img">
                    <div className="about-img-wrapper">
                        <img src={IMG} alt="" width="480" height="470" loading="lazy" decoding="async" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;

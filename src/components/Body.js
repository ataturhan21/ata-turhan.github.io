import { FaGithub, FaLinkedin } from "react-icons/fa";
import Avatar from '../assets/pfp.png';

const Body = () => {
    return (
        <div id="body" className="body">
            <div className="body-container">
                <div className="body-profile">
                    <img className="body-img" alt="Ata Turhan" src={Avatar} />

                    <div className="body-content">
                        <h1 className="body-headline">Ata Turhan</h1>
                        <div className="body-text">AI Engineer &amp; Manager · Founder &amp; CEO</div>
                    </div>

                    <div className="body-icons">
                        <a href="https://github.com/ataturhan21" target="_blank" rel="noreferrer" className="icon-link" aria-label="Ata Turhan on GitHub"><i><FaGithub /></i> </a>
                        <a href="https://www.linkedin.com/in/ataturhan21/" target="_blank" rel="noreferrer" className="icon-link" aria-label="Ata Turhan on LinkedIn"><i><FaLinkedin /></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body;

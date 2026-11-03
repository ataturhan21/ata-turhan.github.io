import { FaDocker, FaGitAlt, FaLinux, FaPython, FaReact } from "react-icons/fa";
import { SiFastapi, SiGithubactions, SiPostgresql, SiPytorch, SiScikitlearn, SiTensorflow, SiTypescript } from "react-icons/si";

// The same stack as the GitHub profile's Technical focus.
const skills = [
    { name: "Python", icon: FaPython },
    { name: "PyTorch", icon: SiPytorch },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "scikit-learn", icon: SiScikitlearn },
    { name: "FastAPI", icon: SiFastapi },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: FaReact },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Docker", icon: FaDocker },
    { name: "Linux", icon: FaLinux },
    { name: "Git", icon: FaGitAlt },
    { name: "GitHub Actions", icon: SiGithubactions },
];

const Skills = () => {
    return (
        <div id='skills' className='skills'>
            <h2 className='title' id='skills-heading'>Skills</h2>
            <ul className='skill-holder' aria-labelledby='skills-heading'>
                {
                    skills.map(({ name, icon: Icon }) => (
                        <li key={name} className='skill-cards'>
                            <Icon className='skill-icon' aria-hidden="true" focusable="false" />
                            <p className="skill">{name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Skills;

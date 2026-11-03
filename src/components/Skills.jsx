import { FaDocker, FaGitAlt, FaLinux, FaPython, FaReact } from "react-icons/fa";
import { SiFastapi, SiGithubactions, SiPostgresql, SiPytorch, SiScikitlearn, SiTensorflow, SiTypescript } from "react-icons/si";
import { useClientValue } from '../useClientValue';

// The same groups and stack as the GitHub profile's Technical focus.
const groups = [
    {
        title: "AI & ML",
        skills: [
            { name: "Python", icon: FaPython },
            { name: "PyTorch", icon: SiPytorch },
            { name: "TensorFlow", icon: SiTensorflow },
            { name: "scikit-learn", icon: SiScikitlearn },
        ],
    },
    {
        title: "Applications & data",
        skills: [
            { name: "FastAPI", icon: SiFastapi },
            { name: "TypeScript", icon: SiTypescript },
            { name: "React", icon: FaReact },
            { name: "PostgreSQL", icon: SiPostgresql },
        ],
    },
    {
        title: "Delivery",
        skills: [
            { name: "Docker", icon: FaDocker },
            { name: "Linux", icon: FaLinux },
            { name: "Git", icon: FaGitAlt },
            { name: "GitHub Actions", icon: SiGithubactions },
        ],
    },
];

const Skills = () => {
    // The logos are about 24 KB of SVG, most of the pre-rendered page, so the HTML carries an empty
    // 1em box for each and the logo fills it after hydration; nothing moves when it does.
    const showLogos = useClientValue(() => true, false);
    return (
        <section id="skills" className="section" aria-labelledby="skills-title">
            <div className="container">
                <div className="section-header">
                    <h2 id="skills-title" className="section-title">Skills</h2>
                </div>
                <div className="skill-groups">
                    {groups.map(({ title, skills }) => {
                        const id = `skills-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
                        return (
                            <div key={title} className="skill-group">
                                <h3 id={id} className="skill-group__title">{title}</h3>
                                <ul className="chip-list" aria-labelledby={id}>
                                    {skills.map(({ name, icon: Icon }) => (
                                        <li key={name} className="chip">
                                            {showLogos
                                                ? <Icon aria-hidden="true" focusable="false" />
                                                : <svg aria-hidden="true" focusable="false" height="1em" width="1em" />}
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Skills;

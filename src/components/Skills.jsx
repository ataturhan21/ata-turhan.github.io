import { useEffect, useRef, useState } from 'react';

// The same six groups and skills as the GitHub profile's Technical focus. Six groups fill two full
// rows of the three-column grid.
const groups = [
    { title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Bash"] },
    { title: "Machine learning", skills: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "OpenCV", "MLflow"] },
    { title: "LLMs & agents", skills: ["Hugging Face", "LangChain", "LangGraph", "ChromaDB", "OpenAI API"] },
    { title: "Data & analysis", skills: ["pandas", "NumPy", "SciPy", "Matplotlib", "Plotly", "Jupyter"] },
    {
        title: "Applications & databases",
        skills: ["FastAPI", "Flask", "Spring Boot", "React", "Node.js", "PostgreSQL", "MySQL", "MongoDB", "Apache Kafka"],
    },
    {
        title: "Cloud & delivery",
        skills: ["Docker", "Linux", "Git", "GitHub Actions", "Microsoft Azure", "Jenkins", "Prometheus", "Grafana"],
    },
];

// The 40 logos are more SVG than the rest of the page, so they load as their own file when the section
// comes within a screen of the viewport, never competing with the first screen's files. The
// pre-rendered HTML and the main script carry an empty 1em box for each, and the logo fills it when
// the file arrives, so nothing moves. Without that file the names still show.
const useLogos = (section) => {
    const [logos, setLogos] = useState(null);
    useEffect(() => {
        let mounted = true;
        const load = () => import('./skillLogos').then((module) => mounted && setLogos(module.logos), () => {});
        if (!('IntersectionObserver' in window)) {
            load();
            return () => { mounted = false; };
        }
        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            load();
        }, { rootMargin: '100% 0px' });
        observer.observe(section.current);
        return () => {
            mounted = false;
            observer.disconnect();
        };
    }, [section]);
    return logos;
};

const Skills = () => {
    const section = useRef(null);
    const logos = useLogos(section);
    return (
        <section ref={section} id="skills" className="section" aria-labelledby="skills-title">
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
                                    {skills.map((name) => {
                                        const Logo = logos?.[name];
                                        return (
                                            <li key={name} className="chip">
                                                {Logo
                                                    ? <Logo aria-hidden="true" focusable="false" />
                                                    : <svg aria-hidden="true" focusable="false" height="1em" width="1em" />}
                                                {name}
                                            </li>
                                        );
                                    })}
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

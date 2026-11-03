import { FiArrowUpRight } from "react-icons/fi";
import data from '../data/projects.json';

const Projects = () => {
    return (
        <section id="projects" className="section" aria-labelledby="projects-title">
            <div className="container">
                <div className="section-header">
                    <h2 id="projects-title" className="section-title">Projects</h2>
                    <p className="section-lead">Selected engineering work. Each repository's README covers its setup, scope and current limitations.</p>
                </div>
                <ul className="project-grid">
                    {data.map((project) => (
                        <li key={project.link}>
                            <article className="project-card">
                                <h3 className="project-card__title">{project.name}</h3>
                                <p className="project-card__desc">{project.description}</p>
                                <ul className="tag-list" aria-label={`${project.name} topics`}>
                                    {project.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
                                </ul>
                                <a className="text-link project-card__link" href={project.link} target="_blank" rel="noreferrer">
                                    View on GitHub<span className="visually-hidden"> for {project.name}</span>
                                    <FiArrowUpRight aria-hidden="true" focusable="false" />
                                </a>
                            </article>
                        </li>
                    ))}
                </ul>
                <p className="projects-more">
                    <a className="text-link" href="https://github.com/ataturhan21?tab=repositories" target="_blank" rel="noreferrer">
                        All repositories on GitHub <FiArrowUpRight aria-hidden="true" focusable="false" />
                    </a>
                </p>
            </div>
        </section>
    )
}

export default Projects;

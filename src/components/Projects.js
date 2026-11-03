import { useCallback, useRef } from 'react';
import Project from '../assets/project-card.webp';
import data from '../data/projects.json';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Projects = () => {
    const container = useRef(null);

    // react-slick hides off-screen slides from screen readers but leaves their links tabbable.
    const syncHiddenSlides = useCallback(() => {
        container.current?.querySelectorAll('.slick-slide').forEach((slide) => {
            const hidden = slide.getAttribute('aria-hidden') === 'true';
            slide.querySelectorAll('a').forEach((link) => {
                if (hidden) link.setAttribute('tabindex', '-1');
                else link.removeAttribute('tabindex');
            });
        });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        initialSlide: 0,
        slidesToShow: 3,
        slidesToScroll: 3,
        onInit: syncHiddenSlides,
        onReInit: syncHiddenSlides,
        afterChange: syncHiddenSlides,
        customPaging: (index) => (
            <button type="button" aria-label={`Projects page ${index + 1}`}>{index + 1}</button>
        ),
        responsive: [
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            initialSlide: 0,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        <div id='projects' className='projects'>
            <div className="heading">
                <h2>Projects</h2>
            </div>
                <div className="projects-container" ref={container}>
                    <Slider {...settings}>
                    {
                        data.map((project, key) => {
                            return (
                                <div key={key} className="project">
                                    <div className="content">
                                        <img src={Project} alt="" width="320" height="205" loading="lazy" decoding="async" />
                                        <h2 className="name">{project.name}</h2>
                                        {
                                            project.description.length > 130
                                            ? <p className='description-min'>{project.description}</p>
                                            :  <p className='description'>{project.description}</p>
                                        }
                                        <div>
                                            <a
                                            className="project-button"
                                            target="_blank"
                                            href={project.link}
                                            aria-label={`${project.name} on GitHub`}
                                            rel="noreferrer"
                                            >GitHub
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </Slider>
                </div>
        </div>
    )
}

export default Projects;
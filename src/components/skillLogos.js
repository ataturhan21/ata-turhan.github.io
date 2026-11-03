import { FaChartLine, FaDatabase, FaDocker, FaGitAlt, FaJava, FaLayerGroup, FaLinux, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
    SiApachekafka, SiFastapi, SiFlask, SiGithubactions, SiGnubash, SiGrafana, SiHuggingface, SiJavascript, SiJenkins,
    SiJupyter, SiKeras, SiLangchain, SiLanggraph, SiMlflow, SiMongodb, SiMysql, SiNumpy, SiOpencv, SiPandas, SiPlotly,
    SiPostgresql, SiPrometheus, SiPytorch, SiScikitlearn, SiScipy, SiSpringboot, SiTensorflow, SiTypescript,
} from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";

// Each skill's logo, by the name Skills.jsx shows. Skills without a logo of their own get a generic
// one: SQL a database, ChromaDB stacked layers, Matplotlib a line chart.
export const logos = {
    Python: FaPython,
    TypeScript: SiTypescript,
    JavaScript: SiJavascript,
    Java: FaJava,
    SQL: FaDatabase,
    Bash: SiGnubash,
    PyTorch: SiPytorch,
    TensorFlow: SiTensorflow,
    Keras: SiKeras,
    "scikit-learn": SiScikitlearn,
    OpenCV: SiOpencv,
    MLflow: SiMlflow,
    "Hugging Face": SiHuggingface,
    LangChain: SiLangchain,
    LangGraph: SiLanggraph,
    ChromaDB: FaLayerGroup,
    "OpenAI API": TbBrandOpenai,
    pandas: SiPandas,
    NumPy: SiNumpy,
    SciPy: SiScipy,
    Matplotlib: FaChartLine,
    Plotly: SiPlotly,
    Jupyter: SiJupyter,
    FastAPI: SiFastapi,
    Flask: SiFlask,
    "Spring Boot": SiSpringboot,
    React: FaReact,
    "Node.js": FaNodeJs,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    "Apache Kafka": SiApachekafka,
    Docker: FaDocker,
    Linux: FaLinux,
    Git: FaGitAlt,
    "GitHub Actions": SiGithubactions,
    "Microsoft Azure": VscAzure,
    Jenkins: SiJenkins,
    Prometheus: SiPrometheus,
    Grafana: SiGrafana,
};

import { parse, v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Project.module.css';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../services/ServicesForm';
import Message from '../layout/Message';


function Project() {
    const { id } = useParams();

    const [project, setProject] = useState({});
    const [showProjectFrom, setShowProjectForm] = useState(false);
    const [showServiceFrom, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((resp) => resp.json()).then((data) => {
                setProject(data)
            }).catch(err => console.log(err))
        }, 300)
    }, [id])

    function createService(project) {
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType('error');
            //project.services.pop();
            return false
        }
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectFrom)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceFrom)
    }

    function editPost(project) {
        setMessage('');

        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json()).then((data) => {
            console.log(project);
            setProject(data);
            setShowProjectForm(false);
            setMessage('Projeto atualizado!');
            setType('success');
        }).catch(err => console.log(err))
    }

    return (
        <>
            {
                project.name ? (
                    <div className={styles.projectDetails}>
                        <Container customClass="column">
                            {message && <Message type={type} msg={message} />}
                            <div className={styles.detailsContainer}>
                                <p>{<p>{project.name}</p>}</p>
                                <h1>Projeto: {project.name}</h1>
                                <button onClick={toggleProjectForm} className={styles.btn}>
                                    {!showProjectFrom ? 'Editar Projeto' : 'Fechar'}
                                </button>
                                {!showProjectFrom ? (
                                    <div className={styles.projectInfo}>
                                        <p>
                                            <span>Categoria:</span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento:</span> R${project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> R${project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={styles.projectInfo}>
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir Edição"
                                            projectData={project}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={styles.serviceFormContainer}>
                                <h2>Adicone um serviço</h2>
                                <button onClick={toggleServiceForm} className={styles.btn}>
                                    {!showServiceFrom ? 'Adicionar Serviço' : 'Fechar'}
                                </button>
                                <div className={styles.projectInfo}>
                                    {showServiceFrom && (
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText="dicionar Serviço"
                                            projectData={project}
                                        />
                                    )}
                                </div>
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
                                <p>Lista de Serviços</p>
                            </Container>
                        </Container>
                    </div>
                ) : (
                    <Loading />
                )
            }
        </>
    )
}

export default Project;
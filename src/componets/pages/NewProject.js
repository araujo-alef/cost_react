import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    const history = useHistory();

    function createPost(project) {
        //initialize cost and service
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                history.push('/projects', { message: 'Projeto criado com sucesso' })
            })
            .catch((err) => console.log(err))
    }

    /* async function loadingMoeda() {
        const response = await api.get('categories');
        setCategories(response.data);
    } */

    return (
        <div className={styles.newProjectContainer}>
            <h1>NewProject</h1>
            <p>Crie seu projeto para depois adiiconar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject;
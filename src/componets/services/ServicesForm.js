import { useState } from 'react';

import styles from '../project/ProjectForm.module.css';

import Input from '../form/Input';
import SubmitButtom from '../form/SubmitButton';

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setServive] = useState({})


    function submit(e) {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(e) {
        setServive({ ...service, [e.target.name]: e.target.value });
    }

    return (
        <form action={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do Serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Descreva o Serviço"
                handleOnChange={handleChange}
            />
            <SubmitButtom text={btnText} />
        </form>
    )
}

export default ServiceForm;
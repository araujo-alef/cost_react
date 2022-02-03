import styles from './Select.module.css'

function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option value="">Selecione uma Opção</option>
                {
                    options.map((category) => {
                        return <option value={category.id} key={category.id}>{category.name}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Select;
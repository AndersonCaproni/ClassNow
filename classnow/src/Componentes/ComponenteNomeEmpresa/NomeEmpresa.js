import styles from './_nomeEmpresa.module.css';


function NomeEmpresa() {
    return (
        <div className={styles.palavras}>
            <div className={styles.primeiraPalavra}>Class</div>
            <div className={styles.segundaPalavra}>Now</div>
        </div>
    )
}

export default NomeEmpresa;
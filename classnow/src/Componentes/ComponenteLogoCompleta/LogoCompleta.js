import LogoMaior from '../ComponenteLogoMaior/LogoMaior';
import NomeEmpresa from '../ComponenteNomeEmpresa/NomeEmpresa';
import styles from './_logoCompleta.module.css'

function LogoCompleto() {
    return (
        <div className={styles.corpo}>
            <div className={styles.imagem}>
                <LogoMaior />
            </div>
            <div className={styles.nome}>
                <NomeEmpresa />
            </div>
        </div>
    )
}

export default LogoCompleto;
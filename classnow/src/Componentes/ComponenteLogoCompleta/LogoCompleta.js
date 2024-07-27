import LogoSimples from '../ComponenteLogoSimples/LogoSimples';
import NomeEmpresa from '../ComponenteNomeEmpresa/NomeEmpresa';
import styles from './_logoCompleta.module.css'

function LogoCompleto() {
    return (
        <div className={styles.corpo}>
            <div className={styles.imagem}>
                <LogoSimples />
            </div>
            <div className={styles.nome}>
                <NomeEmpresa />
            </div>
        </div>
    )
}

export default LogoCompleto;
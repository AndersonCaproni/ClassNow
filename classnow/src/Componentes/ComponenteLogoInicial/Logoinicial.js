import LogoSimples from '../ComponenteLogoSimples/LogoSimples';
import NomeEmpresa from '../ComponenteNomeEmpresa/NomeEmpresa';
import styles from './_logoInicial.module.css'

function LogoInicial() {
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

export default LogoInicial;
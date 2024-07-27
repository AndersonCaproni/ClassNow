import LogoSimples from '../ComponenteLogoSimples/LogoSimples';
import styles from './_logoPagina.module.css';


function LogoPagina() {
    return (
        <div className={styles.corpo}>
            <div className={styles.imagem}>
                <LogoSimples />
            </div>
            <div className={styles.palavras}>
                <div className={styles.primeiraPalavra}>Class</div>
                <div className={styles.segundaPalavra}>Now</div>
            </div>
        </div>
    )
}

export default LogoPagina;
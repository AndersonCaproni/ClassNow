import styles from './_logoMaior.module.css'
import logo from '../../img/logo2.png'

function LogoMaior(){
    return(
        <img src={logo} className={styles.imagem}></img>
    )
}

export default LogoMaior;
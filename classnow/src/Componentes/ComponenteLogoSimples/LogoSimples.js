import styles from './_logoSimples.module.css'
import logo from '../../img/logo2.png'

function LogoSimples(){
    return(
        <img src={logo} className={styles.imagem}></img>
    )
}

export default LogoSimples;
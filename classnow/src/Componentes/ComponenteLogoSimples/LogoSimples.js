import styles from './_logoSimples.module.css'
import logo from '../../img/logo.png'

function LogoSimples(){
    return(
        <img src={logo} className={styles.imagem}></img>
    )
}

export default LogoSimples;
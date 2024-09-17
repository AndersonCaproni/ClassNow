import styles from './_logoAluno.module.css'
import logo from '../../img/imageLogo.png'

function LogoAluno(){
    return(
        <img src={logo} className={styles.imagem}></img>
    )
}

export default LogoAluno;
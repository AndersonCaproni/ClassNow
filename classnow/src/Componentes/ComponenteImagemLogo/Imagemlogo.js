import styles from './_imagemLogo.module.css'
import logo from '../../img/imageLogo.png'

function ImagemLogo(){
    return(
        <img src={logo} className={styles.imagem}></img>
    )
}

export default ImagemLogo;
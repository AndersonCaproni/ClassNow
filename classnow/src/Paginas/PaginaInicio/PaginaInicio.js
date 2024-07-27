import Botao from '../../Componentes/ComponenteBotao/Botao';
import LogoInicial from '../../Componentes/ComponenteLogoInicial/Logoinicial';
import styles from './_paginaInicio.module.css'
import { useNavigate } from 'react-router-dom';

function PaginaInicio() {
    const navigate = useNavigate();

    return (
        <div className={styles.corpo}>
            <div className={styles.blocoCentro}>
                <LogoInicial/>
                <Botao onClick={() => {navigate('./paginaLogin')}} tipo='entrar'><h3>Entrar</h3></Botao>
            </div>
        </div>
    )
}

export default PaginaInicio;
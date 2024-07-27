import { useState } from 'react'
import Botao from '../../Componentes/ComponenteBotao/Botao'
import LogoCompleto from '../../Componentes/ComponenteLogoCompleta/LogoCompleta'
import aluno from '../../Servicos/aluno'
import styles from './_paginaCadastroAluno.module.css'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../Uteis/useAlert'

function PaginaCadastroAluno() {
    const navigate = useNavigate();
    const alert = useAlert();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const Cadastrar = async () => {
        if (senha === confirmarSenha && senha !== "") {
            try {
                await aluno.Criar(nome, email, senha, telefone)
                alert.handleAlert(`Aluno cadastrado com sucesso!`, "success")
                navigate('/paginaLogin');
            }
            catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema no cadastro: \n${error.response.data}\n tente novamente!`, "danger")
            }
        }
        else {
            alert.handleAlert(`Senhas não conferem!`, "danger")
        }
    }

    return (
        <div className={styles.corpo}>
            <div className={styles.blocoLogin}>
                <div className={styles.logo}>
                    <LogoCompleto />
                </div>
                <form className={styles.formulario}>
                    <label className={styles.titulo}>Nome:</label>
                    <div className={styles.blocoTexto}>
                        <div className={styles.dado}>
                            <input placeholder="nome" className={styles.texto} type="text" value={nome} onChange={(x) => { setNome(x.target.value); }} />
                        </div>
                    </div>
                    <label className={styles.titulo}>E-mail:</label>
                    <div className={styles.blocoTexto}>
                        <div className={styles.dado}>
                            <input placeholder="e-mail" className={styles.texto} type="text" value={email} onChange={(x) => { setEmail(x.target.value); }} />
                        </div>
                    </div>
                    <label className={styles.titulo}>Telefone:</label>
                    <div className={styles.blocoTexto}>
                        <div className={styles.dado}>
                            <input placeholder="telefone" className={styles.texto} type="text" value={telefone} onChange={(x) => { setTelefone(x.target.value); }} />
                        </div>
                    </div>
                    <div className={styles.senhas}>
                        <div className={styles.senhaSistema}>
                            <label className={styles.titulo}>Senha:</label>
                            <div className={styles.blocoTextoSenha}>
                                <div className={styles.dadoSenha}>
                                    <input placeholder="senha" className={styles.texto} type="password" value={senha} onChange={(x) => { setSenha(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.senhaSistema}>
                            <label className={styles.titulo}>Confirmar Senha:</label>
                            <div className={styles.blocoTextoSenha}>
                                <div className={styles.dadoSenha}>
                                    <input placeholder="confirmar senha" className={styles.texto} type="password" value={confirmarSenha} onChange={(x) => { setConfirmarSenha(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.botoes}>
                        <Botao onClick={Cadastrar} tipo='login'>Cadastrar</Botao>
                        <Botao onClick={() => { navigate('/paginaLogin') }} tipo='login'>Cancelar</Botao>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PaginaCadastroAluno;
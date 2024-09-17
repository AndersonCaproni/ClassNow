import { useState } from 'react';
import Botao from '../../Componentes/ComponenteBotao/Botao';
import ImagemLogo from '../../Componentes/ComponenteImagemLogo/Imagemlogo';
import professor from '../../Servicos/professor';
import styles from './_paginaCadastroProfessor.module.css'
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../Uteis/useAlert'
import ReactInputMask from 'react-input-mask';

function PaginaCadastroProfessor() {
    const navigate = useNavigate();
    const alert = useAlert();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("")
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const Cadastrar = async () => {
        if (senha === confirmarSenha && senha !== "") {
            try {
                await professor.Criar(nome, email, senha, telefone, estado, cidade)
                alert.handleAlert(`Professor cadastrado com sucesso!`, "success")
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
                    <ImagemLogo />
                </div>

                <form className={styles.formulario}>
                    <div className={styles.formsEsquerdo}>
                        <div className={styles.info}>
                            <label className={styles.titulo}>Nome:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <input placeholder="nome" className={styles.texto} type="text" value={nome} onChange={(x) => { setNome(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label className={styles.titulo}>E-mail:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <input placeholder="e-mail" className={styles.texto} type="text" value={email} onChange={(x) => { setEmail(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label className={styles.titulo}>Telefone:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <ReactInputMask maskChar={null} mask="(99) 99999-9999" placeholder="telefone" className={styles.texto} type="text" value={telefone} onChange={(x) => { setTelefone(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formsDireito}>
                        <div className={styles.info}>
                            <label className={styles.titulo}>Estado:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <input placeholder="estado" className={styles.texto} type="text" value={estado} onChange={(x) => { setEstado(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <label className={styles.titulo}>Cidade:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <input placeholder="cidade" className={styles.texto} type="text" value={cidade} onChange={(x) => { setCidade(x.target.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.senhas}>
                            <div className={styles.senhaSistema}>
                                <label className={styles.tituloSenha}>Senha:</label>
                                <div className={styles.blocoTextoSenha}>
                                    <div className={styles.dadoSenha}>
                                        <input placeholder="senha" className={styles.texto} type="password" value={senha} onChange={(x) => { setSenha(x.target.value); }} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.senhaSistema}>
                                <label className={styles.tituloSenha}>Confirmar Senha:</label>
                                <div className={styles.blocoTextoSenha}>
                                    <div className={styles.dadoSenhaDireito}>
                                        <input placeholder="confirmar senha" className={styles.texto} type="password" value={confirmarSenha} onChange={(x) => { setConfirmarSenha(x.target.value); }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className={styles.botoes}>
                    <Botao onClick={Cadastrar} tipo='login'>Cadastrar</Botao>
                    <Botao onClick={() => { navigate('/paginaLogin') }} tipo='login'>Cancelar</Botao>
                </div>


            </div>
        </div>
    )
}

export default PaginaCadastroProfessor;
import React, { useState } from 'react';
import Botao from '../../Componentes/ComponenteBotao/Botao';
import LogoCompleto from '../../Componentes/ComponenteLogoCompleta/LogoCompleta';
import styles from './_paginaLogin.module.css'
import { useAlert } from '../../Uteis/useAlert';
import { useNavigate } from 'react-router-dom';
import aluno from '../../Servicos/aluno';
import professor from '../../Servicos/professor';

function PaginaLogin() {
    const alert = useAlert();
    const navigate = useNavigate();
    const [tipoUsuario, setTipoUsuario] = useState(true);
    const [estudante, setEstudante] = useState({});
    const [prof, setProf] = useState({});
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false);

    const MudarUsuario = () => {
        setTipoUsuario(!tipoUsuario);
    }

    const Logar = async () => {
        if (tipoUsuario) {

            setLoading(true);
            try {
                const resposta = await aluno.Logar(email, senha);
                setEstudante(resposta);

                if (resposta.data) {
                    alert.handleAlert(`Login realizado com sucesso!`, "success")
                    navigate('/paginaAluno', { state: { estudante: resposta.data } });
                }
            }
            catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema no login: \n${error.response.data}\n tente novamente!`, "danger")
                setLoading(false);
            }

        }
        else {
            setLoading(true);
            try {
                const resposta = await professor.Logar(email, senha);
                setProf(resposta);

                if (resposta.data) {
                    alert.handleAlert(`Login realizado com sucesso!`, "success")
                    navigate('/paginaProfessor', { state: { prof: resposta.data } });
                }
            }
            catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema no login: \n${error.response.data}\n tente novamente!`, "danger")
                setLoading(false);
            }

        }
    }

    return (
        <>
            {loading ? (
                <div className={styles.pagin}>
                    <div className={styles.loader}>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                        <div className={styles.circle}></div>
                    </div>
                </div>
            )
                :
                <div className={styles.corpo}>
                    <div className={styles.blocoLogin}>
                    <div className={styles.logo}>
                        <LogoCompleto />
                    </div>
                        <form className={styles.formulario}>
                            <label className={styles.titulo}>E-mail:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <svg className={styles.icone} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                                    </svg>
                                    <input autocomplete="off" placeholder="e-mail" className={styles.texto} type="text" value={email} onChange={(x) => { setEmail(x.target.value) }} />
                                </div>
                            </div>
                            <label className={styles.titulo}>Senha:</label>
                            <div className={styles.blocoTexto}>
                                <div className={styles.dado}>
                                    <svg className={styles.icone} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                                    </svg>
                                    <input placeholder="senha" className={styles.texto} type="password" value={senha} onChange={(x) => { setSenha(x.target.value) }} />
                                </div>
                            </div>
                        </form>
                        <div className={styles.botao}>
                            <input id="botao" checked={tipoUsuario} onChange={MudarUsuario} className={styles.tipos} type='checkbox' />
                            <label for="botao" className={styles.estados}>
                                <div className={styles.ligado}></div>
                                <div className={styles.bolinha}></div>
                            </label>
                        </div>
                        <div className={styles.botoes}>
                            <Botao onClick={Logar} tipo='login'>Entrar</Botao>
                            <Botao onClick={() => { tipoUsuario ? navigate('/paginaCadastroAluno') : navigate('/paginaCadastroProfessor') }} tipo='login'>Cadastrar-se</Botao>
                        </div>


                    </div>
                </div>
            }
        </>
    )
}

export default PaginaLogin;
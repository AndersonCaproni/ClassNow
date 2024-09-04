import { useState } from 'react';
import Botao from '../ComponenteBotao/Botao';
import styles from './_editarProfessor.module.css'
import professor from '../../Servicos/professor';
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../Uteis/useAlert'
import ReactInputMask from 'react-input-mask'

function EditarProfessor({ children, dados, enviarEstado }) {
    const [excluir, setExcluir] = useState(false);
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [estado, setEstado] = useState("")
    const [cidade, setCidade] = useState("");
    const [trocouNome, setTrocouNome] = useState(false)
    const [trocouTelefone, setTrocouTelefone] = useState(false)
    const [trocouEstado, setTrocouEstado] = useState(false)
    const [trocouCidade, setTrocouCidade] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert();

    const AlterarProfessor = async () => {
        try {
            if (trocouNome) {
                if (trocouTelefone) {
                    if (trocouEstado) {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, nome, telefone, estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, nome, telefone, estado, dados.cidade)
                        }
                    }
                    else {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, nome, telefone, dados.estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, nome, telefone, dados.estado, dados.cidade)
                        }
                    }
                }
                else {
                    if (trocouEstado) {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, nome, dados.telefone, estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, nome, dados.telefone, estado, dados.cidade)
                        }
                    }
                    else {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, nome, dados.telefone, dados.estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, nome, dados.telefone, dados.estado, dados.cidade)
                        }
                    }
                }
            }
            else {
                if (trocouTelefone) {
                    if (trocouEstado) {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, dados.nome, telefone, estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, dados.nome, telefone, estado, dados.cidade)
                        }
                    }
                    else {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, dados.nome, telefone, dados.estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, dados.nome, telefone, dados.estado, dados.cidade)
                        }
                    }
                }
                else {
                    if (trocouEstado) {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, dados.nome, dados.telefone, estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, dados.nome, dados.telefone, estado, dados.cidade)
                        }
                    }
                    else {
                        if (trocouCidade) {
                            await professor.Atualizar(dados.professorID, dados.nome, dados.telefone, dados.estado, cidade)
                        } else {
                            await professor.Atualizar(dados.professorID, dados.nome, dados.telefone, dados.estado, dados.cidade)
                        }
                    }
                }
            }

            alert.handleAlert(`Professor atualizado com sucesso!`, "success")
            enviarEstado(false)
        }
        catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema na atualização: \n${error}\n tente novamente!`, "danger")
        }
    }

    const Excluir = async () => {
        try {
            await professor.Deletar(dados.professorID);
            alert.handleAlert(`Professor deletado com sucesso!`, "success")
            navigate('/')
        }
        catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema na exclusão: \n${error}\n tente novamente!`, "danger")
        }
    }

    return (
        <>

            {excluir &&
                <>
                    <div className={styles.escurecer}></div>
                    <div className={styles.excluir}>
                        <div className={styles.textoExcluir}>
                            AO CLICAR EM EXCLUIR VOCÊ PERDERÁ TOTAL ACESSO A NOSSAS FERRAMENTAS!
                        </div>
                        <div className={styles.botoesExcluir}>
                            <Botao onClick={Excluir} tipo='excluirUsuario'>EXCLUIR</Botao>
                            <Botao onClick={() => { setExcluir(false) }} tipo='excluir'>Voltar</Botao>
                        </div>
                    </div>
                </>
            }
            <div className={styles.corpo}>
                <div className={styles.descricao}>
                    <h2 className={styles.titulo}>Editar Professor</h2>
                </div>
                <form className={styles.formulario}>
                    <label className={styles.titulo}>Nome:</label>
                    <div className={styles.dado}>
                        <input placeholder="nome (Deixe em branco para não alterar)" className={styles.texto} type="text" value={nome} onChange={(x) => { setNome(x.target.value); setTrocouNome(true) }}/>
                    </div>
                    <label className={styles.titulo}>Telefone:</label>
                    <div className={styles.dado}>
                    <ReactInputMask maskChar={null} mask="(99) 99999-9999" placeholder="telefone (Deixe em branco para não alterar)" className={styles.texto} type="text" value={telefone} onChange={(x) => { setTelefone(x.target.value); setTrocouTelefone(true) }}/>
                    </div>
                    <label className={styles.titulo}>Estado:</label>
                    <div className={styles.dado}>
                        <input placeholder="estado (Deixe em branco para não alterar)" className={styles.texto} type="text" value={estado} onChange={(x) => { setEstado(x.target.value); setTrocouEstado(true) }}/>
                    </div>
                    <label className={styles.Cidade}>Cidade:</label>
                    <div className={styles.dado}>
                        <input placeholder="cidade (Deixe em branco para não alterar)" className={styles.texto} type="text" value={cidade} onChange={(x) => { setCidade(x.target.value); setTrocouCidade(true) }}/>
                    </div>
                </form>
                <div className={styles.botoes}>
                    <Botao onClick={AlterarProfessor} tipo='login'>Editar</Botao>
                    <Botao onClick={() => { setExcluir(true) }} tipo='login'>Excluir</Botao>
                    {children}
                </div>
            </div>
        </>
    )
}

export default EditarProfessor;
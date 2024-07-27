import { useState } from 'react';
import Botao from '../ComponenteBotao/Botao';
import styles from './_editarAluno.module.css'
import { useAlert } from '../../Uteis/useAlert'
import aluno from '../../Servicos/aluno';
import { useNavigate } from 'react-router-dom';

function EditarAluno({ children, dados, enviarEstado }) {
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const alert = useAlert();
    const [trocouNome, setTrocouNome] = useState(false)
    const [trocouTelefone, setTrocouTelefone] = useState(false)
    const [excluir, setExcluir] = useState(false);
    const navigate = useNavigate();

    const AlterarAluno = async () => {
        try {
            if (trocouNome) {
                if (trocouTelefone) {
                    await aluno.Atualizar(dados.alunoID, nome, telefone)
                    alert.handleAlert(`Aluno atualizado com sucesso!`, "success")
                    enviarEstado(false)
                }
                else {
                    await aluno.Atualizar(dados.alunoID, nome, dados.telefone)
                    alert.handleAlert(`Aluno atualizado com sucesso!`, "success")
                    enviarEstado(false)
                }
            }
            else {
                if (trocouTelefone) {
                    await aluno.Atualizar(dados.alunoID, dados.nome, telefone)
                    alert.handleAlert(`Aluno atualizado com sucesso!`, "success")
                    enviarEstado(false)
                }
                else {
                    alert.handleAlert(`Voce não está alterando nenhuma informação!`, "danger") 
                }
            }

        }
        catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema na atualização: \n${error}\n tente novamente!`, "danger")
        }
    }

    const Excluir = async () => {
        try{
            await aluno.Deletar(dados.alunoID);
            alert.handleAlert(`Aluno deletado com sucesso!`, "success")
            navigate('/')
        }
        catch(error){
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
                <Botao onClick={() => {setExcluir(false)}}tipo='excluir'>Voltar</Botao>
            </div>
        </div>
        </>
        }
        <div className={styles.corpo}>
            <div className={styles.descricao}>
                <h2 className={styles.titulo}>Editar Aluno</h2>
            </div>
            <form className={styles.formulario}>
                <label className={styles.titulo}>Nome:</label>
                <div className={styles.dado}>
                    <input placeholder="nome (deixe em branco para não alterar)" className={styles.texto} type="text" value={nome} onChange={(x) => { setNome(x.target.value); setTrocouNome(true) }} />
                </div>
                <label className={styles.titulo}>Telefone:</label>
                <div className={styles.dado}>
                    <input placeholder="telefone (deixe em branco para não alterar)" className={styles.texto} type="text" value={telefone} onChange={(x) => { setTelefone(x.target.value); setTrocouTelefone(true) }} />
                </div>
            </form>
            <div className={styles.botoes}>
                <Botao onClick={AlterarAluno} tipo='login'>Editar</Botao>
                <Botao onClick={() => {setExcluir(true)}} tipo='login'>Excluir</Botao>
                {children}
            </div>
        </div>
        </>
    )
}

export default EditarAluno;
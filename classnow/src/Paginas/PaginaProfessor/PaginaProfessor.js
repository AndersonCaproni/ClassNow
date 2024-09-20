import { useEffect, useState } from 'react';
import LogoPagina from '../../Componentes/ComponenteLogoPagina/LogoPagina';
import styles from './_paginaProfessor.module.css'
import Botao from '../../Componentes/ComponenteBotao/Botao';
import EditarProfessor from '../../Componentes/ComponenteEditarProfessor/EditarProfessor';
import { FaBookOpen } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import curso from '../../Servicos/curso';
import { useLocation } from 'react-router-dom'
import { useAlert } from '../../Uteis/useAlert';
import professor from '../../Servicos/professor';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';
import LogoAluno from '../../Componentes/ComponenteLogoAluno/LogoAluno';
import LogoSimples from '../../Componentes/ComponenteLogoSimples/LogoSimples';

function PaginaProfessor() {
    const [editar, setEditar] = useState(false)
    const alert = useAlert();
    const navigate = useNavigate();
    const primeiraFuncionalidade = useState("Cursos Ministrados")
    const segundaFuncionalidade = useState("Gerenciar Cursos")
    const [primeirafuncionalidadeAtiva, setPrimeiraFuncionalidadeAtiva] = useState('funcionalidadeAtiva')
    const [segundafuncionalidadeAtiva, setSegundaFuncionalidadeAtiva] = useState('funcionalidade')
    const [dadosPagina, setDadosPagina] = useState(false)
    const [criarCurso, setCriarCurso] = useState(false)
    const location = useLocation();
    const [prof, setProf] = useState(location.state?.prof || {})
    const [cursos, setCursos] = useState([]);
    const [aulas, setAulas] = useState([])
    const [dadosCurso, setDadosCursos] = useState([]);
    const [dadosAulas, setDadosAulas] = useState([]);
    const [categoria, setCategoria] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [editarCursos, setEditarCursos] = useState(false)
    const [IdEditarCurso, setIdEditarCurso] = useState("")
    const [cancelarCurso, setCancelarCurso] = useState(false)
    const [cancelarAula, setCancelarAula] = useState(false)
    const [trocouCategoria, setTrocouCategoria] = useState(false)
    const [trocouDescricao, setTrocouDescricao] = useState(false)
    const [trocouValor, setTrocouValor] = useState(false)
    const [loading, setLoading] = useState(false);
    const [temCurso, setTemCurso] = useState(false);
    const [temAula, setTemAula] = useState(false);
    const [editou, setEditou] = useState(false);
    const [cancelou, setCancelou] = useState(false);
    const [criou, setCriou] = useState(false);
    const [cancelouAula, setCancelouAula] = useState(false);

    const LimparVariaveis = () => {
        setValor("")
        setDescricao("")
        setCategoria("")
    }

    useEffect(() => {

        const ListarCursos = async () => {
            try {
                if (prof.professorID) {
                    const resposta = await curso.ListarPorProfessor(prof.professorID);
                    setTemAula(false);
                    setLoading(false);
                    setCursos(resposta.data);
                }
            } catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema ao buscar pelos cursos: \n${error.response.data}\n tente novamente!`, "danger");
                setTemAula(true);
                setLoading(false)
            }
        };

        ListarCursos();

    }, [cancelou, editou, criou, dadosPagina,]);

    useEffect(() => {
        const Obter = async () => {
            try {
                const resposta = await professor.ObterInfo(prof.professorID);
                setProf(resposta.data);
            } catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema ao buscar pelo professor: \n${error.response.data}\n tente novamente!`, "danger");
            }
        };

        Obter();
    }, [editar]);


    useEffect(() => {
        setLoading(true)
        const ListarAulas = async () => {
            try {
                if (prof.professorID) {
                    const resposta = await professor.ListarAulas(prof.professorID);
                    setTemCurso(false)
                    setLoading(false)
                    setAulas(resposta.data);
                }
            } catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema ao buscar pelos cursos vendidos: \n${error.response.data}\n tente novamente!`, "danger");
                setLoading(false)
                setTemCurso(true)
            }
        };

        ListarAulas();
    }, [cancelouAula, dadosPagina,]);

    const ConfirmarCriacaoCurso = async () => {
        try {
            await curso.Criar(categoria, descricao, valor, prof.professorID)
            alert.handleAlert(`Curso criado com sucesso!`, "success")
            setCriarCurso(false)
            setCriou(false)
        }
        catch (error) {
            console.log(error)
            alert.handleAlert(`Ops! Tivemos o seguinte problema ao criar o curso: Erro ao criar o curso, verifique as informações e tente novamente!`, "danger")
            setLoading(false)
        }
    }

    const ConfirmarEdicaoCurso = async () => {

        try {

            if (trocouCategoria && categoria !== "") {
                if (trocouDescricao && descricao !== "") {
                    if (trocouValor && valor !== "") {
                        await curso.Atualizar(IdEditarCurso, categoria, descricao, valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                    else {
                        await curso.Atualizar(IdEditarCurso, categoria, descricao, dadosCurso.valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                }
                else {
                    if (trocouValor && valor !== "") {
                        await curso.Atualizar(IdEditarCurso, categoria, dadosCurso.descricao, valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                    else {
                        await curso.Atualizar(IdEditarCurso, categoria, dadosCurso.descricao, dadosCurso.valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                }
            }
            else {
                if (trocouDescricao && descricao !== "") {
                    if (trocouValor && valor !== "") {
                        await curso.Atualizar(IdEditarCurso, dadosCurso.categoria, descricao, valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                    else {
                        await curso.Atualizar(IdEditarCurso, dadosCurso.categoria, descricao, dadosCurso.valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                }
                else {
                    if (trocouValor && valor !== "") {
                        await curso.Atualizar(IdEditarCurso, dadosCurso.categoria, dadosCurso.descricao, valor)
                        alert.handleAlert(`Curso editado com sucesso!`, "success")
                        setEditarCursos(false)
                        setEditou(false)
                    }
                    else {
                        alert.handleAlert(`Voce não está alterando nenhuma informação!`, "danger")
                    }
                }
            }

        }
        catch (error) {
            alert.handleAlert(`Ops! Erro ao editar o curso, preencha as informações e tente novamente!`, "danger")
        }
    }

    const CancelarCurso = async () => {
        try {
            await curso.Deletar(dadosCurso.cursoID)
            alert.handleAlert(`Curso cancelado com sucesso!`, "success")
            setCancelarCurso(false)
            setCancelou(false)
            setCancelouAula(false);
        }
        catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema ao cancelar o curso: \n${error.response.data}\n tente novamente!`, "danger")
        }
    }

    const CancelarAula = async () => {
        try {
            await professor.CancelarAula(dadosAulas.alunoID, dadosAulas.cursoID)
            alert.handleAlert(`Aula cancelada com sucesso!`, "success")
            setCancelarAula(false)
            setCancelouAula(false)
        }
        catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema ao cancelar a aula: \n${error.response.data}\n tente novamente!`, "danger")
        }
    }

    return (
        <>
            <div className={styles.corpo}>
                {

                    editar &&
                    <div>
                        <div className={styles.escurecer}></div>
                        <EditarProfessor dados={prof} enviarEstado={setEditar}>
                            <Botao onClick={() => { setEditar(!editar) }} tipo='login'>Voltar</Botao>
                        </EditarProfessor>
                    </div>
                }
                {
                    dadosPagina &&
                    <div className={styles.botaoMais} >
                        <Botao onClick={() => { LimparVariaveis(); setCriarCurso(true) }} tipo='criarCurso'>+</Botao>
                    </div>
                }
                {
                    criarCurso &&
                    <>
                        <div className={styles.escurecer}></div>
                        <div className={styles.blocoCriar}>
                            <div className={styles.descricao}>
                                <h2 className={styles.titulo}>Criar Curso</h2>
                            </div>
                            <form className={styles.formulario}>
                                <label className={styles.titulo}>Categoria:</label>
                                <div className={styles.dado}>
                                    <input placeholder="categoria" className={styles.texto} type="text" value={categoria} onChange={(x) => { setCategoria(x.target.value) }} />
                                </div>
                                <label className={styles.titulo}>Descrição:</label>
                                <div className={styles.dado}>
                                    <input placeholder="descrição" className={styles.texto} type="text" value={descricao} onChange={(x) => { setDescricao(x.target.value) }} />
                                </div>
                                <label className={styles.titulo}>Valor:</label>
                                <div className={styles.dado}>
                                    <ReactInputMask placeholder="valor" className={styles.texto} type="number" value={valor} onChange={(x) => { setValor(x.target.value) }} />
                                </div>
                            </form>
                            <div className={styles.botoes}>
                                <Botao onClick={() => { setCriou(true); ConfirmarCriacaoCurso() }} tipo='comprar'>Confirmar</Botao>
                                <Botao onClick={() => { setCriarCurso(false) }} tipo='comprar'>Cancelar</Botao>
                            </div>
                        </div>
                    </>
                }

                {
                    editarCursos &&
                    <>
                        <div className={styles.escurecer}></div>
                        <div className={styles.blocoCriar}>
                            <div className={styles.descricao}>
                                <h2 className={styles.titulo}>Editar Curso</h2>
                            </div>
                            <form className={styles.formulario}>
                                <label className={styles.titulo}>Categoria:</label>
                                <div className={styles.dado}>
                                    <input placeholder="categoria (Deixe em branco para não alterar)" className={styles.texto} type="text" value={categoria} onChange={(x) => { setCategoria(x.target.value); setTrocouCategoria(true) }} />
                                </div>
                                <label className={styles.titulo}>Descrição:</label>
                                <div className={styles.dado}>
                                    <input placeholder="descrição (Deixe em branco para não alterar)" className={styles.texto} type="text" value={descricao} onChange={(x) => { setDescricao(x.target.value); setTrocouDescricao(true) }} />
                                </div>
                                <label className={styles.titulo}>Valor:</label>
                                <div className={styles.dado}>
                                    <input placeholder="valor (Deixe em branco para não alterar)" className={styles.texto} type="number" value={valor} onChange={(x) => { setValor(x.target.value); setTrocouValor(true) }} />
                                </div>
                            </form>
                            <div className={styles.botoes}>
                                <Botao onClick={() => { setEditou(true); ConfirmarEdicaoCurso() }} tipo='comprar'>Confirmar</Botao>
                                <Botao onClick={() => { setEditarCursos(false) }} tipo='comprar'>Cancelar</Botao>
                            </div>
                        </div>
                    </>
                }

                {
                    cancelarCurso &&
                    <div>
                        <div className={styles.escurecer}></div>
                        <div className={styles.confirmarCancelamentoCurso}>
                            <div className={styles.dadosDoCursoConfirmar}>Dados do Curso</div>
                            <div className={styles.categoriaCursoConfirmar}><p><b> Categoria:</b> {dadosCurso.categoria}</p></div>
                            <div className={styles.nomeDescricaoCursoConfirmar}><b>Descrição:</b></div>
                            <div className={styles.descricaoCursoConfirmar}>{dadosCurso.descricao}</div>
                            <div className={styles.valorCursoConfirmar}><p><b>Valor:  R$</b> {dadosCurso.valor} </p></div>
                            <div className={styles.botoesCursoCancelar}>
                                <Botao onClick={() => { setCancelouAula(true); setCancelou(true); CancelarCurso() }} tipo='excluir'>Cancelar Curso</Botao>
                                <Botao onClick={() => { setCancelarCurso(false) }} tipo='excluir'>Voltar</Botao>
                            </div>
                        </div>
                    </div>
                }

                {
                    cancelarAula &&
                    <div>
                        <div className={styles.escurecer}></div>
                        <div className={styles.confirmarCancelamentoAula}>
                            <div className={styles.dadosDaAulaConfirmar}>Dados da Aula</div>
                            <div className={styles.categoriaAulaConfirmar}><p><b> Categoria:</b> {dadosAulas.categoria}</p></div>
                            <div className={styles.nomeDescricaoAulaConfirmar}><b>Descrição:</b></div>
                            <div className={styles.descricaoAulaConfirmar}>{dadosAulas.descricao}</div>
                            <div className={styles.alunoConfirmar}><p><b>Aluno: </b> {dadosAulas.nome} </p></div>
                            <div className={styles.alunoConfirmar}><p><b>E-Mail: </b> {dadosAulas.email} </p></div>
                            <div className={styles.alunoConfirmar}><p><b>Telefone: </b> {dadosAulas.telefone} </p></div>
                            <div className={styles.botoesCursoCancelar}>
                                <Botao onClick={() => { setCancelouAula(true); CancelarAula() }} tipo='excluir'>Cancelar Aula</Botao>
                                <Botao onClick={() => { setCancelarAula(false) }} tipo='excluir'>Voltar</Botao>
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.corpoEsquerdo}>
                    <div className={styles.campoLogo}>
                        <div className={styles.logo}>
                            <LogoAluno />
                        </div>
                    </div>
                    <div className={styles.logoSimples}>
                        <div className={styles.caixaLogo}>
                            <LogoSimples />
                        </div>
                    </div>
                    <div className={styles.linha}></div>
                    <div className={styles.opcoes}>
                        <div className={styles.botaoFuncionalidade}>
                            <Botao tipo={primeirafuncionalidadeAtiva} onClick={() => { setDadosPagina(false); setPrimeiraFuncionalidadeAtiva('funcionalidadeAtiva'); setSegundaFuncionalidadeAtiva('funcionalidade') }}> <FaBookOpen style={{ marginRight: '8px', marginLeft: '5px' }} />{primeiraFuncionalidade}</Botao>
                        </div>
                        <div className={styles.botaoFuncionalidade}>
                            <Botao tipo={segundafuncionalidadeAtiva} onClick={() => { setDadosPagina(true); setPrimeiraFuncionalidadeAtiva('funcionalidade'); setSegundaFuncionalidadeAtiva('funcionalidadeAtiva') }}> <FaBook style={{ marginRight: '8px', marginLeft: '5px' }} />{segundaFuncionalidade}</Botao>
                        </div>
                        <div className={styles.botaoFuncionalidadeMin}>
                            <Botao tipo={primeirafuncionalidadeAtiva} onClick={() => { setDadosPagina(false); setPrimeiraFuncionalidadeAtiva('funcionalidadeAtiva'); setSegundaFuncionalidadeAtiva('funcionalidade') }}> <FaBookOpen style={{ marginLeft: '1.4rem' }} /></Botao>
                        </div>
                        <div className={styles.botaoFuncionalidadeMin}>
                            <Botao tipo={segundafuncionalidadeAtiva} onClick={() => { setDadosPagina(true); setPrimeiraFuncionalidadeAtiva('funcionalidade'); setSegundaFuncionalidadeAtiva('funcionalidadeAtiva') }}> <FaBook style={{ marginLeft: '1.4rem' }} /></Botao>
                        </div>
                    </div>
                    <div className={styles.caixaSair}>
                        <button onClick={() => { navigate('/paginaLogin') }} className={styles.botaoSair}><BiExit style={{ marginRight: '8px', marginLeft: '5px' }} />Sair</button>
                    </div>
                </div>
                <div className={styles.corpoDireito}>
                    <div className={styles.blocoSuperior}>
                        <div className={styles.dadosPagina}></div>
                        <div className={styles.perfilContainer}>
                            <div className={styles.perfil}>
                                <PersonOutlineIcon fontSize="large" color="disabled" />
                                <div className={styles.infoPerfil}>
                                    <div className={styles.caixaIcone}>
                                        <div className={styles.icone}>
                                            <PersonOutlineIcon fontSize="large" color="disabled" />
                                        </div>
                                    </div>
                                    <div className={styles.dadosPerfil}>
                                        <p><b>ID:</b> {prof.professorID}</p>
                                    </div>
                                    <hr className={styles.linhaPerfil} />
                                    <div className={styles.dadosPerfil}>
                                        <p><b>Nome:</b> {prof.nome}</p>
                                    </div>
                                    <hr className={styles.linhaPerfil} />
                                    <div className={styles.dadosPerfil}>
                                        <p><b>Telefone:</b> {prof.telefone}</p>
                                    </div>
                                    <hr className={styles.linhaPerfil} />
                                    <div className={styles.dadosPerfil}>
                                        <p><b>E-mail:</b> {prof.email}</p>
                                    </div>
                                    <hr className={styles.linhaPerfil} />
                                    <div className={styles.dadosPerfil}>
                                        <p><b>Estado:</b> {prof.estado}</p>
                                    </div>
                                    <hr className={styles.linhaPerfil} />
                                    <div className={styles.dadosPerfil}>
                                        <p><b>Cidade:</b> {prof.cidade}</p>
                                    </div>
                                    <div className={styles.botaoEditar}>
                                        <Botao onClick={() => { setEditar(!editar) }} tipo='editar'>Editar</Botao>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blocoInferior}>
                        {
                            dadosPagina ?
                                <>
                                    <>
                                        {
                                            temAula ?

                                                <div className={styles.alertaNaoCurso}>
                                                    <div className={styles.blocoNaoCurso}>
                                                        <CloseIcon sx={{ fontSize: 100 }} color="action" />
                                                    </div>
                                                    <div className={styles.blocoNaoCursoTexto}>
                                                        Não há Cursos!
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    {cursos.map((curso) => (
                                                        <div key={curso.id} className={styles.boxCurso}>
                                                            <div className={styles.categoriaCurso}>Categoria: {curso.categoria}</div>
                                                            <div className={styles.descricaoCurso}><p><b>Descrição:</b>{curso.descricao}</p></div>
                                                            <div className={styles.valor}><p><b>Valor:</b> R$ {curso.valor}</p></div>
                                                            <div className={styles.botaoComprar}>
                                                                <Botao onClick={() => { LimparVariaveis(); setEditarCursos(true); setIdEditarCurso(curso.cursoID); setDadosCursos(curso) }} tipo='comprar'>Editar</Botao>
                                                                <Botao onClick={() => { setCancelarCurso(true); setDadosCursos(curso) }} tipo='comprar'>Cancelar</Botao>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </>
                                        }
                                    </>

                                </>
                                :
                                <>
                                    {
                                        aulas.length === 0 ?
                                            <div className={styles.alertaNaoCurso}>
                                                <div className={styles.blocoNaoCurso}>
                                                    <CloseIcon sx={{ fontSize: 100 }} color="action" />
                                                </div>
                                                <div className={styles.blocoNaoAulaTexto}>
                                                    Não há aulas vendidas!
                                                </div>
                                            </div>

                                            :
                                            <>
                                                {aulas.map((aula) => (

                                                    <div key={aula.id} className={styles.boxAula}>
                                                        <div className={styles.categoriaAula}>Categoria: {aula.categoria}</div>
                                                        <div className={styles.descricaoAula}><p><b>Descrição:</b> {aula.descricao}</p></div>
                                                        <div className={styles.alunoAula}><p><b>Aluno:</b> {aula.nome}</p></div>
                                                        <div className={styles.alunoAula}><p><b>E-mail:</b> {aula.email}</p></div>
                                                        <div className={styles.alunoAula}><p><b>Telefone:</b> {aula.telefone}</p></div>
                                                        <div className={styles.botaoComprar}>
                                                            <Botao onClick={() => { setCancelarAula(true); setDadosAulas(aula) }} tipo='comprar'>Cancelar Aula</Botao>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                    }
                                </>
                        }
                        {loading &&
                            <div className={styles.pagin}>
                                <div className={styles.loader}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.circle}></div>
                                    <div className={styles.circle}></div>
                                    <div className={styles.circle}></div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaginaProfessor;
import { useEffect, useState } from 'react'
import LogoPagina from '../../Componentes/ComponenteLogoPagina/LogoPagina'
import LogoSimples from '../../Componentes/ComponenteLogoSimples/LogoSimples'
import styles from './_paginaAluno.module.css'
import EditarAluno from '../../Componentes/ComponenteEditarAluno/EditarAluno'
import Botao from '../../Componentes/ComponenteBotao/Botao'
import { FaBookOpen } from 'react-icons/fa'
import { FaBook } from 'react-icons/fa'
import { BiExit } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import curso from '../../Servicos/curso'
import aluno from '../../Servicos/aluno'
import { useAlert } from '../../Uteis/useAlert';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CloseIcon from '@mui/icons-material/Close';
import ImagemLogo from '../../Componentes/ComponenteImagemLogo/Imagemlogo'
import LogoAluno from '../../Componentes/ComponenteLogoAluno/LogoAluno'

function PaginaAluno() {
    const navigate = useNavigate();
    const alert = useAlert();
    const location = useLocation();
    const [editar, setEditar] = useState(false)
    const [comprar, setComprar] = useState(false)
    const [cancelar, setCancelar] = useState(false)
    const primeiraFuncionalidade = useState("Cursos Matriculados")
    const segundaFuncionalidade = useState("Cursos Disponiveis")
    const [primeirafuncionalidadeAtiva, setPrimeiraFuncionalidadeAtiva] = useState('funcionalidadeAtiva')
    const [segundafuncionalidadeAtiva, setSegundaFuncionalidadeAtiva] = useState('funcionalidade')
    const [dadosPagina, setDadosPagina] = useState(false)
    const [estudante, setEstudante] = useState(location.state?.estudante || {})
    const [cursos, setCursos] = useState([]);
    const [aulas, setAulas] = useState([])
    const [confirmarDescricao, setConfirmarDescricao] = useState("")
    const [confirmarValor, setConfirmarValor] = useState("")
    const [confirmarID, setConfirmarID] = useState("")
    const [confirmarCategoria, setConfirmarCategoria] = useState("")
    const [confirmarProfessor, setConfirmarProfessor] = useState("")

    useEffect(() => {
        const ListarCursos = async () => {
            try {
                const resposta = await curso.ListarCursos();
                setCursos(resposta.data);
            } catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema ao buscar pelos cursos: \n${error.response.data}\n tente novamente!`, "danger");
            }
        };

        ListarCursos();
    }, [dadosPagina]);

    useEffect(() => {
        const Obter = async () => {
            try {
                const resposta = await aluno.ObterInfo(estudante.alunoID);
                setEstudante(resposta.data);
            } catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema ao buscar pelo aluno: \n${error.response.data}\n tente novamente!`, "danger");
            }
        };

        Obter();
    }, [editar]);


    useEffect(() => {
        const ListarAulas = async () => {

            try {
                if (estudante.alunoID) {
                    const resposta = await aluno.ListarAulas(estudante.alunoID);

                    setAulas(resposta.data);
                }
            } catch (error) {
                alert.handleAlert(`Ops! Tivemos o seguinte problema ao buscar pelas aulas: \n${error.response.data}\n tente novamente!`, "danger");
            }
        };

        ListarAulas();

    }, []);

    const ComprarCurso = async () => {
        try {
            await aluno.AdicionarAula(estudante.alunoID, (confirmarID));
            alert.handleAlert(`Curso comprado com sucesso!`, "success");
            const resposta = await aluno.ListarAulas(estudante.alunoID);
            setAulas(resposta.data);


            setComprar(false);
        } catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema ao comprar o curso: \n${error.response.data}\n tente novamente!`, "danger");
        }
    }

    const CancelarCurso = async () => {
        try {
            await aluno.CancelarAula(estudante.alunoID, (confirmarID));
            const resposta = await aluno.ListarAulas(estudante.alunoID);
            setAulas(resposta.data);

            alert.handleAlert(`Curso cancelado com sucesso!`, "success");
            setCancelar(false);
        } catch (error) {
            alert.handleAlert(`Ops! Tivemos o seguinte problema ao cancelar o curso: \n${error.response.data}\n tente novamente!`, "danger");
        }
    }

    return (
        <div className={styles.corpo}>
            {
                editar &&
                <div>
                    <div className={styles.escurecer}></div>
                    <EditarAluno dados={estudante} enviarEstado={setEditar}>
                        <Botao onClick={() => { setEditar(!editar) }} tipo='login'>Voltar</Botao>
                    </EditarAluno>
                </div>
            }

            {
                comprar &&
                <div>
                    <div className={styles.escurecer}></div>
                    <div className={styles.confirmarCompra}>
                        <div className={styles.dadosDaCompraConfirmar}> Dados da Compra</div>
                        <div className={styles.categoriaCursoConfirmar}><p><b> Categoria:</b> {confirmarCategoria}</p></div>
                        <div className={styles.nomeDescricaoCursoConfirmar}><b>Descrição:</b></div>
                        <div className={styles.descricaoCursoConfirmar}>{confirmarDescricao}</div>
                        <div className={styles.professorCursoConfirmar}><p><b>Professor(a):</b> {confirmarProfessor}</p></div>
                        <div className={styles.valorConfirmar}>R$ {confirmarValor}</div>
                        <div className={styles.botoesCompra}>
                            <Botao onClick={ComprarCurso} tipo='editar'>Confirmar Compra</Botao>
                            <Botao onClick={() => { setComprar(false) }} tipo='editar'>Cancelar</Botao>
                        </div>
                    </div>
                </div>
            }

            {
                cancelar &&
                <div>
                    <div className={styles.escurecer}></div>
                    <div className={styles.confirmarCompra}>
                        <div className={styles.dadosDaCompraConfirmar}>Dados do Curso</div>
                        <div className={styles.categoriaCursoConfirmar}><p><b> Categoria:</b> {confirmarCategoria}</p></div>
                        <div className={styles.nomeDescricaoCursoConfirmar}><b>Descrição:</b></div>
                        <div className={styles.descricaoCursoConfirmar}>{confirmarDescricao}</div>
                        <div className={styles.professorCursoConfirmar}><p><b>Professor(a):</b> {confirmarProfessor}</p></div>
                        <div className={styles.botoesCompra}>
                            <Botao onClick={CancelarCurso} tipo='excluir'>Cancelar Compra</Botao>
                            <Botao onClick={() => { setCancelar(false) }} tipo='excluir'>Voltar</Botao>
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
                    <button onClick={() => { navigate('/paginaLogin') }} className={styles.botaoSair}><BiExit style={{ marginRight: '8px', marginLeft: '0px' }} />Sair</button>
                </div>
            </div>
            <div className={styles.corpoDireito}>
                <div className={styles.blocoSuperior}>
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
                                    <p><b>ID:</b> {estudante.alunoID}</p>
                                </div>
                                <hr className={styles.linhaPerfil} />
                                <div className={styles.dadosPerfil}>
                                    <p><b>Nome:</b> {estudante.nome}</p>
                                </div>
                                <hr className={styles.linhaPerfil} />
                                <div className={styles.dadosPerfil}>
                                    <p><b>Telefone:</b> {estudante.telefone}</p>
                                </div>
                                <hr className={styles.linhaPerfil} />
                                <div className={styles.dadosPerfil}>
                                    <p><b>Email:</b> {estudante.email}</p>
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
                                {cursos.map((curso) => (
                                    <div key={curso.id} className={styles.box}>
                                        <div className={styles.categoriaCurso}>Categoria: {curso.categoria}</div>
                                        <div className={styles.descricaoCurso}><p><b>Descrição:</b>{curso.descricao}</p></div>
                                        <div className={styles.professorCurso}><p><b>Professor(a):</b> {curso.nome}</p></div>
                                        <div className={styles.valorComprar}>
                                            <div className={styles.botaoComprar}>
                                                <Botao onClick={
                                                    () => {
                                                        setConfirmarID(curso.cursoID)
                                                        setConfirmarDescricao(curso.descricao)
                                                        setConfirmarValor(curso.valor)
                                                        setConfirmarCategoria(curso.categoria)
                                                        setConfirmarProfessor(curso.nome)
                                                        setComprar(true)
                                                    }
                                                } tipo='comprar'>Comprar</Botao>
                                            </div>
                                            <div className={styles.valor}>
                                                Valor: R$ {curso.valor}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                            :
                            <>
                                {

                                    aulas.length === 0 ?
                                        <div className={styles.alertaNaoCurso}>
                                            <div className={styles.blocoNaoCurso}>
                                                <CloseIcon sx={{ fontSize: 100 }} color="action" />
                                            </div>
                                            <div className={styles.blocoNaoCursoTexto}>
                                                Não há aulas!
                                            </div>
                                        </div>
                                        :

                                        <>
                                            {aulas.map((aula) => (
                                                <div className={styles.boxAula} key={aula.id}>
                                                    <div className={styles.categoriaAula}>Categoria: {aula.categoria}</div>
                                                    <div className={styles.descricaoCurso}><p><b>Descrição:</b>{aula.descricao}</p></div>
                                                    <div className={styles.professorCurso}><p><b>Professor(a):</b> {aula.nome}</p></div>
                                                    <div className={styles.professorCurso}><p><b>E-mail:</b> {aula.email}</p></div>
                                                    <div className={styles.valorComprar}>
                                                        <div className={styles.botaoComprar}>
                                                            <Botao onClick={
                                                                () => {
                                                                    setConfirmarID(aula.cursoID)
                                                                    setConfirmarDescricao(aula.descricao)
                                                                    setConfirmarCategoria(aula.categoria)
                                                                    setConfirmarProfessor(aula.nome)
                                                                    setCancelar(true)
                                                                }
                                                            } tipo='comprar'>Cancelar Aula</Botao>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                }
                            </>
                    }
                </div>
            </div>
        </div >
    )
}

export default PaginaAluno;
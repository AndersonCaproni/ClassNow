import styles from './_botao.module.css'

const Tipo = {
    entrar: styles.entrar,
    login: styles.login,
    editar: styles.editar,
    funcionalidade: styles.funcionalidade,
    funcionalidadeAtiva: styles.funcionalidadeAtiva,
    criarCurso: styles.criarCurso,
    sair: styles.sair,
    comprar: styles.comprar,
    excluir: styles.excluir,
    excluirUsuario: styles.excluirUsuario
}
function Botao({ children , tipo, onClick}) {
    return (
        <button onClick={onClick} className={`${Tipo[tipo]}`}>
            {children}
        </button>
    )
}

export default Botao;
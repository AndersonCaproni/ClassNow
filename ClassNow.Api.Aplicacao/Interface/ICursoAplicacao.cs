using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Aplicacao.Interface;

public interface ICursoAplicacao
{
    Task<int> CriarAsync(Curso curso);
    Task AtualizarAsync(Curso curso);
    Task DeletarAsync(int cursoID);
    Task<Curso> ObterAsync(int cursoID);
    Task<IEnumerable<CursoCompleto>> ListarCursosAsync(bool ativo);
    Task<IEnumerable<Curso>> ListarPorProfessorAsync(int professorID);
    
}
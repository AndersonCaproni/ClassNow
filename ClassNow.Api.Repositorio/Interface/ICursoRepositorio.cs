using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Repositorio.Interface;
public interface ICursoRepositorio
{
    Task<int> SalvarAsync(Curso curso);
    Task<Curso> ObterPorIDAsync(int cursoId);
    Task AtualizarAsync(Curso curso);
    Task<IEnumerable<CursoCompleto>> ListarCursosAsync(bool ativo);
    Task<IEnumerable<Curso>> ListarPorProfessorAsync(int professorID);
}
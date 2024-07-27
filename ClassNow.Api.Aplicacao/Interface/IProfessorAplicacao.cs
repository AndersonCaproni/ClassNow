using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Aplicacao.Interface;

public interface IProfessorAplicacao
{
    Task<int> CriarAsync(Professor professor);
    Task<int> LogarAsync(string email, string senha);
    Task AtualizarAsync(Professor professor);
    Task DeletarAsync(int professorId);
    Task<Professor> ObterAsync(int professorId);
    Task<IEnumerable<AulaProfessor>> ListarAulasAsync(int professorID);
    Task CancelarAulaAsync(int alunoID, int cursoID);
    
}
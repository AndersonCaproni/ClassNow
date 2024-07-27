using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Repositorio.Interface;
public interface IProfessorRepositorio
{
    Task<int> SalvarAsync(Professor professor);
    Task AtualizarAsync(Professor professor);
    Task<Professor> ObterPorIDAsync(int professorID);
    Task<IEnumerable<AulaProfessor>> ListarAulasAsync(int professorID);
    Task CancelarAulaAsync(Aula aula);
    Task<Aula> ObterAulaAsync(int alunoID, int cursoID);
    Task<Professor> ObterPorEmailAsync(string email);

}
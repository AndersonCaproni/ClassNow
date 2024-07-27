using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Repositorio.Interface;
public interface IAlunoRepositorio
{
    Task<int> SalvarAsync(Aluno aluno);
    Task AtualizarAsync(Aluno aluno);
    Task<Aluno> ObterPorIDAsync(int alunoID);
    Task<Aluno> ObterPorEmailAsync(string email);
    Task<IEnumerable<AulaAluno>> ListarAulasAsync(int alunoID);
    Task CriarAulaAsync(Aula aula);
    Task CancelarAulaAsync(Aula aula);
    Task<Aula> ObterAulaAsync(int alunoID, int cursoID);

}
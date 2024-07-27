using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Aplicacao.Interface;

public interface IAlunoAplicacao
{
    Task<int> CriarAsync(Aluno aluno);
    Task<int> LogarAsync(string email, string senha);
    Task AtualizarAsync(Aluno aluno);
    Task DeletarAsync(int alunoId);
    Task<Aluno> ObterAsync(int alunoId);
    Task<IEnumerable<AulaAluno>> ListarAulasAsync(int alunoID);
    Task AdicionarAulaAsync(int alunoID, int cursoID);
    Task CancelarAulaAsync(int alunoID, int cursoID);
    
}
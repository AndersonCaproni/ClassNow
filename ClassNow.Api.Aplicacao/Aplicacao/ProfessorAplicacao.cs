using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Aplicacao.Aplicacao;

public class ProfessorAplicacao : IProfessorAplicacao
{
    private readonly IProfessorRepositorio _professorRepositorio;

    public ProfessorAplicacao(IProfessorRepositorio professorRepositorio)
    {
        _professorRepositorio = professorRepositorio;
    }

    public async Task AtualizarAsync(Professor professor)
    {
        var professorExistente = await _professorRepositorio.ObterPorIDAsync(professor.ProfessorID);

        if (professorExistente == null)
            throw new Exception("Aluno não encontrado!");

        await _professorRepositorio.AtualizarAsync(professor);
    }

    public async Task CancelarAulaAsync(int alunoID, int cursoID)
    {
        var aula = await _professorRepositorio.ObterAulaAsync(alunoID, cursoID);

        if(aula == null)
            throw new Exception("Esta aula não existe!");
        
        if (aula.Ativo == false)
            throw new Exception("Esta aula já foi excluida!");

        await _professorRepositorio.CancelarAulaAsync(aula);
    }

    public async Task<int> CriarAsync(Professor professor)
    {
        if (professor == null)
            throw new Exception("Professor inválido!");
        

        var professorExistente = await _professorRepositorio.ObterPorEmailAsync(professor.Email);

        if (professorExistente != null)
        {
            throw new Exception("Este e-mail já existe, tente outro!");
        }

        return await _professorRepositorio.SalvarAsync(professor);
    }

    public async Task DeletarAsync(int professorId)
    {
        var professor = await _professorRepositorio.ObterPorIDAsync(professorId);

        if (professor == null)
            throw new Exception("Professor não existe!");
        

        if (professor.Ativo == false)
            throw new Exception("Professor Inativo!");
        

        professor.Deletar();

        await _professorRepositorio.AtualizarAsync(professor);
    }

    public async Task<IEnumerable<AulaProfessor>> ListarAulasAsync(int professorID)
    {
        var lista = await _professorRepositorio.ListarAulasAsync(professorID);

        if (lista == null || lista.Count() == 0)
            throw new Exception("Nenhuma aula encontrada em nosso sistema!");

        return lista;
    }

    public async Task<int> LogarAsync(string email, string senha)
    {
        if (email == null)
            throw new Exception("Email inválido!");

        var professorDominio = await _professorRepositorio.ObterPorEmailAsync(email);

        if (professorDominio.Senha != senha)
            throw new Exception("Senha inválida!");

        if (professorDominio.Ativo == false)
            throw new Exception("Professor inativo");

        return professorDominio.ProfessorID;
    }

    public async Task<Professor> ObterAsync(int professorID)
    {
        var professor = await _professorRepositorio.ObterPorIDAsync(professorID);

        if (professor == null)
        {
            throw new Exception("Professor não existe");
        }

        return professor;
    }

}
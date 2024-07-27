using ClassNow.Api.Aplicacao.Interface;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Repositorio.Modelos;

namespace ClassNow.Api.Aplicacao.Aplicacao;

public class AlunoAplicacao : IAlunoAplicacao
{
    private readonly IAlunoRepositorio _alunoRepositorio;
    private readonly ICursoRepositorio _cursoRepositorio;

    public AlunoAplicacao(IAlunoRepositorio alunoRepositorio, ICursoRepositorio cursoRepositorio)
    {
        _alunoRepositorio = alunoRepositorio;
        _cursoRepositorio = cursoRepositorio;
    }
   
    public async Task AdicionarAulaAsync(int alunoID, int cursoID)
    {
        var curso = await _cursoRepositorio.ObterPorIDAsync(cursoID);
        
        if (curso == null)
            throw new Exception("Curso não encontrado!");
        
        var aluno = await _alunoRepositorio.ObterPorIDAsync(alunoID);
        
        if (aluno == null)
            throw new Exception("Aluno não encontrado!");
            
        var aula = await _alunoRepositorio.ObterAulaAsync(alunoID, cursoID);

        if (aula != null && aula.Ativo == true)
            throw new Exception("Você já está nesta aula!");

        Aula aulaCriada = new Aula(alunoID, cursoID);

        await _alunoRepositorio.CriarAulaAsync(aulaCriada);
    }

    public async Task AtualizarAsync(Aluno aluno)
    {
        var alunoExistente = await _alunoRepositorio.ObterPorIDAsync(aluno.AlunoID);

        if (alunoExistente == null)
            throw new Exception("Aluno não encontrado!");

        await _alunoRepositorio.AtualizarAsync(aluno);
    }

    public async Task CancelarAulaAsync(int alunoID, int cursoID)
    {
        var aula = await _alunoRepositorio.ObterAulaAsync(alunoID, cursoID);

        if(aula == null)
            throw new Exception("Esta aula não existe");
        
        if (aula.Ativo == false)
            throw new Exception("Aula já cancelada");

        await _alunoRepositorio.CancelarAulaAsync(aula);

    }

    public async Task<int> CriarAsync(Aluno aluno)
    {
        if (aluno == null)
            throw new Exception("Aluno inválido!");
        

        var alunoExistente = await _alunoRepositorio.ObterPorEmailAsync(aluno.Email);

        if (alunoExistente != null)
        {
            throw new Exception("Este e-mail já existe, tente outro!");
        }

        return await _alunoRepositorio.SalvarAsync(aluno);
    }

    public async Task DeletarAsync(int alunoId)
    {
        var aluno = await _alunoRepositorio.ObterPorIDAsync(alunoId);

        if (aluno == null)
            throw new Exception("Aluno não existe!");
        

        if (aluno.Ativo == false)
            throw new Exception("Aluno Inativo!");
        

        aluno.Deletar();

        await _alunoRepositorio.AtualizarAsync(aluno);
    }

    public async Task<IEnumerable<AulaAluno>> ListarAulasAsync(int alunoID)
    {
        var lista = await _alunoRepositorio.ListarAulasAsync(alunoID);

        if (lista == null || lista.Count() == 0)
            throw new Exception("Nenhuma aula encontrada em nosso sistema!");

        return lista;
    }

    public async Task<int> LogarAsync(string email, string senha)
    {
        if (email == null)
            throw new Exception("Email inválido!");

        var alunoDominio = await _alunoRepositorio.ObterPorEmailAsync(email);

        if (alunoDominio.Senha != senha)
            throw new Exception("Senha inválida!");

        if (alunoDominio.Ativo == false)
            throw new Exception("Aluno inativo");

        return alunoDominio.AlunoID;
    }

    public async Task<Aluno> ObterAsync(int alunoId)
    {
        var aluno = await _alunoRepositorio.ObterPorIDAsync(alunoId);

        if (aluno == null)
        {
            throw new Exception("Aluno não existe");
        }

        return aluno;
    }

}
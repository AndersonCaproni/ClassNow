using Dapper;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Contexto;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Repositorio.Modelos;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ClassNow.Api.Repositorio.Repositorio;

public class AlunoRepositorio : IAlunoRepositorio
{
    private readonly ClassNowContexto _contexto;

    public AlunoRepositorio(ClassNowContexto contexto)
    {
        _contexto = contexto;
    }

    public async Task AtualizarAsync(Aluno aluno)
    {
        _contexto.Update(aluno);
        await _contexto.SaveChangesAsync();
    }

    public async Task CancelarAulaAsync(Aula aula)
    {
        aula.Deletar();
        _contexto.Aulas.Update(aula);
        await _contexto.SaveChangesAsync();
    }

    public async Task CriarAulaAsync(Aula aula)
    {
        await _contexto.Aulas.AddAsync(aula);
        await _contexto.SaveChangesAsync();
    }

    public async Task<IEnumerable<AulaAluno>> ListarAulasAsync(int alunoID)
    {
        const string sql = @"
        SELECT au.AulaID, p.ProfessorID, p.Nome, c.Categoria, c.Descricao, c.CursoID
        FROM Aluno AS al 
        INNER JOIN Aula AS au ON al.AlunoID = au.AlunoID 
        INNER JOIN Curso AS c ON au.CursoID = c.CursoID 
        INNER JOIN Professor AS p ON c.ProfessorID = p.ProfessorID 
        WHERE al.AlunoID = @AlunoID
        AND
        au.Ativo = 1
        AND
		c.Ativo = 1";

        using (IDbConnection connection = _contexto.CreateConnection())
        {
            return await connection.QueryAsync<AulaAluno>(sql, new { AlunoID = alunoID });
        }
    }

    public async Task<Aula> ObterAulaAsync(int alunoID, int cursoID)
    {
        return await _contexto.Aulas.Where(x => x.AlunoID == alunoID && x.CursoID == cursoID).FirstOrDefaultAsync();
    }

    public Task<Aluno> ObterPorIDAsync(int alunoID)
    {
        return _contexto.Alunos.Where(x => x.AlunoID == alunoID)
                               .FirstOrDefaultAsync();
    }

    public Task<Aluno> ObterPorEmailAsync(string email)
    {
        return _contexto.Alunos.Where(x => x.Email == email)
                               .FirstOrDefaultAsync();
    }

    public async Task<int> SalvarAsync(Aluno aluno)
    {
        await _contexto.Alunos.AddAsync(aluno);
        await _contexto.SaveChangesAsync();
        return aluno.AlunoID;
    }

}
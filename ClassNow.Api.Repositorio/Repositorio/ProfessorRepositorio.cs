using Dapper;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Contexto;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Repositorio.Modelos;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ClassNow.Api.Repositorio.Repositorio;

public class ProfessorRepositorio : IProfessorRepositorio
{
    private readonly ClassNowContexto _contexto;

    public ProfessorRepositorio(ClassNowContexto contexto)
    {
        _contexto = contexto;
    }

    public async Task AtualizarAsync(Professor professor)
    {
        using (IDbConnection connection = _contexto.CreateConnection())
        {
            var parameters = new
            {
                ProfessorID = professor.ProfessorID,
                Nome = professor.Nome,
                Email = professor.Email,
                Telefone = professor.Telefone,
                Senha = professor.Senha,
                Cidade = professor.Cidade,
                Estado = professor.Estado,
                Ativo = professor.Ativo
            };

            await connection.ExecuteAsync("AtualizarProfessor", parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task CancelarAulaAsync(Aula aula)
    {
        aula.Deletar();
        _contexto.Aulas.Update(aula);
        await _contexto.SaveChangesAsync();
    }

    public async Task<IEnumerable<AulaProfessor>> ListarAulasAsync(int professorID)
    {
        const string storedProcedure = "ListarAulasPorProfessor";

        var parameters = new { ProfessorID = professorID };

        using var connection = _contexto.Database.GetDbConnection();

        return await connection.QueryAsync<AulaProfessor>(storedProcedure, parameters, commandType: CommandType.StoredProcedure);

    }

    public async Task<Aula> ObterAulaAsync(int alunoID, int cursoID)
    {
        return await _contexto.Aulas.Where(x => x.AlunoID == alunoID && x.CursoID == cursoID).FirstOrDefaultAsync();

    }

    public async Task<Professor> ObterPorIDAsync(int professorID)
    {
        return await _contexto.Professores.Where(x => x.ProfessorID == professorID).FirstOrDefaultAsync();
    }

    public async Task<Professor> ObterPorEmailAsync(string email)
    {
        return await _contexto.Professores.Where(x => x.Email == email).FirstOrDefaultAsync();
    }

    public async Task<int> SalvarAsync(Professor professor)
    {
        const string sql = @"
    INSERT INTO Professor (Nome, Email, Senha, Telefone, Estado, Cidade, Ativo)
    OUTPUT INSERTED.ProfessorID
    VALUES (@NomeProfessor, @EmailProfessor, @SenhaProfessor, @TelefoneProfessor, @EstadoProfessor, @CidadeProfessor, @AtivoProfessor)";

        using (IDbConnection connection = _contexto.CreateConnection())
        {
            return await connection.ExecuteScalarAsync<int>(sql, new
            {
                NomeProfessor = professor.Nome,
                EmailProfessor = professor.Email,
                SenhaProfessor = professor.Senha,
                TelefoneProfessor = professor.Telefone,
                EstadoProfessor = professor.Estado,
                CidadeProfessor = professor.Cidade,
                AtivoProfessor = professor.Ativo
            });
        }
    }

}
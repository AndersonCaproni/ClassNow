using Dapper;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Contexto;
using ClassNow.Api.Repositorio.Interface;
using ClassNow.Api.Repositorio.Modelos;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ClassNow.Api.Repositorio.Repositorio;

public class CursoRepositorio : ICursoRepositorio
{
    private readonly ClassNowContexto _contexto;

    public CursoRepositorio(ClassNowContexto contexto)
    {
        _contexto = contexto;
    }

    public async Task AtualizarAsync(Curso curso)
    {
        using (IDbConnection connection = _contexto.CreateConnection())
        {
            var parameters = new
            {
                CursoID = curso.CursoID,
                Categoria = curso.Categoria,
                Descricao = curso.Descricao,
                Valor = curso.Valor,
                Ativo = curso.Ativo
            };

            await connection.ExecuteAsync("AtualizarCurso", parameters, commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<IEnumerable<CursoCompleto>> ListarCursosAsync(bool ativo)
    {
        const string sql = @"
        SELECT c.CursoID, c.Categoria, c.Descricao, c.Valor, p.ProfessorID, p.Nome
        FROM Curso AS c 
        INNER JOIN Professor AS p ON c.ProfessorID = p.ProfessorID 
        WHERE c.Ativo = @Ativo AND p.Ativo = 1";

        using (IDbConnection connection = _contexto.CreateConnection())
        {
            return await connection.QueryAsync<CursoCompleto>(sql, new { Ativo = ativo });
        }
    }

    public async Task<IEnumerable<Curso>> ListarPorProfessorAsync(int professorID)
    {
        return await _contexto.Cursos.Where(x => x.ProfessorID == professorID && x.Ativo == true).ToListAsync();
    }

    public async Task<Curso> ObterPorIDAsync(int cursoId)
    {
        return await _contexto.Cursos.Where(x => x.CursoID == cursoId)
                                     .FirstOrDefaultAsync();
    }

    public async Task<int> SalvarAsync(Curso curso)
    {
        await _contexto.Cursos.AddAsync(curso);
        await _contexto.SaveChangesAsync();
        return curso.CursoID;
    }
}
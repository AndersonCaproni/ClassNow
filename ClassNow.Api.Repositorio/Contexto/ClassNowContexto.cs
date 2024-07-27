using System.Data;
using Microsoft.EntityFrameworkCore;
using ClassNow.Api.Dominio.Entidades;
using ClassNow.Api.Repositorio.Configuracoes;
using Microsoft.Data.SqlClient;

namespace ClassNow.Api.Repositorio.Contexto;

public class ClassNowContexto : DbContext
{
    private readonly DbContextOptions _options;
    public string StringConexao = "Server=Anderson\\SQLEXPRESS;Database=ClassNow;Trusted_Connection=True;TrustServerCertificate=True;Connection Timeout=100;";

    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Professor> Professores { get; set; }
    public DbSet<Curso> Cursos { get; set; }
    public DbSet<Aula> Aulas { get; set; }

    public ClassNowContexto(DbContextOptions options) : base(options)
    {
        _options = options;
    }

    public ClassNowContexto() { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (_options == null)
        {
            optionsBuilder.UseSqlServer(StringConexao);
        }
    }

    public IDbConnection CreateConnection()
    {
        return new SqlConnection(StringConexao);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AlunoConfiguracao());
        modelBuilder.ApplyConfiguration(new ProfessorConfiguracao());
        modelBuilder.ApplyConfiguration(new CursoConfiguracao());
        modelBuilder.ApplyConfiguration(new AulaConfiguracao());
    }
}
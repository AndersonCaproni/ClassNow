using Microsoft.EntityFrameworkCore;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassNow.Api.Repositorio.Configuracoes;

public class CursoConfiguracao : IEntityTypeConfiguration<Curso>
{
    public void Configure(EntityTypeBuilder<Curso> builder)
    {
        builder.ToTable("Curso").HasKey(x => x.CursoID);

        builder.Property(nameof(Curso.CursoID)).HasColumnName("CursoID").IsRequired(true);
        builder.Property(nameof(Curso.ProfessorID)).HasColumnName("ProfessorID").IsRequired(true);
        builder.Property(nameof(Curso.Categoria)).HasColumnName("Categoria").IsRequired(true).HasMaxLength(50);
        builder.Property(nameof(Curso.Descricao)).HasColumnName("Descricao").IsRequired(true).HasMaxLength(400);
        builder.Property(nameof(Curso.Valor)).HasColumnName("Valor").IsRequired(true).HasColumnType("decimal");
        builder.Property(nameof(Curso.Ativo)).HasColumnName("Ativo").IsRequired(true);

        builder.HasOne(x => x.Professor)
               .WithMany(x => x.Cursos)
               .HasForeignKey(x => x.ProfessorID)
               .OnDelete(DeleteBehavior.Restrict); 
    }
}
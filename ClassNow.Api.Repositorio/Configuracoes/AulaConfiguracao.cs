using Microsoft.EntityFrameworkCore;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassNow.Api.Repositorio.Configuracoes;

public class AulaConfiguracao : IEntityTypeConfiguration<Aula>
{
    public void Configure(EntityTypeBuilder<Aula> builder)
    {
        builder.ToTable("Aula").HasKey(x => x.AulaID);

        builder.Property(nameof(Aula.AulaID)).HasColumnName("AulaID").IsRequired(true);
        builder.Property(nameof(Aula.CursoID)).HasColumnName("CursoID").IsRequired(true); 
        builder.Property(nameof(Aula.AlunoID)).HasColumnName("AlunoID").IsRequired(true); 
        builder.Property(nameof(Aula.Ativo)).HasColumnName("Ativo").IsRequired(true); 


        builder.HasOne(x => x.Curso)
               .WithMany(x => x.Aulas)
               .HasForeignKey(x => x.CursoID)
               .OnDelete(DeleteBehavior.Restrict);  

        builder.HasOne(x => x.Aluno)
               .WithMany(x => x.Aulas)
               .HasForeignKey(x => x.AlunoID)
               .OnDelete(DeleteBehavior.Restrict);  
    }
} 
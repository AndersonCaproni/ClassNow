using Microsoft.EntityFrameworkCore;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassNow.Api.Repositorio.Configuracoes;

public class ProfessorConfiguracao : IEntityTypeConfiguration<Professor>
{
    public void Configure(EntityTypeBuilder<Professor> builder)
    {
        builder.ToTable("Professor").HasKey(x => x.ProfessorID);

        builder.Property(nameof(Professor.ProfessorID)).HasColumnName("ProfessorID").IsRequired(true);
        builder.Property(nameof(Professor.Nome)).HasColumnName("Nome").IsRequired(true).HasMaxLength(100);
        builder.Property(nameof(Professor.Email)).HasColumnName("Email").IsRequired(true).HasMaxLength(200);
        builder.Property(nameof(Professor.Senha)).HasColumnName("Senha").IsRequired(true).HasMaxLength(30);
        builder.Property(nameof(Professor.Telefone)).HasColumnName("Telefone").IsRequired(true).HasMaxLength(11);
        builder.Property(nameof(Professor.Estado)).HasColumnName("Estado").IsRequired(true).HasMaxLength(30);
        builder.Property(nameof(Professor.Cidade)).HasColumnName("Cidade").IsRequired(true).HasMaxLength(30);
        builder.Property(nameof(Professor.Ativo)).HasColumnName("Ativo").IsRequired(true);
    }
}
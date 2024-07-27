using Microsoft.EntityFrameworkCore;
using ClassNow.Api.Dominio.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClassNow.Api.Repositorio.Configuracoes;

public class AlunoConfiguracao : IEntityTypeConfiguration<Aluno>
{
    public void Configure(EntityTypeBuilder<Aluno> builder)
    {
        builder.ToTable("Aluno").HasKey(x => x.AlunoID);

        builder.Property(nameof(Aluno.AlunoID)).HasColumnName("AlunoID").IsRequired(true);
        builder.Property(nameof(Aluno.Nome)).HasColumnName("Nome").IsRequired(true).HasMaxLength(100);
        builder.Property(nameof(Aluno.Email)).HasColumnName("Email").IsRequired(true).HasMaxLength(200);
        builder.Property(nameof(Aluno.Senha)).HasColumnName("Senha").IsRequired(true).HasMaxLength(30);
        builder.Property(nameof(Aluno.Telefone)).HasColumnName("Telefone").IsRequired(true).HasMaxLength(11);
        builder.Property(nameof(Aluno.Ativo)).HasColumnName("Ativo").IsRequired(true);
    }
}
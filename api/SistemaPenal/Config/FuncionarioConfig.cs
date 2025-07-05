using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaPenal.Entities;

namespace SistemaPenal.Config;

internal class FuncionarioConfiguration : IEntityTypeConfiguration<Funcionario>
{
    public void Configure(EntityTypeBuilder<Funcionario> builder)
    {
        builder.ToTable("Funcionarios").HasKey(x => x.Id);

        builder.Property(x => x.Id).IsRequired();

        builder.Property(x => x.Nome).HasColumnName("Nome").HasMaxLength(100).IsRequired();
        builder.Property(x => x.DataNascimento).HasColumnName("DataNascimento").IsRequired();
        builder.Property(x => x.Cpf).HasColumnName("CPF").IsRequired();
        builder.Property(x => x.Email).HasColumnName("E-mail").HasMaxLength(100).IsRequired();
        builder.Property(x => x.Senha).HasColumnName("Senha").HasMaxLength(50).IsRequired();
        builder.Property(x => x.Papel).HasColumnName("Papel").IsRequired();
    }
}
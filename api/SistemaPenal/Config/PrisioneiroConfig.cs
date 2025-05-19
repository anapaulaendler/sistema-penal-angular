using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaPenal.Entities;

namespace SistemaPenal.Config;

internal class PrisioneiroConfiguration : IEntityTypeConfiguration<Prisioneiro>
{
    public void Configure(EntityTypeBuilder<Prisioneiro> builder)
    {
        builder.ToTable("Prisioneiros").HasKey(x => x.Id);

        builder.Property(x => x.Id).IsRequired();

        builder.Property(x => x.Nome).HasColumnName("Nome").HasMaxLength(100).IsRequired();
        builder.Property(x => x.DataNascimento).HasColumnName("DataNascimento").IsRequired();
        builder.Property(x => x.Cpf).HasColumnName("CPF").HasMaxLength(11).IsFixedLength().IsRequired();
        builder.Property(x => x.DiaDeChegada).HasColumnName("DiaDeChegada").IsRequired();
        builder.Property(x => x.DiaDeSaidaOriginal).HasColumnName("DiaDeSaidaOriginal").IsRequired();
        builder.Property(x => x.DiaDeSaidaAtualizado).HasColumnName("DiaDeSaidaAtualizado").IsRequired();
        builder.Property(x => x.ContadorDeLivros).HasColumnName("ContadorDeLivros").IsRequired();
        builder.Property(x => x.AnoAtual).HasColumnName("AnoAtual").IsRequired();

        builder.HasMany(x => x.Livros).WithOne(x => x.Prisioneiro).IsRequired();
        builder.HasMany(x => x.Estudos).WithOne(x => x.Prisioneiro).IsRequired();
        builder.HasMany(x => x.DiasDeTrabalho).WithOne(x => x.Prisioneiro).IsRequired();
    }
}
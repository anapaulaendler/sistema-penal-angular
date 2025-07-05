using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaPenal.Entities;

namespace SistemaPenal.Config;

internal class DayOfWorkConfiguration : IEntityTypeConfiguration<DiaDeTrabalho>
{
    public void Configure(EntityTypeBuilder<DiaDeTrabalho> builder)
    {
        builder.ToTable("DiasDeTrabalho").HasKey(x => x.Id);

        builder.Property(x => x.Id).IsRequired();
        builder.Property(x => x.PrisioneiroId).IsRequired();

        builder.Property(x => x.Data).HasColumnName("Data").IsRequired();
        builder.Property(x => x.Descricao).HasColumnName("Descricao").IsRequired();
        
        builder.HasOne(x => x.Prisioneiro).WithMany(x => x.DiasDeTrabalho).IsRequired();
    }
}
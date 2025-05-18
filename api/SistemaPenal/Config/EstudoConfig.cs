using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaPenal.Entities;

namespace SistemaPenal.Config;

internal class EstudoConfiguration : IEntityTypeConfiguration<Estudo>
{
    public void Configure(EntityTypeBuilder<Estudo> builder)
    {
        builder.ToTable("Estudos").HasKey(x => x.Id);

        builder.Property(x => x.Id).IsRequired();
        builder.Property(x => x.PrisioneiroId).IsRequired();

        builder.Property(x => x.Data).HasColumnName("Data").IsRequired();
        builder.Property(x => x.Materia).HasColumnName("Materia").IsRequired();
        
        builder.HasOne(x => x.Prisioneiro).WithMany(x => x.Estudos).IsRequired();
    }
}
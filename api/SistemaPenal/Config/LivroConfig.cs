using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SistemaPenal.Entities;

namespace SistemaPenal.Config;

internal class LivroConfig : IEntityTypeConfiguration<Livro>
{
    public void Configure(EntityTypeBuilder<Livro> builder)
    {
        builder.ToTable("Livros").HasKey(x => x.Id);

        builder.Property(x => x.Id).IsRequired();
        builder.Property(x => x.PrisioneiroId).IsRequired();

        builder.Property(x => x.Data).IsRequired();
        builder.Property(x => x.Isbn).HasMaxLength(11).IsFixedLength().IsRequired();
        
        builder.HasOne(x => x.Prisioneiro).WithMany(x => x.Livros).IsRequired();
    }
}
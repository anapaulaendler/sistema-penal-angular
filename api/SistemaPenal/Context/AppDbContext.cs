using Microsoft.EntityFrameworkCore;
using SistemaPenal.Entities;

namespace SistemaPenal.Context;

public class AppDbContext : DbContext
{
    public required DbSet<DiaDeTrabalho> DiaDeTrabalho { get; set; }
    public required DbSet<DiaDeTrabalho> DiaDeEstudo { get; set; }
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}
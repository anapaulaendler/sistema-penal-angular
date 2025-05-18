using Microsoft.EntityFrameworkCore;
using SistemaPenal.Entities;

namespace SistemaPenal.Context;

public class AppDbContext : DbContext
{
    public required DbSet<Prisioneiro> Prisioneiros { get; set; }
    public required DbSet<Funcionario> Funcionarios { get; set; }
    public required DbSet<DiaDeTrabalho> DiasDeTrabalho { get; set; }
    public required DbSet<Estudo> Estudos { get; set; }
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
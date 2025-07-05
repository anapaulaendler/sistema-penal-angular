using Microsoft.EntityFrameworkCore;
using SistemaPenal.Entities;

namespace SistemaPenal.Context;

public class AppDbContext : DbContext
{
    public DbSet<Prisioneiro> Prisioneiros { get; set; } = null!;
    public DbSet<Funcionario> Funcionarios { get; set; } = null!;
    public DbSet<DiaDeTrabalho> DiasDeTrabalho { get; set; } = null!;
    public DbSet<Estudo> Estudos { get; set; } = null!;
    public DbSet<Livro> Livros { get; set; } = null!;
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
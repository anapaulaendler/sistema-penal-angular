using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Enums;
using System;
using System.Linq;

namespace SistemaPenal.Seed
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());

            if (!context.Prisioneiros.Any())
            {
                context.Prisioneiros.AddRange(
                    new Prisioneiro
                    {
                        Id = Guid.NewGuid(),
                        Nome = "João dos Santos",
                        DataNascimento = new DateTime(1985, 2, 14),
                        Cpf = "12345678900",
                        ContadorDeLivros = 5,
                        AnoAtual = DateTime.Now.Year,
                        DiaDeChegada = DateTime.Now.AddMonths(-8),
                        DiaDeSaidaOriginal = DateTime.Now.AddYears(2),
                        DiaDeSaidaAtualizado = DateTime.Now.AddYears(2)
                    },
                    new Prisioneiro
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Maria Oliveira",
                        DataNascimento = new DateTime(1990, 7, 3),
                        Cpf = "98765432111",
                        ContadorDeLivros = 2,
                        AnoAtual = DateTime.Now.Year,
                        DiaDeChegada = DateTime.Now.AddMonths(-3),
                        DiaDeSaidaOriginal = DateTime.Now.AddYears(1).AddMonths(6),
                        DiaDeSaidaAtualizado = DateTime.Now.AddYears(1).AddMonths(6)
                    }
                );
            }

            if (!context.Funcionarios.Any())
                {
                    context.Funcionarios.AddRange(
                    new Funcionario
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Carlos Administrador",
                        DataNascimento = new DateTime(1980, 6, 15),
                        Cpf = "11122233344",
                        Email = "admin@sistemapenal.com",
                        Senha = "admin123",
                        Papel = Role.Admin
                    },
                    new Funcionario
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Lucia General",
                        DataNascimento = new DateTime(1992, 11, 2),
                        Cpf = "55566677788",
                        Email = "lucia@sistemapenal.com",
                        Senha = "general123",
                        Papel = Role.General
                    }
                );
            }

            context.SaveChanges();
        }
    }
}

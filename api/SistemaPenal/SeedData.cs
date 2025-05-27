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
                    // ana: a fim de testes, o ContadorDeLivros está sendo inicializado já com um valor
                    new Prisioneiro
                    {
                        Id = Guid.NewGuid(),
                        Nome = "João dos Santos",
                        DataNascimento = new DateTime(1985, 2, 14),
                        Cpf = "123.456.789-00",
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
                        Cpf = "987.654.321-11",
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
                        Cpf = "111.222.333-44",
                        Email = "admin@sistemapenal.com",
                        Senha = "admin123",
                        Papel = Role.Admin
                    },
                    new Funcionario
                    {
                        Id = Guid.NewGuid(),
                        Nome = "Lucia General",
                        DataNascimento = new DateTime(1992, 11, 2),
                        Cpf = "555.666.777-88",
                        Email = "lucia@sistemapenal.com",
                        Senha = "general123", // ⚠️ Hash it!
                        Papel = Role.General
                    }
                );
            }

            context.SaveChanges();
        }
    }
}

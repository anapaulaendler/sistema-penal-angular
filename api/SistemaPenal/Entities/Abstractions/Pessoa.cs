using System.ComponentModel.DataAnnotations;
using SistemaPenal.Interfaces;

namespace SistemaPenal.Entities.Abstractions;

public abstract class Pessoa : IEntity
{
    public Guid Id { get; set; }
    [Required]
    public string Nome { get; set; } = null!;
    [Required]
    public DateTime DataNascimento { get; set; }
    [Required]
    public string Cpf { get; set; } = null!;
}
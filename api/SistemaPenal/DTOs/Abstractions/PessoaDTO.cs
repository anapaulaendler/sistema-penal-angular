using System.ComponentModel.DataAnnotations;

namespace SistemaPenal.DTOs;

public abstract class PessoaDTO : IDTO
{
    [Required]
    public string Nome { get; set; } = null!;
    [Required]
    public DateTime DataNascimento { get; set; }
    [Required]
    public string Cpf { get; set; } = null!;
}

public abstract class PessoaCreateDTO : IDTO
{
    public override Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public string Nome { get; set; } = null!;
    [Required]
    public DateTime DataNascimento { get; set; }
    [Required]
    public string Cpf { get; set; } = null!;
}

public abstract class PessoaUpdateDTO : IDTO
{
}
using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Enums;

namespace SistemaPenal.Entities;

public class Funcionario : Pessoa
{
    public required string Email { get; set; }
    public Role Papel { get; set; }
    public required string Senha { get; set; }
}
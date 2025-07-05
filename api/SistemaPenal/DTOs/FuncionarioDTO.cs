using SistemaPenal.Enums;

namespace SistemaPenal.DTOs;

public class FuncionarioDTO : PessoaDTO
{
    public required string Email { get; set; }
    public Role Papel { get; set; }
    public required string Senha { get; set; }
}

public class FuncionarioCreateDTO : PessoaCreateDTO
{
    public required string Email { get; set; }
    public Role Papel { get; set; }
    public required string Senha { get; set; }
}

public class FuncionarioUpdateDTO : PessoaUpdateDTO
{
    public required string Nome { get; set; }
    public required string Email { get; set; }
    public Role Papel { get; set; }
    public required string Senha { get; set; }
}

public class FuncionarioLoginDTO
{
    public required string Email { get; set; }
    public required string Senha { get; set; }
}
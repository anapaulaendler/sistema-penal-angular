using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces.Services.Abstractions;

namespace SistemaPenal.Interfaces.Services.Entities;

public interface IFuncionarioService : IPessoaServiceBase<Funcionario, FuncionarioDTO, FuncionarioCreateDTO, FuncionarioUpdateDTO>
{
}
using SistemaPenal.Entities;
using SistemaPenal.Interfaces.Repositories.Abstractions;

namespace SistemaPenal.Interfaces.Repositories.Entities;

public interface IFuncionarioRepository : IPessoaRepositoryBase<Funcionario>
{
    Task<Funcionario> GetFuncionarioByEmailAsync(string userEmail);
}
using SistemaPenal.Entities.Abstractions;

namespace SistemaPenal.Interfaces.Repositories.Abstractions;

public interface IPessoaRepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : Pessoa
{
    Task <TEntity> GetPessoaByCpfAsync(string cpf, CancellationToken cancellation = default);
}
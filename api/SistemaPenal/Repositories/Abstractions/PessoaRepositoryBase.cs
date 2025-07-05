using Microsoft.EntityFrameworkCore;
using SistemaPenal.Context;
using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Interfaces.Repositories.Abstractions;
using SistemaPenal.Repositories.Abstractions;

namespace SistemaPenal.Repositories;

public class PessoaRepositoryBase<TEntity> : RepositoryBase<TEntity>, IPessoaRepositoryBase<TEntity> where TEntity : Pessoa
{
    public PessoaRepositoryBase(AppDbContext appContext) : base(appContext)
    {
    }

    public async Task<TEntity> GetPessoaByCpfAsync(string cpf, CancellationToken cancellation = default)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(x => x.Cpf == cpf);

        if (entity is null)
        {
            throw new KeyNotFoundException();
        }

        return entity;
    }
}
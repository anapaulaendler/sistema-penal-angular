using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Repositories.Abstractions;
using SistemaPenal.Context;

namespace SistemaPenal.Repositories.Base;

public class AtividadeRepositoryBase<TEntity> : RepositoryBase<TEntity>, IAtividadeRepositoryBase<TEntity> 
where TEntity : Atividade
{
    public AtividadeRepositoryBase(AppDbContext appContext) : base(appContext)
    {
    }

}

internal interface IAtividadeRepositoryBase<TEntity> where TEntity : Atividade
{
}
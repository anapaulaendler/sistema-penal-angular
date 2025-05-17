using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Repositories.Abstractions;
using SistemaPenal.Context;
using SistemaPenal.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SistemaPenal.Repositories.Base;

public class AtividadeRepositoryBase<TEntity> : RepositoryBase<TEntity>, IAtividadeRepositoryBase<TEntity> 
where TEntity : Atividade
{
    public AtividadeRepositoryBase(AppDbContext appContext) : base(appContext)
    {
    }

    public async Task<List<TEntity>> GetStudyActivitiesByPrisonerIdAsync(Guid prisioneiroId, CancellationToken cancellation = default)
    {
        List<TEntity> atividades = [];
        atividades = await _dbSet.Where(x => x.PrisioneiroId == prisioneiroId).ToListAsync();

        return atividades;
    }
}
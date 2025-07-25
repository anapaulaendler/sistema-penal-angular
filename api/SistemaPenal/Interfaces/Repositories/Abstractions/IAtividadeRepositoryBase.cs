using SistemaPenal.Interfaces.Repositories.Abstractions;
using Atividade = SistemaPenal.Entities.Abstractions.Atividade;

namespace SistemaPenal.Interfaces;

public interface IAtividadeRepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : Atividade
{
    public Task<List<TEntity>> GetStudyActivitiesByPrisonerIdAsync(Guid prisioneiroId, CancellationToken cancellation = default);
}
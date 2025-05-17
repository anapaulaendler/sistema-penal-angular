using SistemaPenal.Entities;
using SistemaPenal.Interfaces.Repositories.Abstractions;

namespace PenalSystem.Domain.Interfaces;

public interface IEstudoRepository : IRepositoryBase<Estudo>
{
    Task<List<Estudo>> GetAtividadesDeEstudoPeloPrisioneiroIdAsync(Guid prisonerId, CancellationToken cancellation = default);
}
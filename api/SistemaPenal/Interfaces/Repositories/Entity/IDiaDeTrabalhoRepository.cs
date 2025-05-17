using SistemaPenal.Entities;
using SistemaPenal.Interfaces.Repositories.Abstractions;

namespace PenalSystem.Domain.Interfaces;

public interface IDiaDeTrabalhoRepository : IRepositoryBase<DiaDeTrabalho>
{
    Task<List<DiaDeTrabalho>> GetAtividadesDoDiaDeTrabalhoPeloPrisonerIdAsync(Guid prisonerId, CancellationToken cancellation = default);
}
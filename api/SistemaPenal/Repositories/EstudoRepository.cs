using Microsoft.EntityFrameworkCore;
using PenalSystem.Domain.Interfaces;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Repositories.Abstractions;

namespace PenalSystem.Infra.Data.Repositories;

public class EstudoRepository : RepositoryBase<Estudo>, IEstudoRepository
{
    public EstudoRepository(AppDbContext appContext) : base(appContext)
    {
    }

    public async Task<List<Estudo>> GetAtividadesDeEstudoPeloPrisioneiroIdAsync(Guid PrisioneiroId, CancellationToken cancellation = default)
    {
        List<Estudo> estudos = [];
        estudos = await _dbSet.Where(x => x.PrisioneiroId == PrisioneiroId).ToListAsync();

        return estudos;
    }
}
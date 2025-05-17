using Microsoft.EntityFrameworkCore;
using PenalSystem.Domain.Interfaces;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Repositories.Abstractions;

namespace PenalSystem.Infra.Data.Repositories;

public class DiaDeTrabalhoRepository : RepositoryBase<DiaDeTrabalho>, IDiaDeTrabalhoRepository
{
    public DiaDeTrabalhoRepository(AppDbContext appContext) : base(appContext)
    {
    }

    public async Task<List<DiaDeTrabalho>> GetAtividadesDoDiaDeTrabalhoPeloPrisonerIdAsync(Guid PrisioneiroId, CancellationToken cancellation = default)
    {
        List<DiaDeTrabalho> DiasDeTrabalho = [];
        DiasDeTrabalho = await _dbSet.Where(x => x.PrisioneiroId == PrisioneiroId).ToListAsync();

        return DiasDeTrabalho;
    }
}
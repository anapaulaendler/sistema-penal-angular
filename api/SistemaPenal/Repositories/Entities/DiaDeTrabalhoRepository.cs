using PenalSystem.Domain.Interfaces.Repositories.Entities;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Repositories.Abstractions;

namespace PenalSystem.Infra.Data.Repositories.Entities;

public class DiaDeTrabalhoRepository : RepositoryBase<DiaDeTrabalho>, IDiaDeTrabalhoRepository
{
    public DiaDeTrabalhoRepository(AppDbContext appContext) : base(appContext)
    {
    }
}
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Repositories.Base;

namespace SistemaPenal.Repositories.Entities;

public class DiaDeTrabalhoRepository : AtividadeRepositoryBase<DiaDeTrabalho>, IDiaDeTrabalhoRepository
{
    public DiaDeTrabalhoRepository(AppDbContext appContext) : base(appContext)
    {
    }
}
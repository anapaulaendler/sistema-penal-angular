using SistemaPenal.Entities;
using SistemaPenal.Context;
using SistemaPenal.Interfaces.Repositories.Entities;

namespace SistemaPenal.Repositories.Entities;

public class PrisioneiroRepository : PessoaRepositoryBase<Prisioneiro>, IPrisioneiroRepository
{
    public PrisioneiroRepository(AppDbContext appContext) : base(appContext)
    {
    }
}
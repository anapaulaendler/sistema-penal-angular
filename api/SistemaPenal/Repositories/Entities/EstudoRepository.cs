using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Repositories.Base;

namespace SistemaPenal.Repositories.Entities;

public class EstudoRepository : AtividadeRepositoryBase<Estudo>, IEstudoRepository
{
    public EstudoRepository(AppDbContext appContext) : base(appContext)
    {
    }
}
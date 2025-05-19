using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Context;
using SistemaPenal.Entities;
using SistemaPenal.Repositories.Base;

namespace SistemaPenal.Repositories.Entities;

public class LivroRepository : AtividadeRepositoryBase<Livro>, ILivroRepository
{
    public LivroRepository(AppDbContext appContext) : base(appContext)
    {
    }
}
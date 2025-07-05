using Microsoft.EntityFrameworkCore;
using SistemaPenal.Entities;
using SistemaPenal.Context;
using SistemaPenal.Interfaces.Repositories.Entities;

namespace SistemaPenal.Repositories.Entities;

public class FuncionarioRepository : PessoaRepositoryBase<Funcionario>, IFuncionarioRepository
{
    public FuncionarioRepository(AppDbContext appContext) : base(appContext)
    {
    }
    
    public async Task<Funcionario> GetFuncionarioByEmailAsync(string userEmail)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(x => x.Email == userEmail);

        if (entity is null)
        {
            throw new KeyNotFoundException();
        }

        return entity;
    }
}
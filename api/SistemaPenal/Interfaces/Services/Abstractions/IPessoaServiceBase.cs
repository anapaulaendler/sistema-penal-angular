using SistemaPenal.DTOs;
using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Extensions;

namespace SistemaPenal.Interfaces.Services.Abstractions;

public interface IPessoaServiceBase<TEntity, TDTO, TCreateDTO, TUpdateDTO> where TEntity : Pessoa
where TDTO : PessoaDTO where TCreateDTO : PessoaCreateDTO where TUpdateDTO : class
{
    Task<OperationResult<TEntity>> CreatePessoaAsync(TCreateDTO createDTO, CancellationToken cancellation = default);
    Task<TDTO> GetPessoaByIdAsync(Guid id, CancellationToken cancellation = default);
    Task<TDTO> GetPessoaByCpfAsync(string cpf, CancellationToken cancellation = default);
    Task<OperationResult<TEntity>> UpdatePessoaAsync(TUpdateDTO updateDTO, CancellationToken cancellation = default);
    Task<OperationResult<TEntity>> DeletePessoaAsync(Guid id, CancellationToken cancellation = default); 
    Task<List<TDTO>> GetPessoasAsync(CancellationToken cancellation = default);
}
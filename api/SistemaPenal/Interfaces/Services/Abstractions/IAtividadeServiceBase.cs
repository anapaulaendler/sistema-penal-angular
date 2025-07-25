using SistemaPenal.DTOs;
using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Extensions;

namespace SistemaPenal.Interfaces.Base;

public interface IAtividadeServiceBase<TEntity, TDTO, TCreateDTO> where TEntity : Atividade, IEntity 
where TDTO : AtividadeDTO where TCreateDTO : AtividadeCreateDTO
{
    Task<OperationResult<TEntity>> CriarAtividadeAsync(TCreateDTO entity, CancellationToken cancellation = default);
    Task<List<TDTO>> GetAtividadesAsync(CancellationToken cancellation = default);
    Task<List<TDTO>> GetAtividadesPrisioneiroAsync(Guid prisioneiroId, CancellationToken cancellation = default);
}
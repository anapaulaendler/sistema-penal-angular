using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Enums;
using SistemaPenal.Extensions;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Base;
using SistemaPenal.Entities.Abstractions;

namespace SistemaPenal.Services.Base;

public abstract class AtividadeService<TEntity, TDTO, TCreateDTO, TRepository> : IAtividadeServiceBase<TEntity, TDTO, TCreateDTO>  
where TEntity : Atividade, IEntity where TDTO : AtividadeDTO where TCreateDTO : AtividadeCreateDTO where TRepository : IAtividadeRepositoryBase<TEntity>
{
    protected readonly TRepository _repository;
    protected readonly IUnitOfWork _uow;
    protected readonly IMapper _mapper;

    protected AtividadeService(IUnitOfWork uow, IMapper mapper, TRepository repository)
    {
        _uow = uow;
        _mapper = mapper;
        _repository = repository;
    }

    public async Task<List<TDTO>> GetAtividadesAsync(CancellationToken cancellation = default)
    {
        var books = await _repository.GetAsync(null, cancellation);
        return books.Select(e => _mapper.Map<TDTO>(e)).ToList();
    }

    // virtual porque Book tem lógica individual (esquema do Year)
    public virtual async Task<OperationResult<TEntity>> CriarAtividadeAsync(TCreateDTO entityCreateDTO, CancellationToken cancellation = default)
    {
        var result = new OperationResult<TEntity>();

        if (entityCreateDTO is null || entityCreateDTO.PrisioneiroId == Guid.Empty)
        {
            return new OperationResult<TEntity>(
                new ResultMessage("Invalid activity creation request.", ResultTypes.Error));
        }

        await _uow.BeginTransactionAsync();
        try
        {
            var entity = _mapper.Map<TEntity>(entityCreateDTO);

            await _repository.AddAsync(entity, cancellation);

            await _uow.CommitTransactionAsync();

            result = new OperationResult<TEntity> { Value = entity };
        }
        catch (Exception ex)
        {
            await _uow.RollbackTransactionAsync();
            return new OperationResult<TEntity>(
                new ResultMessage($"Failed to create Activity: {ex.Message}", ResultTypes.Error));
        }

        return result;
    }

    public async Task<List<TDTO>> GetAtividadesPrisioneiroAsync(Guid prisioneiroId, CancellationToken cancellation = default)
    {
        if (prisioneiroId == Guid.Empty)
            throw new ArgumentException("Invalid prisoner ID.");

        var atividades = await _repository.GetStudyActivitiesByPrisonerIdAsync(prisioneiroId, cancellation);
        return atividades.Select(atividade => _mapper.Map<TDTO>(atividade)).ToList();
    }
}
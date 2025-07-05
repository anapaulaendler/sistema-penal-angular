using System.Text.RegularExpressions;
using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities.Abstractions;
using SistemaPenal.Enums;
using SistemaPenal.Extensions;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Abstractions;
using SistemaPenal.Interfaces.Services.Abstractions;

namespace SistemaPenal.Services.Abstractions;

public class PessoaService<TEntity, TDTO, TCreateDTO, TUpdateDTO, TRepository> : IPessoaServiceBase<TEntity, TDTO, TCreateDTO, TUpdateDTO>
where TEntity : Pessoa where TDTO : PessoaDTO where TCreateDTO : PessoaCreateDTO where TUpdateDTO : PessoaUpdateDTO where TRepository : IPessoaRepositoryBase<TEntity>
{
    private readonly TRepository _repository;
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public PessoaService(TRepository repository, IUnitOfWork uow, IMapper mapper)
    {
        _repository = repository;
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<OperationResult<TEntity>> CreatePessoaAsync(TCreateDTO entityCreateDTO, CancellationToken cancellation = default)
    {
        var result = new OperationResult<TEntity>();

        if (entityCreateDTO is null)
        {
            return new OperationResult<TEntity>(
                new ResultMessage("Invalid person creation request.", ResultTypes.Error));
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
                new ResultMessage($"Failed to create user: {ex.Message}", ResultTypes.Error));
        }

        return result;
    }

    public async Task<OperationResult<TEntity>> DeletePessoaAsync(Guid id, CancellationToken cancellation = default)
    {
        var result = new OperationResult<TEntity>();

        var entityDTO = await _repository.GetByIdAsync(id);
        var entity = _mapper.Map<TEntity>(entityDTO);

        await _uow.BeginTransactionAsync();
        try
        {
            await _repository.Delete(entity, cancellation);
            await _uow.CommitTransactionAsync();

            result = new OperationResult<TEntity> { Value = entity };
        }
        catch (Exception ex)
        {
            await _uow.RollbackTransactionAsync();
            return new OperationResult<TEntity>(
                new ResultMessage($"Failed to delete user: {ex.Message}", ResultTypes.Error));
        }

        return result;
    }

    public async Task<TDTO> GetPessoaByCpfAsync(string cpf, CancellationToken cancellation = default)
    {
        if (string.IsNullOrWhiteSpace(cpf))
            throw new ArgumentException("Invalid CPF.");
        
        string formatted = Regex.Replace(cpf, @"(\d{3})(\d{3})(\d{3})(\d{2})", "$1.$2.$3-$4");
        
        var entity = await _repository.GetPessoaByCpfAsync(formatted, cancellation);
        var entityDTO = _mapper.Map<TDTO>(entity);
        return entityDTO;
    }

    public async Task<TDTO> GetPessoaByIdAsync(Guid id, CancellationToken cancellation = default)
    {
        if (id == Guid.Empty)
            throw new ArgumentException("Invalid ID.");
        
        var entity = await _repository.GetByIdAsync(id, cancellation);
        var entityDTO = _mapper.Map<TDTO>(entity);
        return entityDTO;
    }

    public async Task<List<TDTO>> GetPessoasAsync(CancellationToken cancellation = default)
    {
        var prisoners = await _repository.GetAsync(null, cancellation);
        return prisoners.Select(entity => _mapper.Map<TDTO>(entity)).ToList();
    }

    public virtual async Task<OperationResult<TEntity>> UpdatePessoaAsync(TUpdateDTO updateDTO, CancellationToken cancellation = default)
    {
        var result = new OperationResult<TEntity>();

        TEntity entity = await _repository.GetByIdAsync(updateDTO.Id, cancellation);
        if (entity is null)
            throw new ArgumentException("Invalid ID.");

        _mapper.Map(updateDTO, entity);
        await _uow.BeginTransactionAsync();

        try
        {
            await _repository.Update(entity, cancellation);
            await _uow.CommitTransactionAsync();
            
            result = new OperationResult<TEntity> { Value = entity };
        }
        catch (Exception ex)
        {
            await _uow.RollbackTransactionAsync();
            return new OperationResult<TEntity>(
                new ResultMessage($"Failed to update user: {ex.Message}", ResultTypes.Error));
        }

        return result;
    }
}
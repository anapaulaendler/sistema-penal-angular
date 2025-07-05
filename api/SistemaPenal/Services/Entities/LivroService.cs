using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Enums;
using SistemaPenal.Extensions;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Services.Base;

namespace SistemaPenal.Services.Entities;

public class LivroService : AtividadeService<Livro, LivroDTO, LivroCreateDTO, ILivroRepository>, ILivroService
{
    public LivroService(IUnitOfWork uow, IMapper mapper, ILivroRepository repository, IPrisioneiroRepository prisioneiroRepository) : base(uow, mapper, repository, prisioneiroRepository)
    {
    }

    public override async Task<OperationResult<Livro>> CriarAtividadeAsync(LivroCreateDTO livroCreateDTO, CancellationToken cancellation = default)
    {
        var result = new OperationResult<Livro>();

        if (livroCreateDTO is null || livroCreateDTO.PrisioneiroId == Guid.Empty)
        {
            return new OperationResult<Livro>(
                new ResultMessage("Invalid livro creation request.", ResultTypes.Error));
        }

        await _uow.BeginTransactionAsync();
        try
        {
            var prisioneiro = await ValidarPrisioneiroAsync(livroCreateDTO.PrisioneiroId);

            if (prisioneiro.AnoAtual != DateTime.Now.Year)
            {
                prisioneiro.ContadorDeLivros = 0;
            }
            
            if (prisioneiro.ContadorDeLivros >= 12)
            {
                return new OperationResult<Livro>(
                    new ResultMessage("Invalid livro creation request: already reached maximum of livros per year.", ResultTypes.Error));
            }

            var livro = _mapper.Map<Livro>(livroCreateDTO);
            livro.Prisioneiro = prisioneiro;

            await _repository.AddAsync(livro, cancellation);

            prisioneiro.ContadorDeLivros++;
            await ReduzirPenaAsync(prisioneiro.Id, -3);
            await _prisioneiroRepository.Update(prisioneiro);
            
            await _uow.CommitTransactionAsync();

            result = new OperationResult<Livro> { Value = livro };
        }
        catch (Exception ex)
        {
            await _uow.RollbackTransactionAsync();
            return new OperationResult<Livro>(
                new ResultMessage($"Failed to create livro activity: {ex.Message}", ResultTypes.Error));
        }

        return result;
    }
}
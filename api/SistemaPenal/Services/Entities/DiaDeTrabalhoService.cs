using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Services.Base;

namespace SistemaPenal.Services.Entities;

public class DiaDeTrabalhoService : AtividadeService<DiaDeTrabalho, DiaDeTrabalhoDTO, DiaDeTrabalhoCreateDTO, IDiaDeTrabalhoRepository>, IDiaDeTrabalhoService
{
    public DiaDeTrabalhoService(IUnitOfWork uow, IMapper mapper, IDiaDeTrabalhoRepository repository, IPrisioneiroRepository prisioneiroRepository) : base(uow, mapper, repository, prisioneiroRepository)
    {
    }
}
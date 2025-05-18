using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Services.Abstractions;

namespace SistemaPenal.Services.Entities;

public class PrisioneiroService : PessoaService<Prisioneiro, PrisioneiroDTO, PrisioneiroCreateDTO, PrisioneiroUpdateDTO, IPrisioneiroRepository>, IPrisioneiroService
{
    public PrisioneiroService(IPrisioneiroRepository repository, IUnitOfWork uow, IMapper mapper) : 
    base(repository, uow, mapper)
    {
    }
}
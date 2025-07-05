using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Services.Base;

namespace SistemaPenal.Services.Entities;

public class EstudoService : AtividadeService<Estudo, EstudoDTO, EstudoCreateDTO, IEstudoRepository>, IEstudoService
{
    public EstudoService(IUnitOfWork uow, IMapper mapper, IEstudoRepository repository, IPrisioneiroRepository prisioneiroRepository) : base(uow, mapper, repository, prisioneiroRepository)
    {
    }
}
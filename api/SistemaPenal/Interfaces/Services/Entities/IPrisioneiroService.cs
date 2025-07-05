using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces.Services.Abstractions;

namespace SistemaPenal.Interfaces.Services.Entities;

public interface IPrisioneiroService : IPessoaServiceBase<Prisioneiro, PrisioneiroDTO, PrisioneiroCreateDTO, PrisioneiroUpdateDTO>
{
}
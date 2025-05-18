using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces.Base;

namespace SistemaPenal.Interfaces.Services.Entities;

public interface IEstudoService : IAtividadeServiceBase<Estudo, EstudoDTO, EstudoCreateDTO>
{
}
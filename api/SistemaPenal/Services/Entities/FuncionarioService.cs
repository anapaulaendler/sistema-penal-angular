using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Services.Abstractions;

namespace SistemaPenal.Services.Entities;

public class FuncionarioService : PessoaService<Funcionario, FuncionarioDTO, FuncionarioCreateDTO, FuncionarioUpdateDTO, IFuncionarioRepository>, IFuncionarioService
{
    public FuncionarioService(IFuncionarioRepository repository, IUnitOfWork uow, IMapper mapper) : base(repository, uow, mapper)
    {
    }
}
using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;

namespace SistemaPenal.Mappers;

public class FuncionarioProfile : Profile
{
    public FuncionarioProfile()
    {
        CreateMap<Funcionario, FuncionarioDTO>();
        CreateMap<Funcionario, FuncionarioCreateDTO>();
        CreateMap<Funcionario, FuncionarioUpdateDTO>();

        CreateMap<FuncionarioDTO, FuncionarioCreateDTO>();
        CreateMap<FuncionarioDTO, FuncionarioUpdateDTO>();
        CreateMap<FuncionarioDTO, Funcionario>();

        CreateMap<FuncionarioCreateDTO, Funcionario>();
        
        CreateMap<FuncionarioUpdateDTO, Funcionario>();
    }
}
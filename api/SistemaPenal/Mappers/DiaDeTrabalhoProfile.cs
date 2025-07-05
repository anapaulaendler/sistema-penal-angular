using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;

namespace SistemaPenal.Mappers;

public class DiaDeTrabalhoProfile : Profile
{
    public DiaDeTrabalhoProfile()
    {
        CreateMap<DiaDeTrabalho, DiaDeTrabalhoDTO>();
        CreateMap<DiaDeTrabalho, DiaDeTrabalhoCreateDTO>();

        CreateMap<DiaDeTrabalhoDTO, DiaDeTrabalhoCreateDTO>();
        CreateMap<DiaDeTrabalhoDTO, DiaDeTrabalho>();

        CreateMap<DiaDeTrabalhoCreateDTO, DiaDeTrabalho>();
    }
}
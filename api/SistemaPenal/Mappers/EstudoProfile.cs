using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;

namespace SistemaPenal.Mappers;

public class EstudoProfile : Profile
{
    public EstudoProfile()
    {
        CreateMap<Estudo, EstudoDTO>();
        CreateMap<Estudo, EstudoCreateDTO>();

        CreateMap<EstudoDTO, EstudoCreateDTO>();
        CreateMap<EstudoDTO, Estudo>();

        CreateMap<EstudoCreateDTO, Estudo>();
    }
}
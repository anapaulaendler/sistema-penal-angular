using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;

namespace SistemaPenal.Mappers;

public class PrisioneiroProfile : Profile
{
    public PrisioneiroProfile()
    {
        CreateMap<Prisioneiro, PrisioneiroDTO>();
        CreateMap<Prisioneiro, PrisioneiroOnlyDTO>();
        CreateMap<Prisioneiro, PrisioneiroCreateDTO>();
        CreateMap<Prisioneiro, PrisioneiroUpdateDTO>();

        CreateMap<PrisioneiroDTO, PrisioneiroCreateDTO>();
        CreateMap<PrisioneiroDTO, PrisioneiroUpdateDTO>();
        CreateMap<PrisioneiroDTO, Prisioneiro>();

        CreateMap<PrisioneiroCreateDTO, Prisioneiro>();

        CreateMap<PrisioneiroUpdateDTO, Prisioneiro>();
    }
}
using AutoMapper;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;

namespace SistemaPenal.Mappers;

public class LivroProfile : Profile
{
    public LivroProfile()
    {
        CreateMap<Livro, LivroDTO>();
        CreateMap<Livro, LivroCreateDTO>();
        
        CreateMap<LivroDTO, LivroCreateDTO>();
        CreateMap<LivroDTO, Livro>();

        CreateMap<LivroCreateDTO, Livro>();
    }
}
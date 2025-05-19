using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using SistemaPenal.DTOs;
using SistemaPenal.Entities;
using SistemaPenal.Interfaces;
using SistemaPenal.Interfaces.Repositories.Entities;
using SistemaPenal.Interfaces.Services.Entities;
using SistemaPenal.Services.Abstractions;

namespace SistemaPenal.Services.Entities;

public class FuncionarioService : PessoaService<Funcionario, FuncionarioDTO, FuncionarioCreateDTO, FuncionarioUpdateDTO, IFuncionarioRepository>, IFuncionarioService
{
    protected readonly IFuncionarioRepository _funcionarioRepository;
    private readonly IConfiguration _configuration;
    public FuncionarioService(IFuncionarioRepository repository, IUnitOfWork uow, IMapper mapper, IFuncionarioRepository funcionarioRepository, IConfiguration configuration) : base(repository, uow, mapper)
    {
        _funcionarioRepository = funcionarioRepository;
        _configuration = configuration;
    }

    public async Task<string> LoginAsync(FuncionarioLoginDTO funcionarioLoginDTO)
    {
        var funcionario = await _funcionarioRepository.GetFuncionarioByEmailAsync(funcionarioLoginDTO.Email);

        if (funcionario is null || funcionario.Senha != funcionarioLoginDTO.Senha)
            throw new UnauthorizedAccessException("Invalid credentials");

        var token = GerarToken(funcionario);
        return token;
    }

    private string GerarToken(Funcionario usuario)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, usuario.Email),
            new Claim(ClaimTypes.Role, usuario.Papel.ToString())
        };

        var chave = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!);
        var credenciais = new SigningCredentials(
            new SymmetricSecurityKey(chave), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credenciais);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
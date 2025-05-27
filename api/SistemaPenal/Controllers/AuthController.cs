using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPenal.DTOs;
using SistemaPenal.Interfaces.Services.Entities;

namespace SistemaPenal.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IFuncionarioService _funcionarioService;
    public AuthController(IFuncionarioService funcionarioService)
    {
        _funcionarioService = funcionarioService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] FuncionarioLoginDTO funcionarioLoginDTO)
    {
        var token = await _funcionarioService.LoginAsync(funcionarioLoginDTO);
        return Ok(new { token });
    }
}
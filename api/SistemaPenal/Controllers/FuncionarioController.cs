using Microsoft.AspNetCore.Mvc;
using SistemaPenal.DTOs;
using SistemaPenal.Interfaces.Services.Entities;

namespace SistemaPenal.Controllers;

[ApiController]
[Route("funcionarios")]
public class FuncionarioController : ControllerBase
{
    private readonly ILogger<FuncionarioController> _logger;
    private readonly IFuncionarioService _funcionarioService;

    public FuncionarioController(ILogger<FuncionarioController> logger, IFuncionarioService funcionarioService)
    {
        _logger = logger;
        _funcionarioService = funcionarioService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateFuncionarioAsync([FromBody] FuncionarioCreateDTO funcionarioCreateDTO, CancellationToken cancellation = default)
    {
        var result = await _funcionarioService.CreatePessoaAsync(funcionarioCreateDTO, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Funcionario criado.");
    }

    [HttpGet("id/{id}")]
    public async Task<IActionResult> GetFuncionarioByIdAsync(Guid id, CancellationToken cancellation = default)
    {
        var funcionario = await _funcionarioService.GetPessoaByIdAsync(id, cancellation);
        return Ok(funcionario);
    }

    [HttpGet("cpf/{cpf}")]
    public async Task<IActionResult> GetFuncionarioByCpfAsync(string cpf, CancellationToken cancellation = default)
    {
        var funcionario = await _funcionarioService.GetPessoaByCpfAsync(cpf, cancellation);
        return Ok(funcionario);
    }

    [HttpPut()]
    public async Task<IActionResult> UpdateFuncionarioAsync(FuncionarioUpdateDTO updatedFuncionario, CancellationToken cancellation = default)
    {
        var result = await _funcionarioService.UpdatePessoaAsync(updatedFuncionario, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Funcionario atualizado.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFuncionarioAsync(Guid id, CancellationToken cancellation = default)
    {
        var result = await _funcionarioService.DeletePessoaAsync(id, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Funcionario deletado.");
    }

    [HttpGet]
    public async Task<IActionResult> GetFuncionariosAsync(CancellationToken cancellation = default)
    {
        var funcionarios = await _funcionarioService.GetPessoasAsync(cancellation);
        return Ok(funcionarios);
    }
}
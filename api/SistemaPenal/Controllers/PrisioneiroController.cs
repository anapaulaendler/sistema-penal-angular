using Microsoft.AspNetCore.Mvc;
using SistemaPenal.DTOs;
using SistemaPenal.Interfaces.Services.Entities;

namespace SistemaPenal.Controllers;

[ApiController]
[Route("prisioneiros")]
public class PrisioneiroController : ControllerBase
{
    private readonly ILogger<PrisioneiroController> _logger;
    private readonly IPrisioneiroService _prisonerService;

    public PrisioneiroController(ILogger<PrisioneiroController> logger, IPrisioneiroService prisonerService)
    {
        _logger = logger;
        _prisonerService = prisonerService;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePrisioneiroAsync(PrisioneiroCreateDTO prisonerCreateDTO, CancellationToken cancellation = default)
    {
        var result = await _prisonerService.CreatePessoaAsync(prisonerCreateDTO, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Prisioneiro criado.");
    }

    [HttpGet("id/{id}")]
    public async Task<IActionResult> GetPrisioneiroByIdAsync(Guid id, CancellationToken cancellation = default)
    {
        var prisoner = await _prisonerService.GetPessoaByIdAsync(id, cancellation);
        return Ok(prisoner);
    }

    [HttpGet("cpf/{cpf}")]
    public async Task<IActionResult> GetPrisioneiroByCpfAsync(string cpf, CancellationToken cancellation = default)
    {
        var prisoner = await _prisonerService.GetPessoaByCpfAsync(cpf, cancellation);
        return Ok(prisoner);
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePrisioneiroAsync(PrisioneiroUpdateDTO updatedPrisioneiro, CancellationToken cancellation = default)
    {
        var result = await _prisonerService.UpdatePessoaAsync(updatedPrisioneiro, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Prisioneiro atualizado.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrisioneiroAsync(Guid id, CancellationToken cancellation = default)
    {
        var result = await _prisonerService.DeletePessoaAsync(id, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Prisioneiro deletado.");
    }

    [HttpGet]
    public async Task<IActionResult> GetPrisioneirosAsync(CancellationToken cancellation = default)
    {
        var prisoners = await _prisonerService.GetPessoasAsync(cancellation);
        return Ok(prisoners);
    }
}
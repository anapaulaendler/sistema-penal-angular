using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPenal.DTOs;
using SistemaPenal.Interfaces.Services.Entities;

namespace SistemaPenal.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("estudos")]
public class EstudoController : ControllerBase
{
    private readonly ILogger<EstudoController> _logger;
    private readonly IEstudoService _estudoService;

    public EstudoController(IEstudoService estudoService, ILogger<EstudoController> logger)
    {
        _estudoService = estudoService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateEstudoAsync(EstudoCreateDTO estudoCreateDTO, CancellationToken cancellation = default)
    {
        var result = await _estudoService.CriarAtividadeAsync(estudoCreateDTO, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Estudo criado.");
    }

    [HttpGet("{prisioneiroId}")]
    public async Task<IActionResult> GetEstudoByPrisioneiroIdAsync(Guid prisioneiroId, CancellationToken cancellation = default)
    {
        var lista = await _estudoService.GetAtividadesPrisioneiroAsync(prisioneiroId, cancellation);
        return Ok(lista);
    }

    [HttpGet]
    public async Task<IActionResult> GetEstudosAsync(CancellationToken cancellation = default)
    {
        var lista = await _estudoService.GetAtividadesAsync(cancellation);
        return Ok(lista);
    }
}
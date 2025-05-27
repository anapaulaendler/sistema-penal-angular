using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPenal.DTOs;
using SistemaPenal.Interfaces.Services.Entities;

namespace SistemaPenal.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("dias-de-trabalho")]
public class DiaDeTrabalhoController : ControllerBase
{
    private readonly ILogger<DiaDeTrabalhoController> _logger;
    private readonly IDiaDeTrabalhoService _diaDeTrabalhoService;

    public DiaDeTrabalhoController(IDiaDeTrabalhoService diaDeTrabalhoService, ILogger<DiaDeTrabalhoController> logger)
    {
        _diaDeTrabalhoService = diaDeTrabalhoService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateDiaDeTrabalhoAsync(DiaDeTrabalhoCreateDTO diaDeTrabalhoCreateDTO, CancellationToken cancellation = default)
    {
        var result = await _diaDeTrabalhoService.CriarAtividadeAsync(diaDeTrabalhoCreateDTO, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("DiaDeTrabalho criado.");
    }

    [HttpGet("{prisioneiroId}")]
    public async Task<IActionResult> GetDiaDeTrabalhoByPrisioneiroIdAsync(Guid prisioneiroId, CancellationToken cancellation = default)
    {
        var lista = await _diaDeTrabalhoService.GetAtividadesPrisioneiroAsync(prisioneiroId, cancellation);
        return Ok(lista);
    }

    [HttpGet]
    public async Task<IActionResult> GetDiaDeTrabalhosAsync(CancellationToken cancellation = default)
    {
        var lista = await _diaDeTrabalhoService.GetAtividadesAsync(cancellation);
        return Ok(lista);
    }
}
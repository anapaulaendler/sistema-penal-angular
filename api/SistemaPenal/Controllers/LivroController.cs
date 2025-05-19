using Microsoft.AspNetCore.Mvc;
using SistemaPenal.DTOs;
using SistemaPenal.Interfaces.Services.Entities;

namespace SistemaPenal.Controllers;

[ApiController]
[Route("livros")]
public class LivroController : ControllerBase
{
    private readonly ILogger<LivroController> _logger;
    private readonly ILivroService _bookService;

    public LivroController(ILivroService bookService, ILogger<LivroController> logger)
    {
        _bookService = bookService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateLivroActivityAsync(LivroCreateDTO bookCreateDTO, CancellationToken cancellation = default)
    {
        var result = await _bookService.CriarAtividadeAsync(bookCreateDTO, cancellation);
        if (result.HasErrors())
        {
            return BadRequest(new {result.Messages});
        }

        return Ok("Livro criado.");
    }

    [HttpGet("{prisonerId}")]
    public async Task<IActionResult> GetLivroActivitiesByPrisonerIdAsync(Guid prisonerId, CancellationToken cancellation = default)
    {
        var list = await _bookService.GetAtividadesPrisioneiroAsync(prisonerId, cancellation);
        return Ok(list);
    }

    [HttpGet]
    public async Task<IActionResult> GetLivrosAsync(CancellationToken cancellation = default)
    {
        var list = await _bookService.GetAtividadesAsync(cancellation);
        return Ok(list);
    }
}
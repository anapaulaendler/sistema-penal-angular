namespace SistemaPenal.DTOs;

public class DiaDeTrabalhoDTO : AtividadeDTO
{
    public string? Descricao { get; set; }
}

public class DiaDeTrabalhoCreateDTO : AtividadeCreateDTO
{
    public string? Descricao { get; set; }
}
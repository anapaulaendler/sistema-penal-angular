namespace SistemaPenal.DTOs;

public class EstudoDTO : AtividadeDTO
{
    public string? Materia { get; set; }
}

public class EstudoCreateDTO : AtividadeCreateDTO 
{
    public string? Materia { get; set; }
}

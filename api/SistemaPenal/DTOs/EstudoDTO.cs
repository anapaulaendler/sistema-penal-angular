namespace SistemaPenal.DTOs;

public class EstudoDTO : AtividadeDTO
{
    public required string Materia { get; set; }
}

public class EstudoCreateDTO : AtividadeCreateDTO 
{
    public required string Materia { get; set; }
}

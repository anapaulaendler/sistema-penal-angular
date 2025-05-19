namespace SistemaPenal.DTOs;

public class LivroDTO : AtividadeDTO
{
    public required string Isbn { get; set; }
}

public class LivroCreateDTO : AtividadeCreateDTO
{
    public required string Isbn { get; set; }
}